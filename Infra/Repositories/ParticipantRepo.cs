using AskDate.Domain.Entities;
using AskDate.Application.Interfaces;
using AskDate.Infra.Data;
using Infrastructure.Repositories;

namespace AskDate.Infra.Repositories;

public class ParticipantRepo(ApplicationDbContext context) : BaseRepository<Participant>(context), IParticipantRepository
{
    protected override int? GetId(Participant entity)
    {
        return entity.Id;
    }
}