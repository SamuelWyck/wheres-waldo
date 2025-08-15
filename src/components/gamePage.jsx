import "../styles/gamePage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import logic from "../utils/gameLogic.js";
import apiManager from "../utils/apiManager.js";
import storageManager from "../utils/storageManager.js";



function GamePage() {
    const {imageId} = useParams();
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(function() {
        document.addEventListener(
            "click", logic.positionTargetBox
        );

        apiManager.startGame(imageId).then(function(res) {
            if (res.error || res.errors) {
                //navigate to error page
            }

            storageManager.storeGameId(res.gameId);
            setImageUrl(res.image);
        });

        return function() {
            document.removeEventListener(
                "click", logic.positionTargetBox
            );
        };
    }, [imageId]);


    if (!imageUrl) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <main className="game-page">
            <div className="game-image-wrapper">
                <div className="target-box hidden">
                    <div className="target-btns">
                        <button 
                            onClick={logic.makeGuess}
                        >Waldo</button>
                        <button 
                            onClick={logic.makeGuess}
                        >Wilma</button>
                        <button 
                            onClick={logic.makeGuess}
                        >Wizard</button>
                        <button 
                            onClick={logic.hideTargetBox}
                        >Cancel</button>
                    </div>
                </div>
                <img 
                    src={imageUrl} alt="" 
                    className="game-image" 
                />
            </div>
        </main>
    );
};



export default GamePage;