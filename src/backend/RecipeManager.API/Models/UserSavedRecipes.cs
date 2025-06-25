namespace RecipeManager.API.Models;

public class UserSavedRecipe
{
    public int UserId { get; set; }
    public User User { get; set; } 

    public int RecipeId { get; set; }
    public Recipe Recipe { get; set; } 
}