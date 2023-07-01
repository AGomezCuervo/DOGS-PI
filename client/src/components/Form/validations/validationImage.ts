import { ErrorsInput, Input } from "../Form";

export const validationImage = (value: string, errors: ErrorsInput, input: Input) => {
    if(!value) return {... errors, image: 'URL is required'};
    if(!value.match(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/)) return {... errors, image: 'URL must be valid'};
    if(value.length > 254) return {...errors, image: 'URL must be less than 255 characters'};
    return {...errors, image: ''};
}