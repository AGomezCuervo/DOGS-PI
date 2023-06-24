import { configureStore } from "@reduxjs/toolkit";
import dogsReducer from "../Redux/features/dogsSlice"
import temperamentsReducer from "../Redux/features/temperamentsSlice"

export const store = configureStore({
   reducer: {
    dogs: dogsReducer,
    temperaments: temperamentsReducer
   },
   devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

