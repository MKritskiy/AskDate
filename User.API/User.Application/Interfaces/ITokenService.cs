using Users.Domain.Entities;

namespace Users.Application.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user, int? profileId = null);
        string GenerateRefreshToken();
    }
}
