import { getDBdogs } from "../controllers/dogControllers"
import { averageHeightDB, averageHeightApi, averageImperial, averageWeightApi, averageWeightDB } from "./AverageIndex"
import axios from "axios"
import { URL } from "./constants"
import { ApiDog, Characteristics, Option } from "./InterfacesAndTypes"
import { Dog } from "../models/Dog"

export const allDogsCleanerDB = async (dogs:Dog[]) => {
    const cleanDog = dogs.map((dog) => {
        const { name, id, image, max_height, max_life_span, max_weight, min_height, min_life_span, temperaments, min_weight } = dog
        return {
            id,
            name,
            height: `${min_height} - ${max_height} cm`,
            weight: `${min_weight} - ${max_weight} kg`,
            life_span: `${min_life_span} - ${max_life_span} years`,
            averageWeight: `${averageWeightDB(min_weight, max_weight)} kg`,
            averageHeight: `${averageHeightDB(min_height, max_height)} cm`,
            image,
            temperaments: temperaments.map((temperament) => temperament.name)
        }
    })

    return cleanDog;

}

export const dogCleanerDB = async (dog: Dog) => {
    const { name, id, image, max_height, max_life_span, max_weight, min_height, min_life_span, temperaments, min_weight } = dog
    return {
        id,
        name,
        height: `${min_height} - ${max_height} cm`,
        weight: `${min_weight} - ${max_weight} kg`,
        life_span: `${min_life_span} - ${max_life_span} years`,
        averageWeight: `${averageWeightDB(min_weight, max_weight)} kg`,
        averageHeight: `${averageHeightDB(min_height, max_height)} cm`,
        image,
        temperaments: temperaments.map((temperament) => temperament.name)
    }
}

export const dogCleanerApi = async (dog: ApiDog) => {
    const { id, name, bred_for, breed_group, life_span, origin, image, temperament, height, weight } = dog;
    const temperaments = temperament ? temperament.split(", ") : [];

    const data: Characteristics = {
        heightImperial: height.imperial,
        heightMetric: height.metric.split(" - "),
        weightImperial: weight.imperial,
        weightMetric: weight.metric.split(" - ")

    }
    return {
        id,
        name,
        height: `${validate("height", data)} cm`,
        weight: `${validate("weight", data)} kg`,
        averageWeight: `${validate("averageWeight", data)} kg`,
        averageHeight: `${validate("averageHeight", data)} cm`,
        bred_for,
        breed_group,
        life_span,
        origin,
        image: image.url,
        temperaments
    };

}


export const allDogsCleanerApi = (data:ApiDog[]) => {

    return data.map((dog: ApiDog) => {
        const { id, name, bred_for, breed_group, life_span, origin, image, temperament, height, weight } = dog;

        const temperaments = temperament ? temperament.split(", ") : [];

        const data: Characteristics = {
            heightImperial: height.imperial,
            heightMetric: height.metric.split(" - "),
            weightImperial: weight.imperial,
            weightMetric: weight.metric.split(" - ")

        }
        return {
            id,
            name,
            height: `${validate("height", data)} cm`,
            weight: `${validate("weight", data)} kg`,
            averageWeight: `${validate("averageWeight", data)} kg`,
            averageHeight: `${validate("averageHeight", data)} cm`,
            bred_for,
            breed_group,
            life_span,
            origin,
            image: image,
            temperaments
        };
    })

}

const validate = (type: Option, data: Characteristics) => {
    const { heightImperial, heightMetric, weightImperial, weightMetric } = data
    switch (type) {
        case "averageWeight":
            if (weightMetric.length === 1 && weightMetric[0] === 'NaN') return averageImperial(weightImperial, "weight");
            if (weightMetric[0] === 'NaN') return Math.floor(Number(weightMetric[1]));
            if (weightMetric.length === 1) return Math.floor(Number(weightMetric[0]));
            return averageWeightApi(weightMetric.join(" - "));

        case "averageHeight":
            if (heightMetric.length === 1 && heightMetric[0] === 'NaN') return averageImperial(heightImperial, "height");
            if (heightMetric[0] === 'NaN') return Math.floor(Number(heightMetric[1]));
            if (heightMetric.length === 1) return Math.floor(Number(heightMetric[0]))
            return averageHeightApi(heightMetric.join(" - "))

        case "weight":
            if ((weightMetric[0]) === "NaN") return weightMetric[1]
            if (weightMetric.length === 1) return weightMetric[0]
            return weightMetric.join(" - ")
            break;

        case "height":
            if (heightMetric[0] === "NaN") return heightMetric[1]
            if (heightMetric.length === 1) return heightMetric[0]
            return heightMetric.join(" - ")
        default:
            break;
    }

}



