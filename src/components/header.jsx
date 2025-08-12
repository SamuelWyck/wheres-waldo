import "../styles/header.css";
import logoImg from "../assets/logo.png";
import {Link} from "react-router-dom";



function Header() {
    return (
        <header>
            <Link className="logo-link" to="/">
            <div className="banner">
                <div className="logo-wrapper">
                    <img 
                        src={logoImg} 
                        alt="waldo" 
                        className="logo" 
                    />
                </div>
                <p className="banner-title">
                    Where's Waldo
                </p>
            </div>
            </Link>
            <nav>
                <Link to="/leaderboard">Leaderboard</Link>
            </nav>
        </header>
    );
};



export default Header;