import axios from "axios"
import React, { useEffect, useState } from "react"
import style from "./Card.module.css"
import menuIcon from "../../assets/Icons/menu_icon.png"
import { Link } from "react-router-dom";
import { Dog } from "../../Redux/features/dogsSlice";
const Card: React.FC<Dog> =  (props) => {
  const {name, image, temperaments, weight, id} = props
  

    return (

        <Link to={`/detail/${id}`} className={style.Link}>
          <div className={style.Container}>
            <div className={style.ImageContainer}>
              <img src={image} alt="" />
              <div className={style.WeightContainer}>{weight}</div>
            </div>

            <h2>{name}</h2>
            <p>{temperaments.join(", ")}</p>

            <div className={style.MenuContainer}>
              <img src={menuIcon} alt="" />
              DETAIL
            </div>
          </div>
        </Link>
      );
}

export default Card