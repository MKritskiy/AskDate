
using AskDate.Application.DTO;
namespace AskDate.Application.Interfaces;

public interface INoteService
{
    Task<List<NoteDto>> GetByGroupAsync(int groupId);
    Task<NoteDto> CreateAsync(int groupId, NoteCreateDto dto, int profileId);
    Task DeleteAsync(int id, int profileId);
    Task ConfirmNoteAsync(int id, int profileId);
    Task UnconfirmNoteAsync(int id, int profileId);
}
