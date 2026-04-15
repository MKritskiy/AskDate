using AskDate.Application.Interfaces;
using AskDate.Domain.Entities;
using Infrastructure.Repositories;
using AskDate.Infra.Data;


namespace AskDate.Infra.Repositories;

public class NoteRepo(ApplicationDbContext context) : BaseRepository<Note>(context), INoteRepository
{
    protected override int? GetId(Note entity)
    {
        return entity.Id;
    }
}
