"use client"

import "../styles/RecipeCard.css"
import save from '../data/saving-icon.png'

function SaveRecipeCard({ recipe, onView, onSave, isSaved }) {
    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={`full-${i}`} className="star full">
          ★
        </span>,
            )
        }

        if (hasHalfStar) {
            stars.push(
                <span key="half" className="star half">
          ★
        </span>,
            )
        }

        const emptyStars = 5 - stars.length
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <span key={`empty-${i}`} className="star empty">
          ☆
        </span>,
            )
        }

        return stars
    }

    const handleSave = (e) => {
        e.stopPropagation()
        onSave(recipe.id)
    }
    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/placeholder-recipe.jpg'

        if (imagePath.startsWith('/')) {
            return `http://localhost:5122${imagePath}`
        }
        return imagePath
    }

    return (
        <div className="recipe-card" onClick={() => onView(recipe)}>
            <div className="recipe-card-header">
                <img
                    src={getImageUrl(recipe.image)}
                    alt={recipe.title}
                    className="recipe-image"
                    onError={(e) => {
                        e.target.src = '/placeholder-recipe.jpg'
                    }}
                />
                <div className="recipe-info">
                    <h3 className="recipe-name">{recipe.title}</h3>
                    <div className="recipe-rating">
                        <div className="stars">{renderStars(recipe.stars)}</div>
                        <span className="reviews">({recipe.reviews} reviews)</span>
                    </div>
                </div>
                <div className="recipe-actions">
                    <button
                        className={`save-button ${isSaved ? "saved" : ""}`}
                        onClick={handleSave}
                        title={isSaved ? "Delete recipe from saved" : "Save recipe"}
                    >
                        <img className="save-icon" src={save} alt="Save icon" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SaveRecipeCard
