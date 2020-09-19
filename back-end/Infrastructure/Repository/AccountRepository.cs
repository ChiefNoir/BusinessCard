﻿using Abstractions.IRepository;
using Abstractions.ISecurity;
using Abstractions.Model;
using Infrastructure.Converters;
using Infrastructure.Validation;
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
        private readonly IConfiguration _configuration;
        private readonly IHashManager _hashManager;

        public AccountRepository(DataContext context, IConfiguration configuration, IHashManager hashManager)
        {
            _context = context;
            _configuration = configuration;
            _hashManager = hashManager;
        }



        public Task<int> CountAsync()
        {
            return _context.Accounts.CountAsync();
        }


        public async Task<bool> DeleteAsync(Account item)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(x => x.Id == item.Id);
            ModelValidation.CheckBeforeDelete(acc, item);


            _context.Accounts.Remove(acc);
            var rows = await _context.SaveChangesAsync();

            return rows == 1;
        }


        public Task<Account> GetAsync(int id)
        {
            return _context.Accounts
                           .Select(x => DataConverter.ToAccount(x))
                           .AsNoTracking()
                           .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Account> GetAsync(string login, string password)
        {
            // This is the primary method for user verification
            // so, if there is no users in the db, we must create new one:
            if(!await _context.Accounts.AnyAsync())
            {
                var newLogin = _configuration.GetSection("Default:Admin:Login").Get<string>();
                var newPass = _configuration.GetSection("Default:Admin:Password").Get<string>();
                
                await SaveAsync(new Account { Login = newLogin, Password = newPass, Role = RoleNames.Admin });
            }


            var dbItem = await _context.Accounts
                                       .AsNoTracking()
                                       .FirstOrDefaultAsync(x => x.Login == login);

            ModelValidation.CheckAccount(dbItem, login, password, _hashManager);

            return new Account
            {
                Login = login,
                Role = dbItem.Role
            };
        }


        public Task<Account> SaveAsync(Account item)
        {
            if (item.Id == null)
                return CreateAsync(item);

            return UpdateAsync(item);
        }
        

        public Task<Account[]> SearchAsync(int start, int length)
        {
            return _context.Accounts
                           .Skip(start)
                           .Take(length)
                           .Select(x => DataConverter.ToAccount(x))
                           .AsNoTracking()
                           .ToArrayAsync();
        }



        private async Task<Account> CreateAsync(Account item)
        {
            ModelValidation.CheckBeforeCreate(item, _context);

            var hashedPassword = _hashManager.Hash(item.Password);

            var account = AbstractionsConverter.ToAccount(item, hashedPassword);

            await _context.Accounts.AddAsync(account);
            await _context.SaveChangesAsync();

            return DataConverter.ToAccount(account);
        }
        
        private async Task<Account> UpdateAsync(Account item)
        {
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.Id == item.Id);
            ModelValidation.CheckBeforeUpdate(dbAccount, item, _context);

            dbAccount.Login = item.Login;
            dbAccount.Role = item.Role;
            dbAccount.Version++;

            if (!string.IsNullOrEmpty(item.Password))
            {
                var hashedPassword = _hashManager.Hash(item.Password);

                dbAccount.Password = hashedPassword.HexHash;
                dbAccount.Salt = hashedPassword.HexSalt;
            }

            await _context.SaveChangesAsync();

            return DataConverter.ToAccount(dbAccount);
        }
    }
}