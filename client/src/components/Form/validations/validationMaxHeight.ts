import { ErrorsInput, Input } from "../Form";

export const validationMaxHeight = (value:string, errors:ErrorsInput, input:Input) => {
    const parsedValue = Number(value);
    const parsedMinHeight = Number(input.min_height);
    if(!value) return {...errors, height: "max height is required"};
    if (!value.match(/^[0-9]+$/)) return {...errors, height: ` max height must contain only numbers`};
    if(parsedValue < 0 || parsedValue > 100) return {...errors, height: "max height must be between 0 and 100cm"};
    if(parsedValue === parsedMinHeight) return {...errors, height: "max height must be different than min height"};
    if(parsedMinHeight > parsedValue) return {...errors, height: "max height must be greater than max height"};
    return {...errors, height: ""};
}