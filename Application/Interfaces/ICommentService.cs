using AskDate.Application.DTO;
namespace AskDate.Application.Interfaces
{
    public interface ICommentService
    {
        Task<List<CommentDto>> GetByNoteAsync(int noteId);
        Task<CommentDto> CreateAsync(int noteId, CommentCreateDto dto, int profileId);
        Task UpdateAsync(int id, CommentUpdateDto dto, int profileId);
        Task DeleteAsync(int id, int profileId);
    }
}