import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
   GET_ALL_DOGS_URL,
   FULLFILLED,
   PENDING,
   REJECTED,
   GET_DOG_SEARCH,
   GET_DOG_BY_ID,
   GET_ALL_DB_DOGS,
} from "../../utils/constants";
import { RootState } from "../store";
import { sortAtoZ, sortHeavier, sortLighter, sortZtoA } from "../../utils/sorters";

export interface Dog {
   id: string;
   name: string;
   height: string;
   weight: string;
   life_span: string;
   averageWeight: string;
   averageHeight: string;
   image: string;
   temperaments: string[];
}

interface DogsState {
   dogs: Dog[];
   dog?: Dog;
   copyDogs: Dog[];
   filters: {
      weight: {
         lighter: boolean;
         heavier: boolean;
      },
      temperament: boolean;
      breed: {
         atoZ: boolean;
         ztoA: boolean;
      }
   }
   status: string;
   error: undefined | string;
}

const initialState: DogsState = {
   dogs: [],
   copyDogs:[],
   filters: {
      weight: {
         lighter: false,
         heavier: false
      },
      temperament: false,
      breed: {
         atoZ: false,
         ztoA: false
      }
   },
   status: "idle",
   error: ""
};

const fetchAllDogs = createAsyncThunk("dogs/fetchAllDogs", async () => {
   try {
      const data = (await axios.get(GET_ALL_DOGS_URL)).data;
      return data;
   } catch (error) {
      let errorMessage = "Unknown error";
      if (error instanceof AxiosError) {
         if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
         }
      }
      throw new Error(errorMessage);
   }
});

const fetchDogByName = createAsyncThunk("dogs/fetchDogByName", async (name:string) => {
   try {
      const data = (await axios.get(GET_DOG_SEARCH + name)).data;
      return data;
   } catch (error) {
      let errorMessage = "Unknown error";
      if (error instanceof AxiosError) {
         if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
         }
      }
      throw new Error(errorMessage);
   }
})

const fetchDogById = createAsyncThunk("dogs/fetchDogById", async (id:string | undefined) => {
   try {
      const data = (await axios.get(GET_DOG_BY_ID + id)).data;
      return data;
   } catch (error) {
      let errorMessage = "Unknown error";
      if (error instanceof AxiosError) {
         if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
         }
      }
      throw new Error(errorMessage);
   }
})

const fetchAllDBDogs = createAsyncThunk("dogs/fetchAllDBDogs", async() => {
   try {
      const data = (await axios.get(GET_ALL_DB_DOGS)).data;
      return data;
   } catch (error) {
      let errorMessage = "Unknown error";
      if (error instanceof AxiosError) {
         if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
         }
      }
      throw new Error(errorMessage);
   }
})

const dogsSlice = createSlice({
    name: "dogs",
    initialState,
    reducers: {

      activeFilters: (state, action: {payload: {name: keyof typeof state.filters, value: any}}) => {
         state.filters[action.payload.name] = action.payload.value
      },
      sortFromAtoZ: (state) => {
         state.dogs = sortAtoZ(state.dogs);
      },
      sortFromZtoA: (state) => {
         state.dogs = sortZtoA(state.dogs);
      },
      sortFromLighter: (state) => {
         state.dogs = sortLighter(state.dogs);
      },
      sortFromHeavier: (state) => {
         state.dogs = sortHeavier(state.dogs);
      },
      sortByTemperament: (state, action) => {
         state.filters.temperament = true;
         const dogs = state.dogs;
         const temperamentsArray = action.payload;
         const filteredDogs = dogs.filter((dog) => {
               return temperamentsArray.every((temp:string) => dog.temperaments.includes(temp))
         })
         
         state.dogs = filteredDogs;
         if(filteredDogs.length === 0) state.error = `No found dogs with temperaments: ${temperamentsArray.join(", ")}...`
         
      },
      clearDog: (state) => {
         state.dog = undefined;
      },
      setCopyDog: (state) => {
         state.copyDogs = state.dogs
      },
      putOriginalAsCopy: (state) => {
         state.dogs = state.copyDogs;
         console.log("Cambie");
         
      }
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchAllDogs.pending, (state) => {
           state.status = PENDING;
            state.error = "";
        })
        .addCase(fetchAllDogs.fulfilled, (state, action) => {
            state.dogs = action.payload;
            state.status = FULLFILLED;
            state.error = "";
        })
        .addCase(fetchAllDogs.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = REJECTED;
         })
         .addCase(fetchDogByName.pending, (state) => {
            state.status = PENDING;
         })
         .addCase(fetchDogByName.fulfilled,(state, action) => {
            state.status = FULLFILLED;
            state.dogs = action.payload;
            state.error = ""
         })
         .addCase(fetchDogByName.rejected, (state, action) => {
            state.status = REJECTED;
            state.error = action.error.message;
            state.dogs = [];
         })
         .addCase(fetchDogById.pending, (state) => {
            state.status = PENDING;
         })
         .addCase(fetchDogById.fulfilled, (state, action) => {
            state.status = FULLFILLED;
            state.dog = action.payload;
            state.error = "";
         })
         .addCase(fetchDogById.rejected, (state, action) => {
            state.status = REJECTED;
            state.error = action.error.message;
         })
         .addCase(fetchAllDBDogs.pending, (state) => {
            state.status = PENDING;
            state.error = ""
         })
         .addCase(fetchAllDBDogs.fulfilled, (state, action) => {
            state.status = FULLFILLED;
            state.dogs = action.payload;
            state.error = ""
         })
         .addCase(fetchAllDBDogs.rejected, (state,action) => {
            state.status = REJECTED;
            state.error = action.error.message;
            
         })
   },
});

export default dogsSlice.reducer;
export { fetchAllDogs, fetchDogByName, fetchDogById, fetchAllDBDogs};
export const {sortFromAtoZ, sortFromHeavier, sortFromLighter, sortFromZtoA, sortByTemperament, activeFilters, clearDog, setCopyDog, putOriginalAsCopy} = dogsSlice.actions;
export const selectAllDogs = (state: RootState) => state.dogs.dogs;
export const selectStatus = (state: RootState) => state.dogs.status;
export const selectDog = (state: RootState) => state.dogs.dog;
export const selectError = (state: RootState) => state.dogs.error;
export const selectFilters = (state: RootState) => state.dogs.filters;
export const selectCopyDogs = (state: RootState) => state.dogs.copyDogs;
