import { Link } from "react-router-dom";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDBDogs, fetchAllDogs, selectAllDogs } from "../../Redux/features/dogsSlice";
import { AppDispatch } from "../../Redux/store";

const NavBar: React.FC = () => {
    const dogs = useSelector(selectAllDogs);
    const dispatch:AppDispatch = useDispatch();
    const [pressed, setPressed] = useState(false) 

    const handleOnClick = () => {
        if (!pressed) {
            setPressed(true)
            dispatch(fetchAllDBDogs());
        } else {
            setPressed(false);
            dispatch(fetchAllDogs())
        }
    }

    return (
        <header>
            <Filters/>
            <SearchBar/>

            <div className={style.ButtonsContainer}>
                <button onClick={handleOnClick} className={pressed === true ? `${style.CreatedDogs} ${style.Pressed}`: style.CreatedDogs}> Your dogs</button>
                <Link to={"/form"}>
                    <button className={style.Button}>Add your Dog</button>
                </Link>

            </div>
            
        </header>
    );
}

export default NavBar;
