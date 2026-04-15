using AskDate.Application.DTO;
using AskDate.Application.Interfaces;
using AskDate.Domain.Entities;

namespace AskDate.Application.Services;

public class CommentService(ICommentRepository commentRepository, INoteRepository noteRepository, IGroupRepository groupRepository, IProfileApiClient profileApiClient) : ICommentService
{
    public async Task<List<CommentDto>> GetByNoteAsync(int noteId)
    {
        var comments = await commentRepository.Get(c => c.NoteId == noteId);

        var profileIds = comments.Select(c => c.AuthorProfileId).Distinct();
        var names = await profileApiClient.GetProfileNamesAsync(profileIds);

        return comments.Select(c => {
            var dto = Map(c);
            dto.AuthorName = names.GetValueOrDefault(c.AuthorProfileId, "Unknown");
            return dto;
        }).ToList();
    }

    public async Task<CommentDto> CreateAsync(int noteId, CommentCreateDto dto, int profileId)
    {
        var note = await noteRepository.GetByIdAsync(noteId);
        if (note == null) throw new Exception("Note not found");

        var group = await groupRepository.GetByIdAsync("Participants", note.GroupId);
        if (group == null || !group.Participants.Any(p => p.ProfileId == profileId))
        {
            throw new Exception("You are not a participant of this group.");
        }

        var comment = new AskDate.Domain.Entities.Comment
        {
            Content = dto.Content,
            AuthorProfileId = profileId,
            NoteId = noteId
        };
        comment.Created = DateTimeOffset.UtcNow;
        comment.LastModified = comment.Created;

        await commentRepository.AddAsync(comment);
        var res = Map(comment);

        var names = await profileApiClient.GetProfileNamesAsync(new[] { profileId });
        res.AuthorName = names.GetValueOrDefault(profileId, "Unknown");

        return res;
    }

    public async Task UpdateAsync(int id, CommentUpdateDto dto, int profileId)
    {
        var comment = await commentRepository.GetByIdAsync(id);
        if (comment == null) throw new Exception("Not found");
        if (comment.AuthorProfileId != profileId) throw new Exception("Forbidden");

        comment.Content = dto.Content;
        comment.LastModified = DateTimeOffset.UtcNow; // ensure updated
        await commentRepository.UpdateAsync(comment);
    }

    public async Task DeleteAsync(int id, int profileId)
    {
        var comment = await commentRepository.GetByIdAsync(id);
        if (comment == null) return;

        var note = await noteRepository.GetByIdAsync(comment.NoteId);
        if (note == null) return;

        var group = await groupRepository.GetByIdAsync(note.GroupId);
        if (group == null) return;

        if (comment.AuthorProfileId == profileId || group.CreatorProfileId == profileId)
        {
            await commentRepository.DeleteByIdAsync(id);
        }
        else 
        {
            throw new UnauthorizedAccessException("You are not allowed to delete this comment.");
        }
    }

    private static CommentDto Map(Comment comment)
    {
        return new CommentDto
        {
            Id = comment.Id ?? 0,
            Content = comment.Content,
            AuthorProfileId = comment.AuthorProfileId,
            NoteId = comment.NoteId,
            Created = comment.Created,
            LastModified = comment.LastModified
        };
    }
}