import { RequestHandler } from "express";
import { Dog } from "../models/Dog";
import { Temperament } from "../models/Temperament";
import axios from "axios";
import { DogById, addDogs, getAllDogs, getApiDogsByName, getDBDogByName, getDBdogs } from "../controllers/dogControllers";
import { URL } from "../utils/constants";
import { allDogsCleanerDB } from "../utils";

export const DogsDB: RequestHandler = async (req,res) => {
    try {
        const dogs = await allDogsCleanerDB(await getDBdogs())
        return res.status(200).json(dogs)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const addDBDogs: RequestHandler = async (req,res) => {
    try {

        await addDogs(req.body)   
        res.status(200).send("Perro creado exitosamente")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getDogs: RequestHandler = async (req,res) => {
    const {name} = req.query;
    if (name && typeof name === "string") {
        const toLowerCase = name.toLowerCase();
        const apiDogs = await getApiDogsByName(toLowerCase);
        const DbDogs = await getDBDogByName(toLowerCase);
        const newArray = [...DbDogs, ...apiDogs]
        return newArray && newArray.length > 0 ? res.status(200).json(newArray)
        : res.status(400).json({error: "No results found"})
    }
    try {
        const dogs = await getAllDogs();
        return res.status(200).send(dogs)
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getDogById: RequestHandler = async (req, res) => {
    const {id} = req.params
    try {
        const dog =  await DogById(id);
        return res.status(200).json(dog)
    } catch (error) {
        return res.status(400).json(error)
    }
}