import { ErrorsInput, Input } from "../Form";
import { validationImage } from "./validationImage";
import { validationMaxHeight } from "./validationMaxHeight";
import { validationMaxLifeSpan } from "./validationMaxLifeSpan";
import { validationMaxWeight } from "./validationMaxWeight";
import { validationMinHeight } from "./validationMinHeight";
import { validationMinLifeSpan } from "./validationMinLifeSpan";
import { validationMinWeight } from "./validationMinWeight";
import { validationName } from "./validationName";



export const validations = (value:string, name:string, errors:ErrorsInput, input:Input): ErrorsInput => {
    switch(name) {
        case 'name':
            return validationName(value, errors);
        case 'min_height':
            return validationMinHeight(value, errors, input);
        case 'max_height':
            return validationMaxHeight(value, errors, input);
        case 'min_weight':
            return validationMinWeight(value, errors, input); 
        case 'max_weight':
            return validationMaxWeight(value, errors, input);
        case 'min_life_span':
            return validationMinLifeSpan(value, errors, input);
        case 'max_life_span':
            return validationMaxLifeSpan(value, errors, input);
        case 'image':
            return validationImage(value, errors, input)
        default:
            return errors;
    }
}