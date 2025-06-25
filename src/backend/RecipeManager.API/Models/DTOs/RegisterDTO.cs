using System.ComponentModel.DataAnnotations;

namespace RecipeManager.API.Models.DTOs;

public class RegisterDTO
{
    [Required]
    public string Username { get; set; }
    
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [StringLength(50, MinimumLength = 6)]
    public string Password { get; set; }
}