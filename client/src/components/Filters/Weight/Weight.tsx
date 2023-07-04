import style from "./Weight.module.css";
import weightIcon from "../../../assets/Icons/weight_icon.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeFilters, fetchAllDogs, selectFilters, sortFromHeavier, sortFromLighter, } from "../../../Redux/features/dogsSlice";
import { AppDispatch } from "../../../Redux/store";

function Weight() {

    const dispatch:AppDispatch = useDispatch();
    const filters = useSelector(selectFilters);
    const {weight} =  filters;
    const [sortHeaviest, setSortHeaviest] = useState(false);
    const [sortLightest, setSortLightest] = useState(false);

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const name = (event.target as HTMLButtonElement).name;
        
        switch (name) {
            case "sortHeavier":
                if (!weight.heavier) {
                    dispatch(sortFromHeavier());
                    setSortHeaviest(true);
                    setSortLightest(false);
                } else {
                    setSortHeaviest(false);
                }
                break;
            case "sortLighter":
                if(!weight.lighter) {
                    dispatch(sortFromLighter());
                    setSortLightest(true);
                    setSortHeaviest(false);
                } else {
                    setSortLightest(false)
                }
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if(sortHeaviest){
            dispatch(activeFilters({name: "weight", value: {heavier: true, lighter: false}}));
            dispatch(activeFilters({name: "breed", value: {atoZ: false, ztoA: false}}));
        } else if (sortLightest) {
            dispatch(activeFilters({name: "weight", value: {heavier: false, lighter: true}}));
            dispatch(activeFilters({name: "breed", value: {atoZ: false, ztoA: false}}));
        } else {
            dispatch(activeFilters({name: "weight", value: {heavier: false, lighter: false}}));
        }
    }, [sortHeaviest, sortLightest, dispatch])

    return (
        <>
            <div className={weight.heavier === true || weight.lighter === true ? `${style.Filter} ${style.Active}`: style.Filter}>
                <img src={weightIcon} alt="" />
                <h3>Weight</h3>
            </div>
            <ul className={style.Dropmenu}>
                <li>
                    <button className={weight.heavier === true ? `${style.ActiveButton}`: ""} name="sortHeavier" onClick={handleFilterClick}>Heaviest to Lightest</button>
                </li>

                <li>
                    <button className={weight.lighter === true ? `${style.ActiveButton}`: ""} name="sortLighter" onClick={handleFilterClick}>Lightest to Heaviest</button>
                </li>
            </ul>
        </>
    )
}

export default Weight