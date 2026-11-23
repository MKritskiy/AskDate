using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Users.Application.Interfaces;
using Users.Application.Models;
using Users.Domain.Entities;

namespace Users.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProfileController(IProfileService ProfileService, IConfiguration Configuration) : ControllerBase
{
    private int RequesterUserId => int.TryParse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value, out var id) ? id : 0;
    private bool RequesterIsAdmin => User.IsInRole(Users.Domain.Constants.Roles.Administrator);

    [HttpPost("add")]
    public async Task<IActionResult> AddProfile([FromBody] AddProfileDto addProfileDto)
    {
        try
        {
            var profile = addProfileDto.ToProfileModel();
            // A profile is always bound to the authenticated user
            profile.UserId = RequesterUserId;
            var profileId = await ProfileService.AddProfile(profile);
            return Ok(profileId);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPut("{profileId:int}")]
    public async Task<IActionResult> UpdateProfile(int profileId, [FromBody] Profile updatedProfile)
    {
        try
        {
            var current = await ProfileService.GetProfileById(profileId);
            if (current == null || current.Id == null) return NotFound();
            if (!RequesterIsAdmin && current.UserId != RequesterUserId) return Forbid();

            current.FirstName = updatedProfile.FirstName;
            current.LastName = updatedProfile.LastName;
            // update age, gender, about are removed per user request, but backend keeps them as is if needed, or we just don't set them
            // leaving them as they are or setting to defaults is fine, we'll just not update them if we want to remove them.

            await ProfileService.UpdateProfile(current);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete("delete/{profileId}")]
    public async Task<IActionResult> DeleteProfile(int profileId)
    {
        try
        {
            await ProfileService.DeleteProfile(profileId);
            return Ok();
        }
        catch (InvalidOperationException)
        {
            return NotFound("Profile not found.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("{profileId:int}")]
    public async Task<ActionResult<Profile?>> GetProfileById(int profileId)
    {
        try
        {
            var profile = await ProfileService.GetProfileById(profileId);
            return Ok(profile);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetProfilesByUserId(int userId)
    {
        try
        {
            var profiles = await ProfileService.GetProfilesByUserId(userId);
            return Ok(profiles);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    /// <summary>
    /// Bulk name lookup used by the askdate.web service. Authorized by the
    /// internal API key (service-to-service) instead of a user JWT.
    /// </summary>
    [HttpGet("profiles")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<Profile>>> GetProfilesByIds([FromQuery] int?[] ids)
    {
        try
        {
            var expectedKey = Configuration["Internal:ApiKey"];
            if (!string.IsNullOrEmpty(expectedKey)
                && Request.Headers["X-Internal-Api-Key"].FirstOrDefault() != expectedKey)
            {
                return Unauthorized();
            }

            var profiles = await ProfileService.GetProfilesByIds(ids);
            // Never expose userId to external callers
            return Ok(profiles?.Select(p => new { p.Id, p.FirstName, p.LastName }));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
