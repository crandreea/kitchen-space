import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

import chef from '../data/chef.jpg';
import salt from '../data/salt.jpg';
import knives from '../data/knivessharpener.jpg';
import scraper from '../data/benchscraper.jpg';

import { FaArrowDown } from "react-icons/fa";

import MainLayout from '../layout/MainLayout';

function scrollToNextSection() {
    // window.scrollBy({
    //     top: window.innerHeight, // Scrolls down by 80% of screen height
    //     behavior: "smooth",
    // });
    const target = document.querySelector(".child-container2");
    if (target) {
        target.scrollIntoView({ behavior: "smooth" });
    }
}

const Home = () =>{
    const [showFirst, setShowFirst] = useState(true);
    const [showBoth, setShowBoth] = useState(false);

    useEffect(() => {
        const firstTimeout = setTimeout(() => {
            setShowFirst(false);
        }, 3000);

        const secondTimeout = setTimeout(() => {
            setShowFirst(true);
            setShowBoth(true);
        }, 6000);

        return () => {
            clearTimeout(firstTimeout);
            clearTimeout(secondTimeout);
        };
    }, []);

    return (
        <MainLayout>
            <div className="home">
                <div className="headline-container">
                <span className={`headline-first-text ${showFirst || showBoth ? "visible" : "hidden"}`}>
                    Not a Chef? Not a Problem.
                </span>
                    <span className={`headline-second-text ${!showFirst || showBoth ? "visible" : "hidden"}`}>
                    Discover Your Inner Chef!
                </span>
                </div>

                <div className={"information-container"}>
                    <div className={"description-container"}>
                        <div className={"description-left-side"}>
                            <span className={"description-text"}>
                                <a>
                                    <b>Cooking doesn’t have to be complicated.<br/></b>
                                </a>
                                <a>
                                    Whether you're a beginner or a seasoned home cook, our easy-to-follow recipes will guide you every step of the way.
                                    From quick weekday meals to gourmet delights, we bring you a variety of recipes that fit your taste and lifestyle.
                                    Fresh ingredients, simple steps, and amazing flavors – because great cooking starts with great recipes.
                                    Join our community, explore new dishes, and turn every meal into a masterpiece!
                                </a>
                            </span>
                            <div className="scroll-arrow" onClick={scrollToNextSection}>
                                <FaArrowDown className="arrow-icon"/>
                            </div>
                        </div>

                        <div className={"description-right-side"}>
                            <img className={"description-img"} src={chef} alt={"Chef image"}/>
                        </div>
                    </div>
                    <div className={"child-container2"}>
                        <div className={"tips-container"}>
                            <div className={"tips-title-container"}>
                                <span className={"tips-title"}>Tehniques. Tips & Tricks.</span>
                            </div>
                            <div className={"tips-description-container"}>
                            <span className={"tips-description"}>
                                Master the art of cooking with expert techniques, clever tips, and time-saving tricks that will elevate your skills in the kitchen.
                                From knife-handling secrets to flavor-enhancing strategies, these insights will help you cook smarter, faster, and more efficiently.
                                Whether you're a beginner or a seasoned chef, these practical tips will transform the way you prepare and enjoy your meals.
                            </span>
                            </div>
                            <div className={"tips-content-container"}>
                                <div className={"tips-content1"}>
                                    <div className={"tips-content-image1"}>
                                        <img className={"image2"} src={scraper} alt={"Bench scraper image"}/>
                                    </div>
                                    <span className={"tips-content-title1"}>
                                    Use a Garbage Bowl and a Bench Scraper
                                </span>
                                    <span className={"tips-content-content1"}>
                                    Not having to walk back and forth to the garbage every few minutes can take a lot of drudgery our of your prep,
                                    and nothing's better than a bench scraper for moving large quantities of fiddly ingredients or scraps from point A to point B.
                                </span>
                                </div>
                                <div className={"tips-content2"}>
                                    <div className={"tips-content-image2"}>
                                        <img className={"image2"} src={knives} alt={"Knives Sharpener image"}/>
                                    </div>
                                    <span className={"tips-content-title2"}>
                                    Keep Your Knives Sharp
                                </span>
                                    <span className={"tips-content-content2"}>
                                    Having sharp knives is not only safer (your knife is less likely to slip off a vegetable and into your finger),
                                    but it just makes cooking so much more pleasurable when you can fly through your slicing, dicing, and chopping tasks.
                                </span>
                                </div>
                                <div className={"tips-content3"}>
                                    <div className={"tips-content-image3"}>
                                        <img className={"image2"} src={salt} alt={"Salt image"}/>
                                    </div>
                                    <span className={"tips-content-title3"}>
                                    Don't Be Afraid of Salt, but Don't Forget the Acid
                                </span>
                                    <span className={"tips-content-content3"}>
                                    We all know that restaurant food tastes great because chefs season things with salt at every stage of the process. You should be doing this at home too!
                                    But here's another secret: balancing acid is just as important as getting salt levels right when it comes to making things delicious.
                                </span>
                                </div>
                            </div>
                            <div className="scroll-arrow" onClick={scrollToNextSection}>
                                <FaArrowDown className="arrow-icon"/>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </MainLayout>
    )
}

export default Home;