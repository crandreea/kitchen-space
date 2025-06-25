namespace RecipeManager.API.Models;

public class Recipe
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int PreparationTime { get; set; }
    public int CookingTime { get; set; }
    public int Servings { get; set; }

    public List<Ingredient> Ingredients { get; set; } = new();
    public List<Instruction> Instructions { get; set; } = new();
    
    public int UserId { get; set; }
    
    public string Image { get; set; }
}