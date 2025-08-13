import "../styles/homePage.css";
import { useState } from "react";
import troyImg from "../assets/waldo-troy.jpg";
import silentImg from "../assets/waldo-silent-movie.jpg";
import thievesImg from "../assets/waldo-40-thieves.jpg";
import threeMsImg from "../assets/waldo-three-musketeers.jpg";
import giantsImg from "../assets/waldo-giants.jpg";
import movieSetImg from "../assets/waldo-movie-set.jpg";
import waldoImg from "../assets/waldo.jpg";
import wilmaImg from "../assets/wilma.jpg";
import wizardImg from "../assets/wizard.jpg";
import ImageCard from "./imageCard.jsx";



function HomePage() {
    const [imgCards, setImgCards] = useState(getImageCards([
        troyImg,
        silentImg,
        thievesImg,
        threeMsImg,
        giantsImg,
        movieSetImg
    ]));


    function getImageCards(images) {
        const imageCards = [];
        for (let image of images) {
            imageCards.push(<ImageCard image={image}/>);
        }
        return imageCards;
    };


    return (
    <main className="homepage">
        <p className="rules">
            Try to find Waldo, Wilma, 
            and the Wizard as fast as you can!
        </p>
        <div className="targets">
            <div className="target-img-card">
                <img src={waldoImg} alt="waldo" />
                <p className="target-name">Waldo</p>
            </div>
            <div className="target-img-card">
                <img src={wilmaImg} alt="wilma" />
                <p className="target-name">Wilma</p>
            </div>
            <div className="target-img-card">
                <img src={wizardImg} alt="wizard" />
                <p className="target-name">Wizard</p>
            </div>
        </div>
        <p className="settings-title">Choose a Setting</p>
        <div className="image-choices">
            {imgCards}
        </div>
    </main>
    );
};



export default HomePage;