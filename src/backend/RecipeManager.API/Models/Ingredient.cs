namespace RecipeManager.API.Models;

public class Ingredient
{
    public int Id { get; set; }
    public string Name { get; set; }

    public int RecipeId { get; set; }
}