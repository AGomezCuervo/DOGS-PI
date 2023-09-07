import { RequestHandler } from "express";
import { DogById, addDogs, getAllDogs, getApiDogsByName, getDBDogByName, getDBdogs } from "../controllers/dogControllers";
import { allDogsCleanerDB } from "../utils";

export const DogsDB: RequestHandler = async (req,res) => {
    try {
        const dogs = await allDogsCleanerDB(await getDBdogs("DogsDB"))
        return res.status(200).json(dogs)
    } catch (error) {
        return res.status(500).json({error: "You don't have any dog"})
    }
}

export const addDBDogs: RequestHandler = async (req,res) => {
    try {
        await addDogs(req.body)   
        res.status(200).json({message: "Dog created successfully"})
    } catch (error) {
        res.status(400).json({message: "This Dogs already exists"})
    }
}

export const getDogs: RequestHandler = async (req,res) => {
    const {name} = req.query;
    if (name && typeof name === "string") {
        console.log(name)
        const toLowerCase = name.toLowerCase();
        const apiDogs = await getApiDogsByName(toLowerCase);
        const DbDogs = await getDBDogByName(toLowerCase);
        const newArray = [...DbDogs, ...apiDogs]
        return newArray && newArray.length > 0 ? res.status(200).json(newArray)
        : res.status(400).json({error: `Cannot find dogs with this name: ${name}`})
    }
    try {
        const dogs = await getAllDogs();
        return res.status(200).send(dogs)
        
    } catch (error) {
        return res.status(500).json({error: "Something went wrong"})
    }
}

export const getDogById: RequestHandler = async (req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        const dog =  await DogById(id);
        return res.status(200).json(dog)
    } catch (error) {
        return res.status(400).json({error: `Cannot find the id: ${id}`})
    }
}
