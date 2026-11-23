using AskDate.Domain.Entities;
using AskDate.Application.Interfaces;
using AskDate.Infra.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AskDate.Infra.Repositories;

public class ParticipantRepo(ApplicationDbContext context) : BaseRepository<Participant>(context), IParticipantRepository
{
    protected override int? GetId(Participant entity)
    {
        return entity.Id;
    }

    public Task<bool> IsMemberAsync(int groupId, int profileId) =>
        _dbSet.AsNoTracking().AnyAsync(p => p.GroupId == groupId && p.ProfileId == profileId);
}
