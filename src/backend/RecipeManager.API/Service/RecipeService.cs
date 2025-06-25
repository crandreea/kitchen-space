using RecipeManager.API.Data.Repositories;
using RecipeManager.API.Models;

namespace RecipeManager.API.Service;

public class RecipeService : IRecipeService
{
    private readonly IRecipeRepository _repository;

    public RecipeService(IRecipeRepository repository)
    {
        _repository = repository;
    }

    public Task<List<Recipe>> GetAllRecipesAsync() => _repository.GetAllAsync();
    public Task<Recipe?> GetRecipeByIdAsync(int id) => _repository.GetByIdAsync(id);
    public Task<Recipe> CreateRecipeAsync(Recipe recipe) => _repository.AddAsync(recipe);
    public Task UpdateRecipeAsync(Recipe recipe) => _repository.UpdateAsync(recipe);
    public Task DeleteRecipeAsync(int id) => _repository.DeleteAsync(id);
    public Task<IEnumerable<Recipe>> GetRecipesByUserIdAsync(int userId) => _repository.GetRecipesByUserIdAsync(userId);
    
    public Task<bool> SaveRecipeForUserAsync(int userId, int recipeId)=> _repository.SaveRecipeForUserAsync(userId, recipeId);
    public Task<bool> UnsaveRecipeForUserAsync(int userId, int recipeId) => _repository.UnsaveRecipeForUserAsync(userId, recipeId);
    public Task<IEnumerable<Recipe>> GetSavedRecipesByUserIdAsync(int userId) => _repository.GetSavedRecipesByUserIdAsync(userId);
    public Task<bool> IsRecipeSavedByUserAsync(int userId, int recipeId) => _repository.IsRecipeSavedByUserAsync(userId, recipeId);
   
}