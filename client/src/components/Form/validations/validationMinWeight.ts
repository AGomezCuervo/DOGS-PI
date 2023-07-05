import { ErrorsInput, Input } from "../Form";

export const validationMinWeight = (value:string, errors:ErrorsInput, input:Input) => {
    const parsedValue = Number(value);
    const parsedMaxWeight = Number(input.max_weight);
    if(!value) return {...errors, weight: "min weight is required"};
    if (!value.match(/^[0-9]+$/)) return {...errors, weight: ` min weight must contain only numbers`};
    if(parsedValue < 0 || parsedValue > 100) return {...errors, weight: "min weight must be between 0 and 100kg"};
    if(parsedValue === parsedMaxWeight) return {...errors, weight: "min weight must be different than max weight"};
    if(parsedValue > parsedMaxWeight) return {...errors, weight: "min weight must be less than max weight"};
    return {...errors, weight: ""};
}