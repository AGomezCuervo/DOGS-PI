
import style from "./SearchBar.module.css";
import loupeIcon from "../../assets/Icons/loupe_icon.png"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDogByName } from "../../Redux/features/dogsSlice";
import { AppDispatch } from "../../Redux/store";

function SearchBar () {
    const [input, setInput] = useState("");
    const dispatch:AppDispatch = useDispatch()

    const handleOnChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInput(value);
    }

    const handleOnSearch = () => {
        dispatch(fetchDogByName(input))
        
    }

    const handleKeyDown = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") handleOnSearch()
    }
    return(
        <>
        <div className={style.Container}>
            <div className={style.InputContainer}>
                <input 
                type="text"
                placeholder="Search by breed" 
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                />
            </div>
            <button onClick={handleOnSearch} className={style.SearchButton}>
                <img src={loupeIcon} alt="" />
            </button>
        </div>
        </>
    )
}

export default SearchBar