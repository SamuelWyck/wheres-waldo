import "../styles/gamePage.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import logic from "../utils/gameLogic.js";



function GamePage() {
    const {imageName} = useParams();

    useEffect(function() {
        document.addEventListener(
            "click", logic.positionTargetBox
        );

        return function() {
            document.removeEventListener(
                "click", logic.positionTargetBox
            );
        };
    }, []);


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
                <div className="game-image"></div>
                {/* <img 
                    src={gameImg} alt="" 
                    className="game-image" 
                /> */}
            </div>
        </main>
    );
};



export default GamePage;