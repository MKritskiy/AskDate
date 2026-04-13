using AskDate.Application.Interfaces;
using AskDate.Domain.Entities;
using Infrastructure.Repositories;
 
namespace AskDate.Infra.Repo;

public class GroupRepo(DbContext context) : BaseRepository<Group>(context), IGroupRepository
{
    protected override int? GetId(Group entity)
    {
        return entity.Id;
    }
}