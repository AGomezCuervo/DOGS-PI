import style from "./Temperament.module.css"
import temperamentIcon from "../../../assets/Icons/temperament_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteTemperaments, selectAllTemperaments, selectSomeTemperaments, setSelectTemperament } from "../../../Redux/features/temperamentsSlice";
import { AppDispatch } from "../../../Redux/store";
import { activeFilters, fetchAllDogs, selectFilters, sortByTemperament } from "../../../Redux/features/dogsSlice";
import { useEffect } from "react";

function Temperament() {
    const temperaments = useSelector(selectAllTemperaments);
    const dispatch:AppDispatch = useDispatch();
    const selectedTemperaments = useSelector(selectSomeTemperaments);
    const filters = useSelector(selectFilters)
    const {temperament} = filters

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

    const handleOnDelete = () => {
        dispatch(deleteTemperaments())
    }

    useEffect(() => {
        if(selectedTemperaments.length === 0) {
            dispatch(activeFilters({name: "temperament", value: false}))
        }
    })

    return (
        <>
            <div className={temperament ? `${style.Filter} ${style.Active}`: style.Filter}>
                <img src={temperamentIcon} alt="" />
                <h3>Temperament</h3>
            </div>
            <ul className={style.Dropmenu}>
                <div className={style.TemperamentsContainer}>
                    {
                        temperaments?.map((temperament, index) => (
                            <li key={index}>
                                <button className={selectedTemperaments.includes(temperament)? style.Pressed : ""} name={temperament} onClick={handleOnClick}>{temperament}</button>
                            </li>
                        ))
                    }
                        <button onClick={handleOnDelete} className={style.Delete}>Delete</button>
                </div>
                <button className={style.FilterButton} onClick={handleOnSubmit}>Filter</button>
            </ul>
        </>
    )
}

export default Temperament;