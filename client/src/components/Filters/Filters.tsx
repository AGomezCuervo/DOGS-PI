import style from "./Filters.module.css";
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
