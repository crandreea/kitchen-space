using System.ComponentModel.DataAnnotations;

namespace RecipeManager.API.Models.DTOs;

public class LoginDTO
{
    [Required]
    public string Username { get; set; }
    
    [Required]
    public string Password { get; set; }
    
}