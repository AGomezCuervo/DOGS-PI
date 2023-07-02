import { configureStore } from "@reduxjs/toolkit";
import dogsReducer from "../Redux/features/dogsSlice";
import temperamentsReducer from "../Redux/features/temperamentsSlice";
import utilsReducer from "../utils/utilsSlice";
export const store = configureStore({
   reducer: {
    dogs: dogsReducer,
    temperaments: temperamentsReducer,
    utils: utilsReducer
   },
   devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

