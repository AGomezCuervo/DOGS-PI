import { Sequelize } from "sequelize-typescript";
import { Dog } from "./models/Dog";
import { Temperament } from "./models/Temperament";
import { Dog_Temperament } from "./models/Dog_Temperament";
import * as dotenv from "dotenv"
dotenv.config()


const {DB_USERNAME, DB_PASSWORD, DB_PORT, DB_HOST, DB_DATABASE }= process.env;


const sequelize = new Sequelize({
    dialect: "postgres",
    database: DB_DATABASE,
    host: DB_HOST,
  port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    models: [ Dog,
        Temperament,
        Dog_Temperament
    ],
    logging: false,
    native: false
})

export default sequelize;
