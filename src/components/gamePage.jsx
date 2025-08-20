import "../styles/gamePage.css";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import zoomImg from "../assets/magnify.svg";
import helpImg from "../assets/help.svg";
import logic from "../utils/gameLogic.js";
import apiManager from "../utils/apiManager.js";
import storageManager from "../utils/storageManager.js";
import CharacterMarker from "./characterMarker.jsx";
import TargetsCard from "./targetsCard.jsx";



function GamePage() {
    const navigate = useNavigate();
    const errorsRef = useOutletContext();
    const {imageId} = useParams();
    const [imageUrl, setImageUrl] = useState(null);
    const [charMarkers, setCharMarkers] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(function() {
        errorsRef.current = null;
        document.addEventListener(
            "click", logic.positionTargetBox
        );
        window.addEventListener(
            "resize", logic.handleResize
        );

        apiManager.startGame(imageId).then(function(res) {
            if (res.errors) {
                errorsRef.current = res.errors;
                navigate("/error");
            }

            storageManager.storeGameId(res.gameId);
            setImageUrl(res.image);
        });

        return function() {
            document.removeEventListener(
                "click", logic.positionTargetBox
            );
            window.removeEventListener(
                "resize", logic.handleResize
            );
        };
    }, [imageId, errorsRef, navigate]);


    async function handleGuess(event) {
        const [res, coords] = await logic.makeGuess(event);
        if (res.errors) {
            errorsRef.current = res.errors;
            navigate("/error");
        }
        const found = 1;

        if (res.done) {
            logic.showLeaderboardForm()
        }
        if (res.found === found) {
            const [imgWidth, imgHeight] = logic.getGameImgSize();
            charMarkers.push(
                <CharacterMarker 
                    xCoord={coords.x} 
                    yCoord={coords.y}
                    imgWidth={imgWidth}
                    imgHeight={imgHeight}
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

        navigate("/leaderboard", {replace: true});
    };



    if (!imageUrl) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <main className="game-page">
            <div className="game-image-wrapper">
                <button
                    className="zoom-btn"
                    onClick={logic.handleZoom}
                ><img src={zoomImg} alt="zoom" /></button>
                <button 
                    className="help-btn"
                    onClick={logic.handleHelp}
                ><img src={helpImg} alt="help" /></button>
                <div className="info-modal hidden">
                    <TargetsCard />
                </div>
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