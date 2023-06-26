import style from "./Breed.module.css";
import breedIcon from "../../../assets/Icons/breed_icon.png";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDogs, selectFilters, sortFromAtoZ, sortFromZtoA } from "../../../Redux/features/dogsSlice";
import { AppDispatch } from "../../../Redux/store";

function Breed() {

    const dispatch:AppDispatch = useDispatch();
    const filters = useSelector(selectFilters);
    const {breed} =  filters;

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const name = (event.target as HTMLButtonElement).name;
        
        switch (name) {
            case "sortFromA":
                if (!breed.atoZ) {
                    dispatch(sortFromAtoZ());
                } else dispatch(fetchAllDogs())
                break;
            case "sortFromZ":
                if(!breed.ztoA) {
                    dispatch(sortFromZtoA())
                } else dispatch(fetchAllDogs())
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className={style.Filter}>
                <img src={breedIcon} alt="" />
                <h3>Breed</h3>
            </div>
            <ul className={style.Dropmenu}>
                <li>
                    <button name="sortFromA" onClick={handleFilterClick}>A-Z</button>
                </li>

                <li>
                    <button name="sortFromZ" onClick={handleFilterClick}>Z-A</button>
                </li>
            </ul>
        </>
    );
}

export default Breed;
