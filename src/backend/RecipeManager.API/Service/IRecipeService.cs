using RecipeManager.API.Models;

namespace RecipeManager.API.Service;

public interface IRecipeService
{
    Task<List<Recipe>> GetAllRecipesAsync();
    Task<Recipe?> GetRecipeByIdAsync(int id);
    Task<Recipe> CreateRecipeAsync(Recipe recipe);
    Task UpdateRecipeAsync(Recipe recipe);
    Task DeleteRecipeAsync(int id);
    Task<IEnumerable<Recipe>> GetRecipesByUserIdAsync(int userId);
    
    Task<bool> SaveRecipeForUserAsync(int userId, int recipeId);
    Task<bool> UnsaveRecipeForUserAsync(int userId, int recipeId);
    Task<IEnumerable<Recipe>> GetSavedRecipesByUserIdAsync(int userId);
    Task<bool> IsRecipeSavedByUserAsync(int userId, int recipeId);
}