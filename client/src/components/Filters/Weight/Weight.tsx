import style from "./Weight.module.css";
import weightIcon from "../../../assets/Icons/weight_icon.png";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDogs, selectFilters, sortFromHeavier, sortFromLighter, } from "../../../Redux/features/dogsSlice";
import { AppDispatch } from "../../../Redux/store";

function Weight() {

    const dispatch:AppDispatch = useDispatch();
    const filters = useSelector(selectFilters);
    const {weight} =  filters;

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const name = (event.target as HTMLButtonElement).name;
        
        switch (name) {
            case "sortHeavier":
                if (!weight.heavier) {
                    dispatch(sortFromHeavier());
                } else dispatch(fetchAllDogs())
                break;
            case "sortLighter":
                if(!weight.lighter) {
                    dispatch(sortFromLighter())
                } else dispatch(fetchAllDogs())
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className={style.Filter}>
                <img src={weightIcon} alt="" />
                <h3>Weight</h3>
            </div>
            <ul className={style.Dropmenu}>
                <li>
                    <button name="sortHeavier" onClick={handleFilterClick}>Heaviest</button>
                </li>

                <li>
                    <button name="sortLighter" onClick={handleFilterClick}>Lightest</button>
                </li>
            </ul>
        </>
    )
}

export default Weight