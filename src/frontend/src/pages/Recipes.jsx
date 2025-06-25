"use client"

import {useEffect, useMemo, useState} from "react"
import RecipeModal from "../components/RecipeModal"
import "../styles/Recipes.css"
import MainLayout from "../layout/MainLayout";
import SaveRecipeCard from "../components/SaveRecipeCard";
import axios from "axios";

export default function Recipes() {
    const [recipes, setRecipes] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const [savedRecipes, setSavedRecipes] = useState(new Set())

    const CURRENT_USER_ID = 0 ;
    
    useEffect(() => {
    const userIdToFetch = 0; 
    axios.get(`http://localhost:5122/api/Recipe/user/${userIdToFetch}`)
        .then(res => {
            setRecipes(res.data);
            console.log("Recipes fetched for user ID 0:", res.data);
        })
        .catch(err => {
            console.error(`Failed to fetch recipes for user ID ${userIdToFetch}:`, err);
            setRecipes([]);
        });
    }, []);

    const filteredAndSortedRecipes = useMemo(() => {
        return recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [recipes, searchTerm]);

    const handleSaveRecipe = (recipeId) => {
        const CURRENT_USER_ID = 0;
        const isCurrentlySaved = savedRecipes.has(recipeId);

        if (isCurrentlySaved) {
            axios.delete(`http://localhost:5122/api/Recipe/${recipeId}/unsave/${CURRENT_USER_ID}`)
                .then(() => {
                    setSavedRecipes((prev) => {
                        const newSaved = new Set(prev);
                        newSaved.delete(recipeId);
                        return newSaved;
                    });
                })
                .catch(err => console.error("Failed to unsave recipe:", err));
        } else {
            axios.post(`http://localhost:5122/api/Recipe/${recipeId}/save/${CURRENT_USER_ID}`)
                .then(() => {
                    setSavedRecipes((prev) => {
                        const newSaved = new Set(prev);
                        newSaved.add(recipeId);
                        return newSaved;
                    });
                })
                .catch(err => console.error("Failed to save recipe:", err));
        }
    }

    const handleViewRecipe = (recipe) => {
        setSelectedRecipe(recipe)
    }

    const handleCloseModal = () => {
        setSelectedRecipe(null)
    }
    

    return (
        <MainLayout>
            <div className="recipes-container">
                <div className="recipes-header">
                    <h1 className="recipes-title">All recipes</h1>
                    <p className="recipes-subtitle">Discover and save your favourite recipes</p>
                </div>

                <div className="search-container">
                    <div className="search-input-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search recipes by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                <div className="results-info">
                    <p>
                        {filteredAndSortedRecipes.length} recipes found
                        {searchTerm && ` for "${searchTerm}"`}
                    </p>
                </div>
                
                <div className="recipes-grid">
                    {filteredAndSortedRecipes.map((recipe) => (
                        <SaveRecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onView={handleViewRecipe}
                            onSave={handleSaveRecipe}
                            isSaved={savedRecipes.has(recipe.id)}
                            showEditOptions={false}
                        />
                    ))}
                </div>

                {filteredAndSortedRecipes.length === 0 && (
                    <div className="no-results">
                        <div className="no-results-icon"> 🔍</div>
                        <h3>Recipes not found</h3>
                        <p>Try again</p>
                    </div>
                )}

                {selectedRecipe && (
                    <RecipeModal
                        recipe={selectedRecipe}
                        onClose={handleCloseModal}
                        onSave={handleSaveRecipe}
                        isSaved={savedRecipes.has(selectedRecipe.id)}
                    />
                )}
            </div>
        </MainLayout>
    )
}
