import "../styles/characterMarker.css";
import checkImg from "../assets/check-bold.svg";



function CharacterMarker({xCoord, yCoord}) {
    return (
        <div 
            className="character-marker"
            style={{top: `${yCoord}px`, left: `${xCoord}px`}}
        >
            <img src={checkImg} alt="check mark" />
        </div>
    );
};



export default CharacterMarker;