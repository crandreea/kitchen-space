"use client"
import "../styles/RecipeTabs.css"

function RecipeTabs({ activeTab, setActiveTab, myRecipesCount, savedRecipesCount }) {
    return (
        <div className="recipe-tabs">
            <button
                className={`tab-button ${activeTab === "myRecipes" ? "active" : ""}`}
                onClick={() => setActiveTab("myRecipes")}
            >
                My Recipes ({myRecipesCount})
            </button>
            <button
                className={`tab-button ${activeTab === "savedRecipes" ? "active" : ""}`}
                onClick={() => setActiveTab("savedRecipes")}
            >
                Saved Recipes ({savedRecipesCount})
            </button>
        </div>
    )
}

export default RecipeTabs
