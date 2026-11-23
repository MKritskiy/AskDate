using Users.Application.Exceptions;
using Users.Application.Interfaces;
using Users.Application.Models;
using Users.Domain.Constants;
using Users.Domain.Entities;

namespace Users.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IProfileRepository _profileRepository;
        private readonly ITokenService _tokenService;
        private readonly IEncrypt _encrypt;
        private readonly ICodeCacheService _codeCache;
        private readonly ICodeGenerator _codeGenerator;
        private readonly INotificationQueueService _notificationQueue;

        public UserService(IUserRepository userRepository,
                           IProfileRepository profileRepository,
                           ITokenService tokenService,
                           IEncrypt encrypt,
                           ICodeCacheService codeCache,
                           ICodeGenerator codeGenerator,
                           INotificationQueueService notificationQueue)
        {
            _userRepository = userRepository;
            _profileRepository = profileRepository;
            _tokenService = tokenService;
            _encrypt = encrypt;
            _codeCache = codeCache;
            _codeGenerator = codeGenerator;
            _notificationQueue = notificationQueue;
        }

        private async Task<int?> GetProfileIdAsync(int userId)
        {
            var profiles = await _profileRepository.GetProfilesByUserIdAsync(userId);
            return profiles.FirstOrDefault()?.Id;
        }

        private async Task<AfterAuthDto> IssueTokensAsync(User user)
        {
            var token = _tokenService.GenerateToken(user, await GetProfileIdAsync(user.Id ?? 0));
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _userRepository.UpdateAsync(user);

            return new AfterAuthDto { Token = token, RefreshToken = refreshToken, UserId = user.Id ?? 0 };
        }

        public async Task<int> CreateUser(User user)
        {
            if (user.Email == null || user.Password == null) throw new InvalidOperationException("Incorrect User Data");

            // The very first registered user becomes the system administrator
            var existing = await _userRepository.Get();
            if (!existing.Any())
            {
                user.Role = Roles.Administrator;
            }

            user.Salt = General.Helpers.GenerateSalt();
            user.Password = _encrypt.HashPassword(user.Password, user.Salt);
            // Убрать, если нужно вернуть подтверждение по почте
            user.Verified = true;
            return await _userRepository.AddAsync(user) ?? 0;
        }


        public async Task<AfterAuthDto> Login(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByEmailAsync(loginDto.Email);

            if (user != null && user.Id != null && user.Password == _encrypt.HashPassword(loginDto.Password, user.Salt) && user.Verified)
            {
                return await IssueTokensAsync(user);
            }
            throw new AuthorizationException();
        }

        public async Task GenerateAndSendConfiramtionCode(string? email = null, string? phone = null)
        {
            if (email == null && phone == null) throw new InvalidOperationException("Inncorrect send data");
            string code = "";

            if (email!=null)
                code = _codeGenerator.GenerateCodeForEmail(email);
            if (phone!=null)
                code = _codeGenerator.GenerateCodeForPhone(phone);

            await _codeCache.StoreCodeAsync($"email:{email}", code);

            await _notificationQueue.PublishNotification(new Domain.QueueEntities.NotificationMessage
            {
                Type = "email",
                Target = email!,
                Code = code,
            });
        }

        public async Task Register(RegDto regDto)
        {
            if (string.IsNullOrWhiteSpace(regDto.Email) || string.IsNullOrWhiteSpace(regDto.Password))
                throw new InvalidOperationException("Email и пароль обязательны");
            if (regDto.Password != regDto.ConfirmPassword)
                throw new InvalidOperationException("Пароли не совпадают");

            User user = new User() { Email = regDto.Email, Password = regDto.Password };
            using (var scope = General.Helpers.CreateTransactionScope())
            {
                await ValidateEmail(user.Email);
                int id = await CreateUser(user);
                // await GenerateAndSendConfiramtionCode(regDto.Email);
                scope.Complete();
            }
        }

        public async Task<AfterAuthDto> ConfirmEmail(string email, string code)
        {
            var isValid = await _codeCache.ValidateCodeAsync($"email:{email}", code);
            if (!isValid) throw new InvalidConfirmationCodeException();

            var user = await _userRepository.GetUserByEmailAsync(email);
            user.Verified = true;
            await _userRepository.UpdateAsync(user);

            await _codeCache.RemoveCodeAsync($"email:{email}");

            return await IssueTokensAsync(user);
        }

        public async Task ValidateEmail(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user != null && user.Id != null && (DateTimeOffset.UtcNow.Subtract(user.Created) <= TimeSpan.FromMinutes(10) || user.Verified)) throw new DuplicateEmailException();
        }

        public async Task<int> UpdateUser(int userId, string phoneNumber, string password, int requesterUserId, bool requesterIsAdmin)
        {
            if (!requesterIsAdmin && requesterUserId != userId)
                throw new AuthorizationException("You can only update your own account.");

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return 0;

            if (!string.IsNullOrWhiteSpace(phoneNumber))
            {
                user.PhoneNumber = phoneNumber;
            }
            if (!string.IsNullOrWhiteSpace(password))
            {
                user.Salt = Guid.NewGuid().ToString();
                user.Password = _encrypt.HashPassword(password, user.Salt);
                // Any password change revokes other sessions
                user.RefreshToken = null;
                user.RefreshTokenExpiry = null;
            }
            await _userRepository.UpdateAsync(user);
            return user.Id ?? 0;
        }

        public async Task<int> DeleteUser(int userId, int requesterUserId, bool requesterIsAdmin)
        {
            if (!requesterIsAdmin)
                throw new AuthorizationException("Only administrators can delete users.");

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return 0;

            // Remove linked profiles first
            var profiles = await _profileRepository.GetProfilesByUserIdAsync(userId);
            foreach (var profile in profiles)
            {
                await _profileRepository.DeleteByIdAsync(profile.Id);
            }

            await _userRepository.DeleteByIdAsync(userId);
            return userId;
        }

        public async Task<AfterAuthDto> RefreshTokenAsync(string refreshToken)
        {
            var users = await _userRepository.Get(u => u.RefreshToken == refreshToken);
            var user = users.FirstOrDefault();

            if (user == null || user.Id == null)
                throw new AuthorizationException("Invalid refresh token");

            if (user.RefreshTokenExpiry == null || user.RefreshTokenExpiry < DateTime.UtcNow)
                throw new AuthorizationException("Refresh token expired");

            // Rotate tokens (also re-embeds the current profileId claim)
            return await IssueTokensAsync(user);
        }

        // --- Admin operations ---

        public async Task<List<AdminUserDto>> GetAllUsers()
        {
            var users = await _userRepository.Get();
            return users
                .OrderBy(u => u.Id)
                .Select(u => new AdminUserDto
                {
                    Id = u.Id ?? 0,
                    Email = u.Email,
                    Role = u.Role,
                    Verified = u.Verified,
                    Created = u.Created
                })
                .ToList();
        }

        public async Task<string> ResetPasswordAsync(int userId, string? newPassword)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) throw new InvalidOperationException("User not found");

            var generated = string.IsNullOrWhiteSpace(newPassword);
            var password = generated ? GenerateRandomPassword() : newPassword!.Trim();

            user.Salt = General.Helpers.GenerateSalt();
            user.Password = _encrypt.HashPassword(password, user.Salt);
            // Revoke all active sessions of that user
            user.RefreshToken = null;
            user.RefreshTokenExpiry = null;
            await _userRepository.UpdateAsync(user);

            return password;
        }

        public async Task SetUserRoleAsync(int userId, string role, int requesterUserId)
        {
            if (role != Roles.Administrator && role != Roles.User)
                throw new InvalidOperationException("Invalid role");

            if (userId == requesterUserId)
                throw new InvalidOperationException("You cannot change your own role.");

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) throw new InvalidOperationException("User not found");

            user.Role = role;
            await _userRepository.UpdateAsync(user);
        }

        private static string GenerateRandomPassword()
        {
            const string lower = "abcdefghijkmnopqrstuvwxyz";
            const string upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
            const string digits = "23456789";
            const string special = "!@#$%^&*-";
            var all = lower + upper + digits + special;

            var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
            var bytes = new byte[12];
            rng.GetBytes(bytes);

            var chars = new char[12];
            // Guarantee at least one char of each class, fill the rest from the pool
            chars[0] = lower[bytes[0] % lower.Length];
            chars[1] = upper[bytes[1] % upper.Length];
            chars[2] = digits[bytes[2] % digits.Length];
            chars[3] = special[bytes[3] % special.Length];
            for (int i = 4; i < chars.Length; i++)
            {
                chars[i] = all[bytes[i] % all.Length];
            }

            // Shuffle deterministically with remaining entropy
            for (int i = chars.Length - 1; i > 0; i--)
            {
                int j = bytes[i] % (i + 1);
                (chars[i], chars[j]) = (chars[j], chars[i]);
            }

            return new string(chars);
        }
    }
}
