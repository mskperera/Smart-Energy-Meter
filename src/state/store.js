import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "./device/deviceReducer";


export const store=configureStore({
    reducer:{
        device : deviceReducer,
    }
})