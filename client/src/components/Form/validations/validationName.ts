import { ErrorsInput } from "../Form";

export const validationName = (value:string, errors: ErrorsInput) => {
    if(!value) return {...errors, name: "Breed is required"};
    if(value.length < 3) return {...errors, name: "Breed must be at least 3 characters long"};
    if(value.length > 30) return {...errors, name: "Breed must be less 30 characters long"};
    if (!value.match(/^[a-zA-Z\s]+$/)) return {...errors, breed: "Breed must contain only letters"};
    return {...errors, name: ""}
}