namespace RecipeManager.API.Models.DTOs;

public class LoginResponseDTO
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string Token { get; set; }
    public int UserId { get; set; }
}