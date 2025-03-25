import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { ChefHat, Clock, Search, Users, Utensils } from 'lucide-react'
import KitchenSpaceLogo from '../data/logo.png';
import '../styles/About.css';
import people from '../data/people_eating.jpg';
import kitchen from '../data/kitchen-with-ingredients.avif';
import MainLayout from "../layout/MainLayout";

const About = () => {
    return (
        <MainLayout>
            <div className="container">
                <section className="hero-section">
                    <h1>About KitchenSpace</h1>
                    <div className="hero-content">
                        <p className="hero-description">
                            KitchenSpace is your ultimate culinary companion, designed to inspire creativity in the kitchen and make cooking an enjoyable experience for everyone.
                        </p>
                        <div className="hero-image-container">
                            <img
                                src={kitchen}
                                alt="Kitchen with fresh ingredients"
                                className="hero-image"
                            />
                        </div>
                    </div>
                </section>

                <section className="mission-section">
                    <h2>Our Mission</h2>
                    <div className="mission-content">
                        <div className="mission-text">
                            <p>
                                At KitchenSpace, we believe that cooking should be accessible, fun, and creative for everyone, regardless of their skill level or experience.
                            </p>
                            <p>
                                Our mission is to build a vibrant community of food enthusiasts who share recipes, tips, and culinary adventures, making the kitchen a space of joy and discovery.
                            </p>
                            <p>
                                We're committed to helping you find inspiration, learn new techniques, and create delicious meals that bring people together.
                            </p>
                        </div>
                        <div className="mission-image-container">
                            <img
                                src={people}
                                alt="People cooking together"
                                className="mission-image"
                            />
                        </div>
                    </div>
                </section>

                <section className="features-section">
                    <h2>Key Features</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Search className="icon" />
                            </div>
                            <h3>Smart Search</h3>
                            <p>
                                Find recipes by ingredients, name, or dietary preferences with our powerful search engine.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <ChefHat className="icon" />
                            </div>
                            <h3>Recipe Creation</h3>
                            <p>
                                Create, modify, and share your own recipes with our easy-to-use recipe builder.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Users className="icon" />
                            </div>
                            <h3>Community</h3>
                            <p>
                                Connect with other food enthusiasts, share tips, and get inspired by a community of home chefs.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Utensils className="icon" />
                            </div>
                            <h3>Personalization</h3>
                            <p>
                                Save your favorite recipes, create collections, and customize your cooking experience.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <h2>Join Our Community</h2>
                    <p className="cta-description">
                        Ready to start your culinary journey with KitchenSpace? Sign up today and become part of our growing community of food enthusiasts.
                    </p>
                    <div className="cta-buttons">
                        <Link to="/signup" className="button primary-button">
                            Sign Up
                        </Link>
                        <Link to="/recipes" className="button secondary-button">
                            Explore Recipes
                        </Link>
                    </div>
                </section>
            </div>
        </MainLayout>
    )
}
export default About;