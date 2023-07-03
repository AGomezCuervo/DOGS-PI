import { Dog } from "../models/Dog";
import { Temperament } from "../models/Temperament";
import axios from "axios";
import { allDogsCleanerApi, allDogsCleanerDB, dogCleanerApi, dogCleanerDB } from "../utils";
import { URL } from "../utils/constants";
import { ApiDog } from "../utils/InterfacesAndTypes";
import { Op } from "sequelize";



interface Body {
    name: string,
    min_height: string,
    max_height: string,
    min_weight: string,
    max_weight: string,
    min_life_span: string,
    max_life_span: string,
    image: string,
    temperaments: Array<{name: string}>
}

export const addDogs = async (body: Body) => {
    const newDog =  await Dog.create({...body});
    const temperamentsNames = body.temperaments
    const temperaments = await Temperament.findAll({
        where: {
            name: temperamentsNames
        }
    })

    await newDog.$set('temperaments', temperaments)

}

export const getDBdogs = async () => {
    const dogs: Array<Dog> = await Dog.findAll({ 
        include: {
            model:Temperament,
            attributes: ['name'],
            through:{
                attributes:[]
                }
        }
        });
    return dogs
}

export const getAllDogs = async () => {
    try {
        const api = (await axios.get(URL)).data;
        const db = await getDBdogs()
        const apiDogs = allDogsCleanerApi(api);
        const dogsDB = await allDogsCleanerDB(db);
        const newArray = [...dogsDB, ...apiDogs]
        return newArray

    } catch (error) {
        throw error
    }
}

export const DogById = async (params:string) => {
    const id = Number(params);
    if(isNaN(id)){
        try {
            const dog = await Dog.findByPk(params, { 
                include: {
                    model:Temperament,
                    attributes: ['name'],
                    through:{
                        attributes:[]
                        }
                }
                });
            if (dog) return dogCleanerDB(dog)
            throw new Error("este perro no existe")
            
        } catch (error) {
            throw new Error("este perro no existe")
        }
    }

    try {
        const apiDogs = (await axios.get(URL)).data
        const dog = apiDogs.find((element:ApiDog) => element.id === id )
        return dogCleanerApi(dog)
        
    } catch (error) {
        throw new Error("este perro no existe")
    }


}

export const getApiDogsByName = async (name: string) => {
        const dogs = (await axios.get(URL)).data
        const filter = dogs.filter((element:ApiDog) => element.name.toLowerCase().includes(name))
        const cleaner = allDogsCleanerApi(filter)
        return cleaner
    
}

export const getDBDogByName = async (name:string) => {
    const dogs = await Dog.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        },
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })

    const cleaner = allDogsCleanerDB(dogs)
    return cleaner
}