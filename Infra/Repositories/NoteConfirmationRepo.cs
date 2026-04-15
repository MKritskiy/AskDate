using AskDate.Application.Interfaces;
using AskDate.Domain.Entities;
using Infrastructure.Repositories;
using AskDate.Infra.Data;

namespace AskDate.Infra.Repositories;

public class NoteConfirmationRepo(ApplicationDbContext context) : BaseRepository<NoteConfirmation>(context), INoteConfirmationRepository
{
    protected override int? GetId(NoteConfirmation entity)
    {
        return entity.Id;
    }
}