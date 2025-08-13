import "../styles/imageCard.css";
import { Link } from "react-router-dom";



function ImageCard({image, imageId}) {
    return (
    <Link 
        to={`/play/${imageId}`} 
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