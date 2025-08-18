import "../styles/targetsCard.css";
import waldoImg from "../assets/waldo.jpg";
import wilmaImg from "../assets/wilma.jpg";
import wizardImg from "../assets/wizard.jpg";



function TargetsCard() {
    return (
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
            <p className="target-name wizard-name">Wizard</p>
        </div>
    </div>
    );
};



export default TargetsCard;