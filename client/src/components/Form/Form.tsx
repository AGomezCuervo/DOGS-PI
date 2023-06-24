import { useState } from "react"
import style from "./Form.module.css"


const Form =  () => {

    const [input, setInput] = useState({
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


    return (
        <>
            <form className={style.Container}>
                <div>
                    <label htmlFor="breed"></label>
                    <input id="breed" name="breed" type="text" />
                </div>

                <div>
                    <label htmlFor="min_height"></label>
                    <input id="min_height" name="min_height" type="text" />
                </div>

                <div>
                    <label htmlFor="max_height"></label>
                    <input id="max_height" name="max_height" type="text" />
                </div>

                <div>
                    <label htmlFor="min_weight:"></label>
                    <input id="min_weight:" name="min_weight:" type="text" />
                </div>

                <div>
                    <label htmlFor="max_weight:"></label>
                    <input id="max_weight:" name="max_weight:" type="text" />
                </div>
                <div>
                    <label htmlFor="min_life_span"></label>
                    <input id="min_life_span" name="min_life_span" type="text" />
                </div>
                <div>
                    <label htmlFor="max_life_span"></label>
                    <input id="max_life_span" name="max_life_span" type="text" />
                </div>
                <div>
                    <label htmlFor="image"></label>
                    <input id="image" name="image" type="text" />
                </div>


            </form>
        </>
    )
} 