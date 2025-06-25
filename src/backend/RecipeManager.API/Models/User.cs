using System.ComponentModel.DataAnnotations;

namespace RecipeManager.API.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool EmailConfirmed { get; set; }
}