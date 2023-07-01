import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { Dog, fetchAllDogs, selectAllDogs } from "../../Redux/features/dogsSlice";
import { fetchAllTemperaments, selectAllTemperaments } from "../../Redux/features/temperamentsSlice";

const Cards: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const dogs = useSelector(selectAllDogs)

  useEffect(() => {
    dispatch(fetchAllDogs());
    dispatch(fetchAllTemperaments())
    
  }, [dispatch]);

  return (
    <>
      <div className={style.Container}>
        { dogs?.map((dog: Dog) => (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            height={dog.height}
            weight={dog.weight}
            life_span={dog.life_span}
            averageHeight={dog.averageHeight}
            averageWeight={dog.averageWeight}
            temperaments={dog.temperaments}
            image={dog.image}
          />
        ))}
      </div>
    </>
  );
};

export default Cards;
