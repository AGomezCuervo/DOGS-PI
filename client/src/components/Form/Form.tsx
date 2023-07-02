import React, { useState } from "react"
import style from "./Form.module.css";
import axios from "axios";
import { CREATE_NEW_DOG } from "../../utils/constants";
import { validations } from "./validations";

export interface ErrorsInput {
    name: string;
    height: string;
    weight: string;
    life_span: string;
    image: string;
    temperaments: string[];
}

export interface Input {
    name: string;
    min_height: string;
    max_height: string;
    min_weight: string;
    max_weight: string;
    min_life_span: string;
    max_life_span: string;
    image: string;
    temperaments: string[];
}



const Form =  () => {

    const [input, setInput] = useState<Input>({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        min_life_span: "",
        max_life_span: "",
        image: "",
        temperaments: []
    })

    const [errors, setError] = useState<ErrorsInput>({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        image: "",
        temperaments: []
    })

    const handleOnChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput({...input, [name]:value});
        setError(validations( value, name,errors, input))
        
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        axios.post(CREATE_NEW_DOG, input)
        .then(response => {
            console.log(response);
            
        })
        .catch(error => {
            console.log(error);
            
        })
    }


    return (
        <>
            <form className={style.Container} onSubmit={handleOnSubmit}>
                <div className={style.Option} >
                    <label htmlFor="name">Breed</label>
                    <input id="name" name="name" type="text" onChange={handleOnChange} />
                </div>

                <div className={`${style.Option} ${style.DoubleOption}`}>
                    <div className={ style.Option }>
                        <label htmlFor="min_height">Min height</label>
                        <input id="min_height" name="min_height" type="number" onChange={handleOnChange} min="0" />
                    </div>

                    <div className={style.Option}>
                        <label htmlFor="max_height">Max height</label>
                        <input id="max_height" name="max_height" type="number" onChange={handleOnChange} min="0" />
                    </div>
                </div>


                <div className={`${style.Option} ${style.DoubleOption}`}>
                    <div className={style.Option}>
                        <label htmlFor="min_weight:">Min weight</label>
                        <input id="min_weight:" name="min_weight:" type="number" onChange={handleOnChange} min="0" />
                    </div>

                    <div className={style.Option}>
                        <label htmlFor="max_weight:">Max weight</label>
                        <input id="max_weight:" name="max_weight:" type="number" onChange={handleOnChange} min="0"/>
                    </div>
                </div>

                <div className={`${style.Option} ${style.DoubleOption}`}>
                    <div className={style.Option}>
                        <label htmlFor="min_life_span">min lifespan</label>
                        <input id="min_life_span" name="min_life_span" type="number" onChange={handleOnChange} min="0" />
                    </div>
                    <div className={style.Option}>
                        <label htmlFor="max_life_span">max lifespan</label>
                        <input id="max_life_span" name="max_life_span" type="number" onChange={handleOnChange} min="0" />
                    </div>
                </div>

                <div className={style.Option}>
                    <label htmlFor="image">Image</label>
                    <input id="image" name="image" type="text" onChange={handleOnChange} />
                </div>

                <button type="submit"> Create Dog</button>


            </form>
        </>
    )
} 

export default Form;