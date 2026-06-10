using Users.Application.Exceptions;
using Users.Application.Interfaces;
using Users.Application.Models;
using Users.Domain.Entities;

namespace Users.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        private readonly IEncrypt _encrypt;
        private readonly ICodeCacheService _codeCache;
        private readonly ICodeGenerator _codeGenerator;
        private readonly INotificationQueueService _notificationQueue;

        public UserService(IUserRepository userRepository,
                           ITokenService tokenService,
                           IEncrypt encrypt,
                           ICodeCacheService codeCache,
                           ICodeGenerator codeGenerator,
                           INotificationQueueService notificationQueue)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
            _encrypt = encrypt;
            _codeCache = codeCache;
            _codeGenerator = codeGenerator;
            _notificationQueue = notificationQueue;
        }

        public async Task<int> CreateUser(User user)
        {
            if (user.Email == null || user.Password == null) throw new InvalidOperationException("Incorrect User Data");
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
                var token = _tokenService.GenerateToken(user);
                var refreshToken = _tokenService.GenerateRefreshToken();
                
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
                await _userRepository.UpdateAsync(user);
                
                return new AfterAuthDto { Token = token, RefreshToken = refreshToken, UserId = user.Id ?? 0 };
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
            
            var refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            
            await _userRepository.UpdateAsync(user);

            await _codeCache.RemoveCodeAsync($"email:{email}");

            var token = _tokenService.GenerateToken(user);
            int id = user.Id ?? 0;
            return new AfterAuthDto { Token = token, RefreshToken = refreshToken, UserId = id };
        }

        public async Task ValidateEmail(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user != null && user.Id != null && (DateTimeOffset.UtcNow.Subtract(user.Created) <= TimeSpan.FromMinutes(10) || user.Verified)) throw new DuplicateEmailException();
        }
       
        public async Task<int> UpdateUser(int userId, string phoneNumber, string password)
        {
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
            }
            await _userRepository.UpdateAsync(user);
            return user.Id ?? 0;
        }

        public Task<int> DeleteUser(int userId)
        {
            throw new NotImplementedException();
        }

        public async Task<AfterAuthDto> RefreshTokenAsync(string refreshToken)
        {
            var users = await _userRepository.Get(u => u.RefreshToken == refreshToken);
            var user = users.FirstOrDefault();
            
            if (user == null || user.Id == null)
                throw new AuthorizationException("Invalid refresh token");
            
            if (user.RefreshTokenExpiry == null || user.RefreshTokenExpiry < DateTime.UtcNow)
                throw new AuthorizationException("Refresh token expired");
            
            // Generate new tokens
            var newToken = _tokenService.GenerateToken(user);
            var newRefreshToken = _tokenService.GenerateRefreshToken();
            
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _userRepository.UpdateAsync(user);
            
            return new AfterAuthDto { Token = newToken, RefreshToken = newRefreshToken, UserId = user.Id ?? 0 };
        }

    }
}
