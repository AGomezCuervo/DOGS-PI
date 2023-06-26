import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
   GET_ALL_DOGS_URL,
   FULLFILLED,
   PENDING,
   REJECTED,
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
   filters: {
      weight: {
         lighter: boolean,
         heavier: boolean
      },
      temperament: boolean,
      breed: {
         atoZ: boolean,
         ztoA: boolean
      }
   }
   status: string;
   error: string;
}

const initialState: DogsState = {
   dogs: [],
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
   error: "",
};

const fetchAllDogs = createAsyncThunk("dogs/fetchAllDogs", async () => {
   try {
      const data = (await axios.get(GET_ALL_DOGS_URL)).data;
      return data;
   } catch (error) {
      throw new Error("Something went wrong");
   }
});

const dogsSlice = createSlice({
    name: "dogs",
    initialState,
    reducers: {


      sortFromAtoZ: (state) => {
         state.dogs = sortAtoZ(state.dogs);
         state.filters.breed.atoZ = true;
         state.filters.breed.ztoA = false;
         state.filters.weight.heavier = false;
         state.filters.weight.lighter = false;
      },
      sortFromZtoA: (state) => {
         state.dogs = sortZtoA(state.dogs);
         state.filters.breed.ztoA = true;
         state.filters.breed.atoZ = false;
         state.filters.weight.heavier = false;
         state.filters.weight.lighter = false;
      },
      sortFromLighter: (state) => {
         state.dogs = sortLighter(state.dogs);
         state.filters.breed.ztoA = false;
         state.filters.breed.atoZ = false;
         state.filters.weight.heavier = false;
         state.filters.weight.lighter = true;
      },
      sortFromHeavier: (state) => {
         state.dogs = sortHeavier(state.dogs);
         state.filters.breed.ztoA = false;
         state.filters.breed.atoZ = false;
         state.filters.weight.heavier = true;
         state.filters.weight.lighter = false;
      }
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchAllDogs.pending, (state) => {
           state.status = PENDING;
            state.dogs = sortAtoZ(state.dogs);
            state.filters.breed.atoZ = false;
            state.filters.breed.ztoA = false;
            state.filters.weight.heavier = false;
            state.filters.weight.lighter = false;
            state.error = "";
        })
        .addCase(fetchAllDogs.fulfilled, (state, action) => {
            state.dogs = action.payload;
            state.status = FULLFILLED;
        })
        .addCase(fetchAllDogs.rejected, (state) => {
            state.error = "Error";
            state.status = REJECTED;
         });
   },
});

export default dogsSlice.reducer;
export { fetchAllDogs };
export const {sortFromAtoZ, sortFromHeavier, sortFromLighter, sortFromZtoA} = dogsSlice.actions;
export const selectAllDogs = (state: RootState) => state.dogs.dogs;
export const selectStatus = (state: RootState) => state.dogs.status;
export const selectDog = (state: RootState) => state.dogs.dog;
export const selectError = (state: RootState) => state.dogs.error;
export const selectFilters = (state: RootState) => state.dogs.filters;
