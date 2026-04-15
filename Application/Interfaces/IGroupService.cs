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
    Task AddParticipantAsync(int groupId, int profileId);
    Task DeleteAsync(int id, int currentProfileId);
}
