import style from "./Breed.module.css";
import breedIcon from "../../../assets/Icons/breed_icon.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeFilters, fetchAllDogs, selectFilters, sortFromAtoZ, sortFromZtoA } from "../../../Redux/features/dogsSlice";
import { AppDispatch } from "../../../Redux/store";

function Breed() {

    const dispatch:AppDispatch = useDispatch();
    const filters = useSelector(selectFilters);
    const {breed} =  filters;
    const [sortAtoZ, setSortAtoZ] = useState(false);
    const [sortZtoA, setSortZtoA] = useState(false);

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const name = (event.target as HTMLButtonElement).name;
        
        switch (name) {
            case "sortFromA":
                if (!breed.atoZ) {
                    dispatch(sortFromAtoZ());
                    setSortAtoZ(true);
                    setSortZtoA(false);
                } else {
                    setSortAtoZ(false);
                }
                break;
            case "sortFromZ":
                if(!breed.ztoA) {
                    dispatch(sortFromZtoA());
                    setSortZtoA(true);
                    setSortAtoZ(false)
                } else {
                    setSortZtoA(false);
                }
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if(sortAtoZ){
            dispatch(activeFilters({name: "breed", value: {atoZ: true, ztoA: false}}));
            dispatch(activeFilters({name: "weight", value: {heavier: false, lighter: false}}));
        } else if (sortZtoA) {
            dispatch(activeFilters({name: "breed", value: {atoZ: false, ztoA: true}}));
            dispatch(activeFilters({name: "weight", value: {heavier: false, lighter: false}}));
        } else {
            dispatch(activeFilters({name: "breed", value: {atoZ: false, ztoA: false}}));
        }
    }, [sortAtoZ, sortZtoA, dispatch])

    return (
        <>
            <div className={breed.atoZ === true || breed.ztoA === true ? `${style.Filter} ${style.Active}`: style.Filter}>
                <img src={breedIcon} alt="" />
                <h3>Breed</h3>
            </div>
            <ul className={style.Dropmenu}>
                <li>
                    <button className={breed.atoZ === true? `${style.ActiveButton}`: ""} name="sortFromA" onClick={handleFilterClick}>A-Z</button>
                </li>

                <li>
                    <button className={breed.ztoA === true ? `${style.ActiveButton}`: ""} name="sortFromZ" onClick={handleFilterClick}>Z-A</button>
                </li>
            </ul>
        </>
    );
}

export default Breed;
