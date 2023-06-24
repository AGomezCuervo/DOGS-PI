import { RequestHandler } from "express";
import { Dog } from "../models/Dog";
import { Temperament } from "../models/Temperament";
import axios from "axios";
import { URL } from "../utils/constants";
import { getTemperaments } from "../controllers/temperamentControllers";



export const getAllTemperaments:RequestHandler = async (req, res) => {
    try {
        const temperaments = await getTemperaments()
        res.status(200).json(temperaments)
    } catch (error) {
        res.status(500).json(error)
    }
}