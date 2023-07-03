import style from "./Temperament.module.css"
import temperamentIcon from "../../../assets/Icons/temperament_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTemperaments, selectSomeTemperaments, setSelectTemperament } from "../../../Redux/features/temperamentsSlice";
import { AppDispatch } from "../../../Redux/store";
import { fetchAllDogs, sortByTemperament } from "../../../Redux/features/dogsSlice";

function Temperament() {
    const temperaments = useSelector(selectAllTemperaments);
    const dispatch:AppDispatch = useDispatch();
    const selectedTemperaments = useSelector(selectSomeTemperaments);

    const handleOnClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const name = (event.target as HTMLButtonElement).name;

        if(!selectedTemperaments.includes(name)){
            dispatch(setSelectTemperament([...selectedTemperaments, name]));
            
        
    } else dispatch(setSelectTemperament(selectedTemperaments.filter((temperament) => temperament !== name)));
    }

    const handleOnSubmit = () => {
        if (selectedTemperaments.length > 0) {
            dispatch(sortByTemperament(selectedTemperaments))
        } else dispatch(fetchAllDogs())
        
    }

    return (
        <>
            <div className={style.Filter}>
                <img src={temperamentIcon} alt="" />
                <h3>Temperament</h3>
            </div>
            <ul className={style.Dropmenu}>
                <div className={style.TemperamentsContainer}>
                    {
                        temperaments?.map((temperament, index) => (
                            <li key={index}>
                                <button name={temperament} onClick={handleOnClick}>{temperament}</button>
                            </li>
                        ))
                    }
                </div>
                <button onClick={handleOnSubmit}>Filter</button>
            </ul>
        </>
    )
}

export default Temperament;