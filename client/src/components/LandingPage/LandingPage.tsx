import style from "./LandingPage.module.css";
import dogImage from "../../assets/Icons/landingPage.jpg"
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <>
        <div className={style.BGContainer}>
            <div className={style.Wave}>
                <svg viewBox="0 100 1440 320">
                    <path fill="#197667" 
                        d="M0,288L80,288C160,288,320,288,480,266.7C640,245,800,203,960,202.7C1120,203,1280,
                        245,1360,266.7L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
                    </path>
                </svg>
            </div>
            <div className={style.Card}>
                <div className={style.ImageContainer}>
                    <img src={dogImage} alt="" />
                </div>
                <div className={style.SideContainer}>
                    <h1>Wiki Dogs</h1>
                    <h2>Want to know more about dogs?</h2>
                    <Link to={"/home"}>
                        <button>Discover</button>
                    </Link>
                    
                </div>

            </div>
        </div>
        </>
    )
}

export default LandingPage;