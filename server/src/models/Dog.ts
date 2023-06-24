import {Table, Model, Column,DataType, BelongsToMany} from "sequelize-typescript";
import { Temperament } from "./Temperament";
import { Dog_Temperament } from "./Dog_Temperament";



@Table({
    timestamps: false,
    tableName: "dogs"
})

export class Dog extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4
    })
    id!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    min_height!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    max_height!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    min_weight!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    max_weight!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    min_life_span!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    max_life_span!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    image!: string
    
    @BelongsToMany(() => Temperament, () => Dog_Temperament)
    temperaments!: Array<Temperament>

}