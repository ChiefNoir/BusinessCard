﻿using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace API.Security
{
    /// <summary> JWT Toke manager </summary>
    public static class TokenManager
    {
        /// <summary> Create <seea cref="TokenValidationParameters"/> parameters </summary>
        /// <param name="configuration"> <see cref="IConfiguration"/> </param>
        /// <returns> <seea cref="TokenValidationParameters"/> </returns>
        public static TokenValidationParameters CreateTokenValidationParameters(IConfiguration configuration)
        {
            return new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = configuration.GetSection("Token").GetValue<string>("Issuer"),
                ValidateAudience = true,
                ValidAudience = configuration.GetSection("Token").GetValue<string>("Audience"),
                ValidateLifetime = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("Token").GetValue<string>("Key"))),
                ValidateIssuerSigningKey = true,
                RequireExpirationTime = true
            };
        }

        /// <summary> Create JWT token </summary>
        /// <param name="configuration"> <see cref="IConfiguration"/> </param>
        /// <param name="login"> Login </param>
        /// <param name="roles"> Roles </param>
        /// <returns>JWT token</returns>
        public static string CreateToken(IConfiguration configuration, string login, params string[] roles)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, login)
            };
            foreach (var item in roles)
            {
                claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, item));
            }
            
            var jwt = new JwtSecurityToken(
                    issuer: configuration.GetSection("Token").GetValue<string>("Issuer"),
                    audience: configuration.GetSection("Token").GetValue<string>("Audience"),
                    notBefore: DateTime.UtcNow,
                    claims: claims,
                    expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(configuration.GetSection("Token").GetValue<int>("LifeTime"))),
                    signingCredentials: new SigningCredentials
                    (
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("Token").GetValue<string>("Key"))),
                        configuration.GetSection("Token").GetValue<string>("SecurityAlgorithms")
                    ));

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            
            return encodedJwt;
        }

        /// <summary> Validate JWT token </summary>
        /// <param name="configuration"> <see cref="IConfiguration"/> </param>
        /// <param name="token">Token to validate</param>
        /// <returns> <see cref="IPrincipal"/></returns>
        public static IPrincipal ValidateToken(IConfiguration configuration, string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = CreateTokenValidationParameters(configuration);
            return tokenHandler.ValidateToken(token, validationParameters, out _);
        }
    }
}
