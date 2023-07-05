import { ErrorsInput, Input } from "../Form";

export const validationMinLifeSpan = (value:string, errors:ErrorsInput, input:Input) => {
    const parsedValue = Number(value);
    const parsedMaxLifeSpan = Number(input.max_life_span);
    if(!value) return {...errors, life_span: "min life span is required"};
    if (!value.match(/^[0-9]+$/)) return {...errors, life_span: ` min life span must contain only numbers`};
    if(parsedValue < 0 || parsedValue > 25) return {...errors, life_span: "min life span must be between 0 and 25 years"};
    if(parsedValue === parsedMaxLifeSpan) return {...errors, life_span: "min life span must be different than max life span"};
    if(parsedValue > parsedMaxLifeSpan) return {...errors, life_span: "min life span must be less than max life span"};
    return {...errors, life_span: ""};
}