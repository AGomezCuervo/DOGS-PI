import style from "./Filters.module.css";
import weightIcon from "../../assets/Icons/weight_icon.png"
import breedIcon from "../../assets/Icons/breed_icon.png"
import temperamenttIcon from "../../assets/Icons/temperament_icon.png"
import Temperament from "./Temperament/Temperament";
import Breed from "./Breed/Breed";
import Weight from "./Weight/Weight";

function Filters () {
    return (
        <>
        <div className={style.Container}>
            <ul className={style.Filters}>
                <li>
                    <Weight/>
                </li>

                <li>
                    <Breed/>
                </li>

                <li>
                    <Temperament/>
                </li>
            </ul> 
        </div>
        </>       
    )
}


export default Filters;