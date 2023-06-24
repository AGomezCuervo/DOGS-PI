import {Table, Model, Column,DataType, ForeignKey} from "sequelize-typescript";
import { Dog } from "./Dog";
import { Temperament } from "./Temperament";

@Table({
    timestamps: false,
    tableName: "dog_temperaments"
})

export class Dog_Temperament extends Model {
    @ForeignKey(() => Dog)
    @Column({type:DataType.UUID})
    dogId!: string;

     @ForeignKey(() => Temperament)
     @Column({type:DataType.UUID})
     temperamentId!: string
}
