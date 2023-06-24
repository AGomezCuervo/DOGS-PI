import style from "./Temperament.module.css"
import temperamentIcon from "../../../assets/Icons/temperament_icon.png";

function Temperament() {
    return (
        <>
            <div className={style.Filter}>
                <img src={temperamentIcon} alt="" />
                <h3>Temperament</h3>
            </div>
            <ul className={style.Dropmenu}>
                <li>Heaviest</li>
                <li>Lightest</li>
            </ul>
        </>
    )
}

export default Temperament;