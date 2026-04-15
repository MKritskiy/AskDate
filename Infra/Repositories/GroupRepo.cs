using AskDate.Application.Interfaces;
using AskDate.Domain.Entities;
using AskDate.Infra.Data;
using Infrastructure.Repositories;

namespace AskDate.Infra.Repositories;

public class GroupRepo(ApplicationDbContext context) : BaseRepository<AskDate.Domain.Entities.Group>(context), IGroupRepository
{
    protected override int? GetId(AskDate.Domain.Entities.Group entity)
    {
        return entity.Id;
    }

    public async Task<AskDate.Domain.Entities.Group?> GetByInviteLinkAsync(string link)
    {
        return await _dbSet.FirstOrDefaultAsync(g => g.InviteLink == link);
    }
}