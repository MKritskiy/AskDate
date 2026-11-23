using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AskDate.Web;

/// <summary>
/// Shared helpers for resolving the acting profile.
/// The JWT carries a profileId claim (issued at login); tokens issued before
/// that change are still accepted via the X-Profile-Id header fallback.
/// </summary>
public static class PrincipalExtensions
{
    public static int GetProfileId(this ControllerBase controller) =>
        GetProfileId(controller.HttpContext);

    public static int GetProfileId(HttpContext httpContext)
    {
        var claim = httpContext.User?.FindFirst("profileId")?.Value;
        if (int.TryParse(claim, out var id) && id > 0) return id;

        var header = httpContext.Request.Headers["X-Profile-Id"].FirstOrDefault();
        return int.TryParse(header, out var headerId) && headerId > 0 ? headerId : 0;
    }

    public static int GetUserId(this ControllerBase controller)
    {
        var claim = controller.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.TryParse(claim, out var id) ? id : 0;
    }
}
