import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import messageSlice from "./messageSlice.js";
export const store = configureStore({
    reducer: {
        //reducers will be added here(slices are kept here)
        user: userSlice,
        message:messageSlice
    }
});