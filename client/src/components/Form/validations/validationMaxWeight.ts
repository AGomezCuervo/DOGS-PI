import { ErrorsInput, Input } from "../Form";

export const validationMaxWeight = (value:string, errors:ErrorsInput, input:Input) => {
    const parsedValue = Number(value);
    const parsedMinWeight = Number(input.min_weight);
    if(!value) return {...errors, weight: "max weight is required"};
    if (!value.match(/^[0-9]+$/)) return {...errors, weight: ` max weight must contain only numbers`};
    if(parsedValue < 0 || parsedValue > 100) return {...errors, weight: "max weight must be between 0 and 100kg"};
    if(parsedValue === parsedMinWeight) return {...errors, weight: "max weight must be different than min weight"};
    if(parsedValue < parsedMinWeight) return {...errors, weight: "max weight must be greater than min weight"};
    return {...errors, weight: ""};
}