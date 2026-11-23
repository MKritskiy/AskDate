namespace AskDate.Application.Interfaces;

/// <summary>
/// Broadcasts realtime changes to connected clients (SignalR group channels).
/// Payloads are small; clients refetch the affected data.
/// </summary>
public interface IRealtimeNotifier
{
    /// <summary>Any change to the group's notes (created/deleted/edited/confirmed).</summary>
    Task NotifyNotesChangedAsync(int groupId);

    /// <summary>A comment was added/edited/deleted on a note.</summary>
    Task NotifyCommentsChangedAsync(int groupId, int noteId);

    /// <summary>Participants of the group changed (join/leave/mode/role).</summary>
    Task NotifyParticipantsChangedAsync(int groupId);

    /// <summary>Group metadata changed (name) or group was deleted.</summary>
    Task NotifyGroupUpdatedAsync(int groupId, bool deleted = false);
}
