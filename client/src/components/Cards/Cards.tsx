import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { Dog, fetchAllDogs, selectAllDogs, selectCopyDogs, selectError, setCopyDog, putOriginalAsCopy } from "../../Redux/features/dogsSlice";
import { fetchAllTemperaments, selectAllTemperaments } from "../../Redux/features/temperamentsSlice";
import Pagination from "../Pagination/Pagination";
import { selectCurrentPage } from "../../utils/utilsSlice";
import NavBar from "../NavBar/NavBar";

const Cards: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const dogs = useSelector(selectAllDogs);
  const currentPage = useSelector(selectCurrentPage);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const error = useSelector(selectError);
  const copyDogs = useSelector(selectCopyDogs)

  const lastDogIndex = currentPage * dogsPerPage;
  const firstDogIndex = lastDogIndex - dogsPerPage;

  const currentDogs = dogs && dogs.length > 0 ? dogs.slice(firstDogIndex, lastDogIndex): [];



  useEffect(() => {
    dispatch(fetchAllDogs());
    dispatch(fetchAllTemperaments());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if(dogs.length > 0 && copyDogs.length === 0) dispatch(setCopyDog())
    }, 1000)
  },[dogs,copyDogs, dispatch]);

  return (
    <>
      <NavBar/>
      <div className={style.Container}>
        { 
        error ? <p className={style.Error}>{error}</p> :
        currentDogs.map((dog: Dog) => (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            height={dog.height}
            weight={dog.weight}
            life_span={dog.life_span}
            averageHeight={dog.averageHeight}
            breed_group= {dog.breed_group}
            averageWeight={dog.averageWeight}
            temperaments={dog.temperaments}
            image={dog.image}
          />
        ))}
      </div>

      <Pagination
        totalDogs = {dogs.length}
        dogsPerPage = {dogsPerPage}
        currentPage = {currentPage}
      />
        
    </>
  );
};

export default Cards;
