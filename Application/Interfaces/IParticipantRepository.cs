using AskDate.Application.Interfaces;
using AskDate.Domain.Entities;

namespace AskDate.Application.Interfaces;

public interface IParticipantRepository : IBaseRepository<Participant>
{
    Task<bool> IsMemberAsync(int groupId, int profileId);
}
