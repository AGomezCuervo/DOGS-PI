import axios from "axios"
import { URL } from "../utils/constants"
import { ApiDog } from "../utils/InterfacesAndTypes"
import { Temperament } from "../models/Temperament"

export const getTemperaments = async () => {
    try {
        const {data} = await axios.get(URL)
        const mapper = data.map((element:ApiDog) => element.temperament);
        const newArray = mapper.map((element:string) => element? element.split(", "): null);
        const filteredArray = newArray.filter((element:Array<string>) => element !== null);
        const flatArray = filteredArray.flat();
        const sortedSet = new Set([...flatArray].sort())
        const temperaments = [...sortedSet]
        
        return temperaments
    } catch (error) {
        throw error
    }
}

