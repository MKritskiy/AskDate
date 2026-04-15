using AskDate.Application.DTO;
using AskDate.Application.Interfaces;
using AskDate.Domain.Entities;

namespace AskDate.Application.Services;

public class NoteService(INoteRepository noteRepository, INoteConfirmationRepository noteConfirmationRepository, IGroupRepository groupRepository, IProfileApiClient profileApiClient) : INoteService
{
    public async Task<List<NoteDto>> GetByGroupAsync(int groupId)
    {
        var notes = await noteRepository.Get(n => n.GroupId == groupId);
        var confirmations = await noteConfirmationRepository.Get(c => notes.Select(nx => (int?)nx.Id).Contains(c.NoteId));

        var allProfileIds = notes.Select(n => n.CreatorProfileId)
            .Concat(confirmations.Select(c => c.ProfileId))
            .Distinct().ToList();

        var names = await profileApiClient.GetProfileNamesAsync(allProfileIds);

        return notes.Select(n => 
        {
            var dto = Map(n);
            dto.CreatorName = names.GetValueOrDefault(n.CreatorProfileId, "Unknown");
            dto.ConfirmedProfileIds = confirmations.Where(c => c.NoteId == n.Id).Select(c => c.ProfileId).ToList();
            dto.ConfirmedProfileNames = dto.ConfirmedProfileIds.Select(id => names.GetValueOrDefault(id, "Unknown")).ToList();
            return dto;
        }).ToList();
    }

    public async Task<NoteDto> CreateAsync(int groupId, NoteCreateDto dto, int profileId)
    {
        var note = new Note
        {
            Date = dto.Date,
            GroupId = groupId,
            CreatorProfileId = profileId
        };

        await noteRepository.AddAsync(note);
        var res = Map(note);
        res.ConfirmedProfileIds = new List<int>();

        var names = await profileApiClient.GetProfileNamesAsync(new[] { profileId });
        res.CreatorName = names.GetValueOrDefault(profileId, "Unknown");
        res.ConfirmedProfileNames = new List<string>();

        return res;
    }

    public async Task DeleteAsync(int id, int profileId)
    {
        var note = await noteRepository.GetByIdAsync(id);
        if (note == null) return;

        var group = await groupRepository.GetByIdAsync(note.GroupId);

        if (note.CreatorProfileId == profileId || (group != null && group.CreatorProfileId == profileId))
        {
            await noteRepository.DeleteByIdAsync(id);
        }
        else 
        {
            throw new UnauthorizedAccessException("You are not allowed to delete this note.");
        }
    }

    public async Task ConfirmNoteAsync(int id, int profileId)
    {
        var existing = await noteConfirmationRepository.Get(c => c.NoteId == id && c.ProfileId == profileId);
        if (!existing.Any())
        {
            await noteConfirmationRepository.AddAsync(new NoteConfirmation { NoteId = id, ProfileId = profileId });
        }
    }

    public async Task UnconfirmNoteAsync(int id, int profileId)
    {
        var existing = await noteConfirmationRepository.Get(c => c.NoteId == id && c.ProfileId == profileId);
        if (existing.Any())
        {
            await noteConfirmationRepository.DeleteByIdAsync(existing.First().Id);
        }
    }

    private static NoteDto Map(Note note)
    {
        return new NoteDto
        {
            Id = note.Id ?? 0,
            Date = note.Date,
            GroupId = note.GroupId,
            CreatorProfileId = note.CreatorProfileId
        };
    }
}