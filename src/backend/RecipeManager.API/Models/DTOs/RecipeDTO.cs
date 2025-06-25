namespace RecipeManager.API.Models.DTOs;

public class RecipeDTO
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int PreparationTime { get; set; }
    public int CookingTime { get; set; }
    public int Servings { get; set; }

    public string Ingredients { get; set; } 
    public string Instructions { get; set; } 
    
    public int UserId { get; set; }
    
    public IFormFile Image { get; set; }
}
