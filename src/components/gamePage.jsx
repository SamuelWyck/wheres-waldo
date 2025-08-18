import "../styles/gamePage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import logic from "../utils/gameLogic.js";
import apiManager from "../utils/apiManager.js";
import storageManager from "../utils/storageManager.js";
import CharacterMarker from "./characterMarker.jsx";



function GamePage() {
    const navigate = useNavigate();
    const {imageId} = useParams();
    const [imageUrl, setImageUrl] = useState(null);
    const [charMarkers, setCharMarkers] = useState([]);
    const [errors, setErrors] = useState(null);


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


    async function handleGuess(event) {
        const [res, coords] = await logic.makeGuess(event);
        if (res.errors || res.error) {
            //nav to error page
        }
        const found = 1;

        if (res.done) {
            logic.showLeaderboardForm()
        }
        if (res.found === found) {
            charMarkers.push(
                <CharacterMarker 
                    xCoord={coords.x} yCoord={coords.y}
                    key={coords.x} 
                />
            );
            setCharMarkers([...charMarkers]);
        }
    };


    function getErrorCards(errors) {
        const errorCards = [];
        for (let error of errors) {
            errorCards.push(
                <li 
                    key={error.msg} 
                    className="error"
                >{error.msg}</li>
            );
        }
        return errorCards;
    };


    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        let reqBody = {}
        for (let entry of formData.entries()) {
            const [key, value] = entry;
            reqBody[key] = value;
        }
        reqBody = JSON.stringify(reqBody);

        const res = await apiManager.leaderboardPost(reqBody);
        if (res.errors) {
            setErrors(getErrorCards(res.errors));
            return;
        }

        navigate("/");
    };



    if (!imageUrl) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <main className="game-page">
            <div className="game-image-wrapper">
                <div className="target-box hidden">
                    <div className="target-btns">
                        <button 
                            onClick={handleGuess}
                        >Waldo</button>
                        <button 
                            onClick={handleGuess}
                        >Wilma</button>
                        <button 
                            onClick={handleGuess}
                        >Wizard</button>
                        <button 
                            onClick={logic.hideTargetBox}
                        >Cancel</button>
                    </div>
                </div>
                <div className="form-modal hidden">
                    <form onSubmit={handleSubmit}>
                        <p>You did it!</p>
                        {!errors ||
                        <ul className="errors">
                            {errors}
                        </ul>
                        }
                        <div>
                            <label htmlFor="name">Enter your name</label>
                            <input type="text" id="name" name="name" maxLength={100} />
                        </div>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
                {charMarkers}
                <img 
                    src={imageUrl} alt="" 
                    className="game-image" 
                />
            </div>
        </main>
    );
};



export default GamePage;