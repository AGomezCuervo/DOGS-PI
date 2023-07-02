import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Redux/store";

interface Utils {
    currentPage: number
}

const initialState:Utils = {
    currentPage: 1,
}

const UtilsSlice = createSlice({
    name: "utils",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setNextPage: (state, action) => {
            if(state.currentPage === action.payload) return;
            state.currentPage = state.currentPage + 1
        },
        setPrevPage: (state) => {
            state.currentPage = state.currentPage - 1
        }
    }
})

export default UtilsSlice.reducer;
export const {setCurrentPage, setNextPage, setPrevPage} = UtilsSlice.actions;
export const selectCurrentPage = (state:RootState) => state.utils.currentPage; 