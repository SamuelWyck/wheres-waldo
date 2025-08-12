import "../styles/imageCard.css";
import { Link } from "react-router-dom";
import parseImgName from "../utils/parseImgName.js";



function ImageCard({image}) {
    
    const imageEndPoint = parseImgName(image);

    return (
    <Link 
        to={`/play/${imageEndPoint}`} 
        className="img-card-link"
    >
    <div className="image-card">
        <img 
            src={image} 
            alt="icon"
            className="image-card-img"
        />
    </div>
    </Link>
    );
};



export default ImageCard;