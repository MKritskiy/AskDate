using AskDate.Application.Interfaces;
using AskDate.Domain.Entities;
using Infrastructure.Repositories;


namespace AskDate.Infra.Repositories;

public class NoteRepo(DbContext context) : BaseRepository<Note>(context), INoteRepository
{
    protected override int? GetId(Note entity)
    {
        return entity.Id;
    }
}
