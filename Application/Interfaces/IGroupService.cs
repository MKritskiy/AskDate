using AskDate.Application.DTO;
namespace AskDate.Application.Interfaces;

public interface IGroupService
{
    Task<List<GroupDto>> GetAllAsync(int profileId);
    Task<GroupDto> GetByIdAsync(int id);
    Task<GroupDto> GetByInviteLinkAsync(string link);
    Task<GroupDto> CreateAsync(GroupCreateDto dto, int creatorProfileId);
    Task<GroupDto> UpdateAsync(int id, GroupUpdateDto dto);
    Task RemoveParticipantAsync(int groupId, int profileId, int currentProfileId);

    /// <exception cref="UnauthorizedAccessException">The caller is not a member and did not present a valid invite link.</exception>
    Task AddParticipantAsync(int groupId, int profileId, string? inviteLink);
    Task DeleteAsync(int id, int currentProfileId);
    Task SetUnmarkedDaysFreeAsync(int groupId, int profileId, bool unmarkedDaysFree);
}
