import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FULLFILLED, GET_ALL_TEMPERAMENTS_URL, PENDING, REJECTED } from "../../utils/constants";
import { RootState } from "../store";

interface TemperamentState {
    temperaments?: string[];
    selectedTemperaments: string[]
    status: string;
    error: string;
}

const initialState:TemperamentState = {
    temperaments: [],
    selectedTemperaments: [],
    status: "",
    error: ""
}

export const fetchAllTemperaments = createAsyncThunk("temperaments/fetchAllTemperaments", async () => {
    try {
        const response = await axios.get(GET_ALL_TEMPERAMENTS_URL);
        const data = response.data
        return data;
    } catch (error) {
        throw new Error("Something went wrong")
    }
})

const temperamentsSlice = createSlice({
    name: "temperaments",
    initialState,
    reducers: {
        setSelectTemperament: (state,action) => {
            state.selectedTemperaments = action.payload
        },
        deleteTemperaments:  (state) => {
            state.selectedTemperaments = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTemperaments.pending, (state) => {
                state.status = PENDING;
                state.error = ""
            })
            .addCase(fetchAllTemperaments.fulfilled, (state, action) => {
                state.status = FULLFILLED;
                state.temperaments = action.payload
            })
            .addCase(fetchAllTemperaments.rejected, (state) => {
                state.status = REJECTED;
                state.error = "Error";
            })
    }
})

export default temperamentsSlice.reducer;
export const {setSelectTemperament, deleteTemperaments} = temperamentsSlice.actions;
export const selectAllTemperaments = (state:RootState) => state.temperaments.temperaments;
export const selectStatus = (state: RootState) => state.temperaments.status;
export const selectError = (state: RootState) => state.temperaments.error;
export const selectSomeTemperaments = (state:RootState) => state.temperaments.selectedTemperaments;
