using Users.Application.Models;
using Users.Domain.Constants;
using Users.Domain.Entities;

namespace Users.Application.Interfaces
{
    public interface IUserService
    {
        Task ValidateEmail(string email);
        Task Register(RegDto regDto);
        Task<AfterAuthDto> Login(LoginDto loginDto);
        Task<int> CreateUser(User user);
        Task<int> UpdateUser(int userId, string phoneNumber, string password, int requesterUserId, bool requesterIsAdmin);
        Task<int> DeleteUser(int userId, int requesterUserId, bool requesterIsAdmin);
        Task GenerateAndSendConfiramtionCode(string? email = null, string? phone = null);
        Task<AfterAuthDto> ConfirmEmail(string email, string code);
        Task<AfterAuthDto> RefreshTokenAsync(string refreshToken);

        // Admin operations
        Task<List<AdminUserDto>> GetAllUsers();
        /// <summary>Sets a new password (generates one when omitted) and revokes active sessions. Returns the plaintext password.</summary>
        Task<string> ResetPasswordAsync(int userId, string? newPassword);
        Task SetUserRoleAsync(int userId, string role, int requesterUserId);
    }
}
