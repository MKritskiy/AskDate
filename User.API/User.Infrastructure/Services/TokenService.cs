using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Users.Application.Interfaces;
using Users.Domain.Entities;

namespace Users.Infrastructure.Services
{
    internal class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(User user, int? profileId = null)
        {
            // Short claim names keep the payload clean for clients;
            // JwtSecurityTokenHandler's inbound map still binds them to
            // ClaimTypes.Name / NameIdentifier / Role during validation.
            var claims = new List<Claim>
            {
                new("name", user.Email),
                new("nameid", user.Id.ToString()!),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new("role", user.Role)
            };

            // Embed profileId so downstream APIs can authorize without trusting headers
            if (profileId.HasValue && profileId.Value > 0)
            {
                claims.Add(new Claim("profileId", profileId.Value.ToString()));
            }

            var jwtKey = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? "JwtKey");
            var key = new SymmetricSecurityKey(jwtKey);
            var cres = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(double.Parse(_configuration["Jwt:ExpireMinutes"] ?? "5")),
                signingCredentials: cres);

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        public string GenerateRefreshToken()
        {
            return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
        }
    }
}
