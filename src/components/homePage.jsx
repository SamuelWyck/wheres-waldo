import "../styles/homePage.css";
import { useState, useEffect } from "react";
import apiManager from "../utils/apiManager.js";
import TargetsCard from "./targetsCard.jsx";
import ImageCard from "./imageCard.jsx";



function HomePage() {
    const [imgCards, setImgCards] = useState(null);

    useEffect(function() {
        apiManager.getIcons().then(function(res) {
            if (res.error || res.errors || !res.icons) {
                //navigate to error page
            }
            setImgCards(getImageCards(res.icons));
        });
    }, []);


    function getImageCards(images) {
        const imageCards = [];
        for (let image of images) {
            imageCards.push(
                <ImageCard 
                    image={image.iconUrl}
                    imageId={image.imageId}
                    key={image.imageId}
                />
            );
        }
        return imageCards;
    };


    if (!imgCards) {
        return <p className="loading">Loading...</p>;
    }

    return (
    <main className="homepage">
        <p className="rules">
            Try to find Waldo, Wilma, 
            and the Wizard as fast as you can!
            Correct guesses will be marked with a checkmark.
        </p>
        <TargetsCard />
        <p className="settings-title">Choose a Setting</p>
        <div className="image-choices">
            {imgCards}
        </div>
    </main>
    );
};



export default HomePage;