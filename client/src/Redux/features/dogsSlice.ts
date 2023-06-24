import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
   GET_ALL_DOGS_URL,
   FULLFILLED,
   PENDING,
   REJECTED,
} from "../../utils/constants";
import { RootState } from "../store";

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
   dogs?: Dog[];
   dog?: Dog;
   status: string;
   error: string;
}

const initialState: DogsState = {
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
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchAllDogs.pending, (state) => {
            state.status = PENDING;
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
export const selectAllDogs = (state: RootState) => state.dogs.dogs;
export const selectStatus = (state: RootState) => state.dogs.status;
export const selectDog = (state: RootState) => state.dogs.dog;
export const selectError = (state: RootState) => state.dogs.error;
