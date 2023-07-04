import { ErrorsInput, Input } from "../Form";

export const validationMaxLifeSpan = (value:string, errors:ErrorsInput, input:Input) => {
    const parsedValue = Number(value);
    const parsedMinLifeSpan = Number(input.min_life_span);
    if(!parsedValue) return {...errors, life_span: "max life span is required"};
    if(parsedValue < 0 || parsedValue > 25) return {...errors, life_span: "max life span must be between 0 and 25 years"};
    if(parsedValue === parsedMinLifeSpan) return {...errors, life_span: "max life span must be different than min life span"};
    if(parsedValue < parsedMinLifeSpan) return {...errors, life_span: "max life span must be greater than min life span"};
    return {...errors, life_span: ""};
}