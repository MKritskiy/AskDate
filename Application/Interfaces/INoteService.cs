
using AskDate.Application.DTO;
namespace AskDate.Application.Interfaces;

public interface INoteService
{
    Task<List<NoteDto>> GetByGroupAsync(int groupId);
    Task<NoteDto> CreateAsync(int groupId, NoteCreateDto dto, int profileId);
    Task DeleteAsync(int id, int profileId);
    Task DeleteSeriesAsync(int parentNoteId, int profileId);
    Task ConfirmNoteAsync(int id, int profileId);
    Task UnconfirmNoteAsync(int id, int profileId);
    Task ConfirmSeriesAsync(int parentNoteId, int profileId);
    Task UnconfirmSeriesAsync(int parentNoteId, int profileId);
    Task<NoteDto> UpdateTitleAsync(int id, string? title, int profileId);

    // Virtual instance methods — materialize a child note on demand
    Task<int> MaterializeInstanceAsync(int parentId, DateTime date);
    Task ConfirmInstanceAsync(int parentId, DateTime date, int profileId);
    Task UnconfirmInstanceAsync(int parentId, DateTime date, int profileId);
    Task<NoteDto> UpdateInstanceTitleAsync(int parentId, DateTime date, string? title, int profileId);

    // Decode virtual ID helpers
    static (int parentId, DateTime date) DecodeVirtualId(int virtualId)
    {
        var abs = Math.Abs(virtualId);
        var parentId = abs / 100000;
        var daysSinceEpoch = abs % 100000;
        var date = DateTime.SpecifyKind(new DateTime(1970, 1, 1).AddDays(daysSinceEpoch), DateTimeKind.Utc);
        return (parentId, date);
    }

    static int EncodeVirtualId(int parentId, DateTime date)
    {
        var daysSinceEpoch = (int)(date.Date - new DateTime(1970, 1, 1)).TotalDays;
        return -(parentId * 100000 + daysSinceEpoch);
    }
}
