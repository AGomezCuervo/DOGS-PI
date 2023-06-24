import style from "./Breed.module.css";
import breedIcon from "../../../assets/Icons/breed_icon.png";

function Breed() {
    return (
        <>
            <div className={style.Filter}>
                <img src={breedIcon} alt="" />
                <h3>Breed</h3>
            </div>
            <ul className={style.Dropmenu}>
                <li>Heaviest</li>
                <li>Lightest</li>
            </ul>
        </>
    );
}

export default Breed;
