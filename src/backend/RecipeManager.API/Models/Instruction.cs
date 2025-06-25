namespace RecipeManager.API.Models;

public class Instruction
{
    public int Id { get; set; }
    public string Step { get; set; }

    public int RecipeId { get; set; }
}