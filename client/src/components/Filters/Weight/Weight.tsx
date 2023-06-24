import style from "./Weight.module.css";
import weightIcon from "../../../assets/Icons/weight_icon.png";

function Weight() {
    return (
        <>
            <div className={style.Filter}>
                <img src={weightIcon} alt="" />
                <h3>Weight</h3>
            </div>
            <ul className={style.Dropmenu}>
                <li>Heaviest</li>
                <li>Lightest</li>
            </ul>
        </>
    )
}

export default Weight