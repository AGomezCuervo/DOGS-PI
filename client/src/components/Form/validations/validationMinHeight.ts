import { ErrorsInput, Input } from "../Form";

export const validationMinHeight = (value:string, errors:ErrorsInput, input:Input) => {
    const parsedValue = Number(value);
    const parsedMaxHeight = Number(input.max_height);
    if(!value) return {...errors, height: "min height is required"};
    if (!value.match(/^[0-9]+$/)) return {...errors, height: ` min height must contain only numbers`};
    if(parsedValue < 0 || parsedValue > 100) return {...errors, height:"min height must be between 0 and 100cm"};
    if(parsedValue === parsedMaxHeight) return {...errors, height: "min height must be different than max height"};
    if(parsedValue > parsedMaxHeight) return {...errors, height: "min height must be less than max height"};
    return {...errors, height: ""};
}