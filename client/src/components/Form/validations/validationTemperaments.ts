import { ErrorsInput } from "../Form";

export const validationTemperaments = (temperaments:string[], errors:ErrorsInput) => {
    if (temperaments.length < 1) {
      return {...errors, temperaments: 'Temperaments are required'};
    }
    if (temperaments.length > 11) {
      return {...errors, temperaments:'Temperaments must be less than 11'};
      }
      return { ...errors, temperaments: '' } 
  };
  