"use client"

import {useEffect, useState} from "react"
import "../styles/Profile.css"
import ProfileHeader from "../components/ProfileHeader"
import RecipeTabs from "../components/RecipeTabs"
import RecipeCard from "../components/RecipeCard"
import RecipeModal from "../components/RecipeModal"
import RecipeForm from "../components/RecipeForm"
import profile from '../data/profile-pic.png'
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import SaveRecipeCard from "../components/SaveRecipeCard";

const getLoggedInUserId = () => {
    return localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId")) : null;
};

const getAuthToken = () => {
    return localStorage.getItem("token");
};

const CURRENT_USER_ID = getLoggedInUserId();
console.log("user id", CURRENT_USER_ID);
function Profile() {
    const [activeTab, setActiveTab] = useState("myRecipes")
    const [profileData, setProfileData] = useState(null)
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const [showRecipeForm, setShowRecipeForm] = useState(false)
    const [editingRecipe, setEditingRecipe] = useState(null)
    const [recipes, setRecipes] = useState([])
    const [savedRecipes, setSavedRecipes] = useState([]);
    
    useEffect(() => {
        if (!CURRENT_USER_ID) {
            console.warn("No user ID found. Please ensure the user is logged in.");
            return;
        }

        const token = getAuthToken();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        
        axios.get(`http://localhost:5122/api/User/${CURRENT_USER_ID}`, config)
            .then(res => {
                setProfileData({
                    id: res.data.data.id,
                    name: res.data.data.username,
                    profilePic: profile, 
                    description: "No description available." 
                });
            })
            .catch(err => console.error("Failed to fetch user data:", err));

        axios.get("http://localhost:5122/api/Recipe")
            .then(res => setRecipes(res.data))
            .catch(err => console.error("Failed to fetch recipes:", err))

        axios.get(`http://localhost:5122/api/Recipe/saved/${CURRENT_USER_ID}`)
            .then(res => setSavedRecipes(res.data))
            .catch(err => console.error("Failed to fetch saved recipes:", err));
            
    }, [CURRENT_USER_ID]);
    
    
    const handleProfileUpdate = (newData) => {
        setProfileData({ ...profileData, ...newData })
    }
    
    const handleAddRecipe = () => {
        setEditingRecipe(null)
        setShowRecipeForm(true)
    }
    
    const handleEditRecipe = (recipe) => {
        setEditingRecipe(recipe)
        setShowRecipeForm(true)
    }
    
    const handleDeleteRecipe = (id) => {
        axios.delete(`http://localhost:5122/api/Recipe/${id}`)
            .then(() => setRecipes(recipes.filter(r => r.id !== id)))
            .catch(err => console.error("Failed to delete:", err))
    }

    const handleSaveRecipe = (recipe) => {
        
        if (editingRecipe) {
            const hasNewImage = recipe.imageFile !== null;
            if(hasNewImage) {
                const formData = new FormData();
                formData.append("id", editingRecipe.id);
                formData.append("title", recipe.name);
                formData.append("preparationTime", parseInt(recipe.prepTime));
                formData.append("cookingTime", parseInt(recipe.cookTime));
                formData.append("servings", parseInt(recipe.servings));
                formData.append("userId", profileData.id);
                
                formData.append("ingredients", JSON.stringify(recipe.ingredients.map(i => ({ name: i }))));
                formData.append("instructions", JSON.stringify(recipe.steps.map(s => ({ step: s }))));
                
                formData.append("image", recipe.imageFile);

                console.log("Updating recipe with new image:", {
                    title: recipe.name,
                    preparationTime: parseInt(recipe.prepTime),
                    cookingTime: parseInt(recipe.cookTime),
                    servings: parseInt(recipe.servings),
                    userId: profileData.id,
                    ingredients: JSON.stringify(recipe.ingredients.map(i => ({ name: i }))),
                    instructions: JSON.stringify(recipe.steps.map(s => ({ step: s }))),
                    hasNewImage: true
                });

                axios.put(`http://localhost:5122/api/Recipe/${editingRecipe.id}/with-image`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                    .then(res => {
                        const updatedRecipe = res.data;
                        setRecipes(recipes.map(r => r.id === editingRecipe.id ? updatedRecipe : r));
                        setShowRecipeForm(false);
                        setEditingRecipe(null);
                    })
                    .catch(err => {
                        console.error("Failed to update recipe with image:", err);
                        alert("Failed to update recipe. Please try again.");
                    });
            }else{
                const recipeData = {
                    id: editingRecipe.id,
                    title: recipe.name,
                    preparationTime: parseInt(recipe.prepTime),
                    cookingTime: parseInt(recipe.cookTime),
                    servings: parseInt(recipe.servings),
                    userId: profileData.id,
                    ingredients: recipe.ingredients.map(i => ({ name: i })),
                    instructions: recipe.steps.map(s => ({ step: s })),
                    image: editingRecipe.image 
                };

                console.log("Updating recipe without new image:", editingRecipe.image);
                console.log("Updating recipe with new image:", {
                    title: recipe.name,
                    preparationTime: parseInt(recipe.prepTime),
                    cookingTime: parseInt(recipe.cookTime),
                    servings: parseInt(recipe.servings),
                    userId: profileData.id,
                    ingredients: JSON.stringify(recipe.ingredients.map(i => ({ name: i }))),
                    instructions: JSON.stringify(recipe.steps.map(s => ({ step: s }))),
                    hasNewImage: false
                });
                
                axios.put(`http://localhost:5122/api/Recipe/${editingRecipe.id}`, recipeData)
                    .then(() => axios.get("http://localhost:5122/api/Recipe"))
                    .then(res => {
                        setRecipes(res.data)
                        /*setProfileData(prev => ({
                            ...prev,
                            myRecipes: res.data.filter(r => r.userId === prev.id)
                        }))*/
                        setShowRecipeForm(false)
                        setEditingRecipe(null)
                    })
                    .catch(err => {
                        console.error("Failed to update recipe without image:", err);
                        alert("Failed to update recipe. Please try again.");
                    });
            }
        } else {
            const formData = new FormData()
            formData.append("title", recipe.name)
            formData.append("preparationTime", parseInt(recipe.prepTime))
            formData.append("cookingTime", parseInt(recipe.cookTime))
            formData.append("servings", parseInt(recipe.servings))
            formData.append("userId", profileData.id)

            formData.append("ingredients", JSON.stringify(recipe.ingredients.map(i => ({ name: i }))));
            formData.append("instructions", JSON.stringify(recipe.steps.map(s => ({ step: s }))));

            if (recipe.imageFile) {
                formData.append("image", recipe.imageFile)
            } else {
                alert("Please select an image for the recipe")
                return
            }

            console.log("Sending FormData:", {
                title: recipe.name,
                preparationTime: parseInt(recipe.prepTime),
                cookingTime: parseInt(recipe.cookTime),
                servings: parseInt(recipe.servings),
                userId: profileData.id,
                ingredients: JSON.stringify(recipe.ingredients.map(i => ({ name: i }))),
                instructions: JSON.stringify(recipe.steps.map(s => ({ step: s }))),
                hasImage: !!recipe.imageFile
            })
            
            axios.post("http://localhost:5122/api/Recipe/with-image", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then(res => {
                    setRecipes([...recipes, res.data]) 
                    /*setProfileData(prev => ({
                        ...prev,
                        myRecipes: [...prev.myRecipes, res.data]
                    }))*/
                    setShowRecipeForm(false)
                })
                .catch(err => console.error("Failed to add recipe:", err))
        }
    }
    
    const handleToggleSaveRecipe = (recipeId) => {
        if (!CURRENT_USER_ID) {
            alert("Please log in to save or unsave recipes!");
            return;
        }

        const isCurrentlySaved = savedRecipes.some(r => r.id === recipeId);

        if (isCurrentlySaved) {
            axios.delete(`http://localhost:5122/api/Recipe/${recipeId}/unsave/${CURRENT_USER_ID}`)
                .then(() => {
                    setSavedRecipes(savedRecipes.filter(r => r.id !== recipeId));
                })
                .catch(err => console.error("Failed to unsave recipe:", err));
        } else {
            axios.post(`http://localhost:5122/api/Recipe/${recipeId}/save/${CURRENT_USER_ID}`)
                .then(() => {
                    axios.get(`http://localhost:5122/api/Recipe/${recipeId}`)
                        .then(res => {
                            setSavedRecipes([...savedRecipes, res.data]);
                        })
                        .catch(err => console.error("Failed to fetch saved recipe details:", err));
                })
                .catch(err => console.error("Failed to save recipe:", err));
        }
    };
    const handleViewRecipe = (recipe) => {
        setSelectedRecipe(recipe)
    }

    const handleCloseRecipeModal = () => {
        setSelectedRecipe(null)
    }

    const handleCloseForm = () => {
        setShowRecipeForm(false)
        setEditingRecipe(null)
    }

    if (!profileData) {
        return (
            <MainLayout>
                <div className="message">Loading profile data...</div>
            </MainLayout>
        );
    }
    return (
        <MainLayout>
            <div className="profile-container">
                <ProfileHeader
                    profilePic={profileData.profilePic}
                    name={profileData.name}
                    description={profileData.description}
                    myRecipesCount={recipes
                        .filter((recipe) => recipe.userId === profileData.id).length}
                    savedRecipesCount={savedRecipes.length}
                    onProfileUpdate={handleProfileUpdate}
                    onAddRecipe={handleAddRecipe}
                />
    
                <RecipeTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    myRecipesCount={recipes
                        .filter((recipe) => recipe.userId === profileData.id).length}
                    savedRecipesCount={savedRecipes.length}
                />

                <div className="recipes-container">
                    {activeTab === "myRecipes"
                        ?  recipes
                            .filter((recipe) => recipe.userId === profileData.id)
                            .map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                onView={handleViewRecipe}
                                onEdit={handleEditRecipe}
                                onDelete={handleDeleteRecipe}
                                showEditOptions={true}
                            />
                        ))
                        : savedRecipes.map((recipe) => (
                            <SaveRecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                onView={handleViewRecipe}
                                onSave={handleSaveRecipe}
                                isSaved={true}
                                showEditOptions={false}
                            />
                            /*<RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                onView={handleViewRecipe}
                                onDelete={() => handleToggleSaveRecipe(recipe.id)}
                                showEditOptions={false} 
                            />*/
                        ))}
                </div>

                {selectedRecipe && <RecipeModal
                    recipe={selectedRecipe}
                    onClose={handleCloseRecipeModal}
                    onSave={handleToggleSaveRecipe} 
                    isSaved={savedRecipes.some(r => r.id === selectedRecipe.id)}
                />}

                {showRecipeForm && <RecipeForm recipe={editingRecipe} onSave={handleSaveRecipe} onClose={handleCloseForm} />}
            </div>
        </MainLayout>
    )
}

export default Profile
