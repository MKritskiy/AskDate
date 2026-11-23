using Users.Domain.Constants;

namespace Users.Application.Models;

/// <summary>Admin-facing user record (no secrets).</summary>
public class AdminUserDto
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = Roles.User;
    public bool Verified { get; set; }
    public DateTimeOffset Created { get; set; }
}

public class ResetPasswordDto
{
    /// <summary>Empty/omitted — server generates a random password and returns it once.</summary>
    public string? NewPassword { get; set; }
}

public class SetRoleDto
{
    public string Role { get; set; } = Roles.User;
}
