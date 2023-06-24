
import style from "./SearchBar.module.css";
import loupeIcon from "../../assets/Icons/loupe_icon.png"

function SearchBar () {
    return(
        <>
        <div className={style.Container}>
            <div className={style.InputContainer}>
                <input 
                type="text"
                placeholder="Search by breed" 
                />
            </div>
            <button className={style.SearchButton}>
                <img src={loupeIcon} alt="" />
            </button>
        </div>
        </>
    )
}

export default SearchBar