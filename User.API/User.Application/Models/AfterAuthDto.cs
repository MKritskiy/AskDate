namespace Users.Application.Models
{
    public class AfterAuthDto
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public int UserId { get; set; }
    }
}
