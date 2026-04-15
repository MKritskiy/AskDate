using AskDate.Domain.Entities;
using Application.Interfaces;

namespace AskDate.Application.Interfaces;

public interface IGroupRepository : IBaseRepository<AskDate.Domain.Entities.Group>
{
    Task<AskDate.Domain.Entities.Group?> GetByInviteLinkAsync(string link);
}