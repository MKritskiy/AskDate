using AskDate.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace AskDate.Web.Hubs;

/// <summary>
/// Realtime hub. Clients join a per-group channel after loading a group;
/// service mutations broadcast compact change events to that channel.
/// </summary>
[Authorize]
public class GroupHub(IParticipantRepository participantRepository) : Hub
{
    public async Task JoinGroup(int groupId)
    {
        var profileId = PrincipalExtensions.GetProfileId(Context.GetHttpContext()!);
        if (profileId <= 0 || groupId <= 0) return;

        // Only group members may subscribe to its channel
        if (!await participantRepository.IsMemberAsync(groupId, profileId)) return;

        await Groups.AddToGroupAsync(Context.ConnectionId, GroupName(groupId));
    }

    public Task LeaveGroup(int groupId) =>
        Groups.RemoveFromGroupAsync(Context.ConnectionId, GroupName(groupId));

    internal static string GroupName(int groupId) => $"group-{groupId}";
}
