import {Table, Model, Column,DataType, BelongsToMany} from "sequelize-typescript";
import { Dog } from "./Dog";
import { Dog_Temperament } from "./Dog_Temperament";
import { Sequelize } from "sequelize";
import { getTemperaments } from "../controllers/temperamentControllers";



@Table({
    tableName: "temperaments",
    timestamps: false
})

export class Temperament extends Model {
    @Column({
        type:DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4
    })
    id!: string

    @Column({
        type:DataType.STRING,
        allowNull: false,
        unique:true
    })
    name!: string

    @BelongsToMany(() => Dog, () => Dog_Temperament)
    dogs!: Array<Dog>

    static async initializeTemperaments(sequelize: Sequelize): Promise<void> {
        const temperaments = await getTemperaments();
        for(const temperament of temperaments){
            await Temperament.findOrCreate({
                where: {
                    name: temperament
                },
                defaults: {
                    name: temperament
                }
            })
        }
    }
}