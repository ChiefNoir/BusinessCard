﻿using Abstractions.IRepository;
using Abstractions.ISecurity;
using Abstractions.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly DataContext _context;
        private readonly IHashManager _hashManager;
        private readonly IConfiguration _configuration;

        public AccountRepository(DataContext context, IConfiguration configuration, IHashManager hashManager)
        {
            _context = context;
            _hashManager = hashManager;
            _configuration = configuration;

            InitDefaults(); // TODO: doesn't look good.
        }

        /// <summary> Initialize default user </summary>
        private async void InitDefaults()
        {
            if (!_context.HasAccounts)
            {
                try
                {
                    var login = _configuration.GetSection("Default")?.GetSection("Admin")?.GetValue<string>("Login");
                    var pass = _configuration.GetSection("Default")?.GetSection("Admin")?.GetValue<string>("Password");

                    await Add( new Account { Login = login, Password = pass, Role = RoleNames.Admin });
                    _context.HasAccounts = true;
                }
                catch
                {
                    //TODO: log
                }
            }
        }

        /// <summary> Get account </summary>
        /// <param name="login">Login as plain text</param>
        /// <param name="password">Password as plain text</param>
        /// <returns> <see cref="Account"/> or <code>null</code> if account is not found </returns>
        public async Task<Account> Get(string login, string password)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
                return null;

            var account = await _context.Accounts.FirstOrDefaultAsync(x => x.Login == login);
            if (account == null)
                return null;

            var hashedPassword = _hashManager.Hash(password, account.Salt);
            if (hashedPassword.HexHash != account.Password)
                return null;

            return new Account
            {
                Login = account.Login,
                Role = account.Role
            };
        }

        public Task<Account[]> Search(int start, int length)
        {
            return _context.Accounts
                            .Skip(start)
                            .Take(length)
                            .Select(x => Convert(x))
                            .ToArrayAsync();
        }

        public Task<int> Count()
        {
            return _context.Accounts.CountAsync();
        }

        public async Task<Account> Update(Account account)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(x => x.Id == account.Id);

            if (acc == null)
                throw new Exception("Not found");

            acc.Login = account.Login;
            acc.Version++;
            acc.Role = account.Role;

            if(!string.IsNullOrEmpty(account.Password))
            {
                var hashedPassword = _hashManager.Hash(account.Password);

                acc.Password = hashedPassword.HexHash;
                acc.Salt = hashedPassword.HexSalt;
            }

            await _context.SaveChangesAsync();

            return Convert(acc);
        }

        public async Task<bool> Remove(Account account)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(x => x.Id == account.Id);

            _context.Accounts.Remove(acc);
            await _context.SaveChangesAsync();

            return true;
        }

        private static Account Convert(DataModel.Account account)
        {
            return new Account
            {
                Id = account.Id,
                Login = account.Login,
                Role = account.Role,
                Password = null,
                Version = account.Version
            };
        }

        public async Task<Account> Add(Account account)
        {
            var hashedPassword = _hashManager.Hash(account.Password);

            var user = new DataModel.Account
            {
                Login = account.Login,
                Password = hashedPassword.HexHash,
                Salt = hashedPassword.HexSalt,
                Role = account.Role
            };

            await _context.Accounts.AddAsync(user);
            await _context.SaveChangesAsync();

            return Convert(user);
        }

        public async Task<Account> Get(int id)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(x => x.Id == id);
            if (account == null)
                return null;

            return Convert(account);
        }
    }
}
