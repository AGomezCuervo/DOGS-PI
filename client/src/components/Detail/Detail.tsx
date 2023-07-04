import { useEffect } from "react";
import style from "./Detail.module.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDog, fetchDogById, selectDog } from "../../Redux/features/dogsSlice";
import { AppDispatch } from "../../Redux/store";
import lifeSpanIcon from "../../assets/Icons/lifeSpan_icon.png";
import heightIcon from "../../assets/Icons/height_icon.png";
import weightIcon from "../../assets/Icons/weight_icon.png"

const Detail = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const dog = useSelector(selectDog);
    const dispatch: AppDispatch = useDispatch();
    const {name, height, weight, life_span, temperaments, image} = dog ?? {};

    const handleClick = () =>{
        navigate(-1)
        dispatch(clearDog())
    }

    useEffect(() => {
        dispatch(fetchDogById(id));
    }, [dispatch, id])

    return (
        <div className={style.BGContainer}>
            <div className={style.Wave}>
                <svg viewBox="0 100 1440 320">
                    <path fill="#197667" 
                        d="M0,288L80,288C160,288,320,288,480,266.7C640,245,800,203,960,202.7C1120,203,1280,
                        245,1360,266.7L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
                    </path>
                </svg>
            </div>
            <div className={style.Container}>
                <div className={style.ImageContainer}>
                    <img src={image} alt="" />
                </div> 
                <h2>{name}</h2>
                <p>{temperaments?.join(", ")}</p>
                <h3>Extras:</h3>
                <div className={style.ExtrasContainer}>
                    <div className={style.Extra}>
                        <div className={style.ImageOption}>
                            <img src={lifeSpanIcon} alt="" />
                            Life span
                        </div>
                        <div>
                            <p>{life_span}</p>
                        </div>
                    </div>
                    <hr />
                    <div className={`${style.Extra} ${style.HeightContainer}`}>
                        <div className={style.ImageOption}>
                            <img src={heightIcon} alt="" />
                            Height
                        </div>
                        <div>
                            <p>{height}</p>
                        </div>
                    </div>
                    <hr />
                    <div className={style.Extra}>
                        <div className={style.ImageOption}>
                            <img src={weightIcon} alt="" />
                            Weight
                        </div>
                        <div>
                            <p>{weight}</p>
                        </div>
                    </div>

                    
                        <button onClick={handleClick}>Go Back</button>
                    
                </div>
            </div>
        </div>
    )

}

export default Detail;