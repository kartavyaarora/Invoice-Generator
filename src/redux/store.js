import { configureStore } from "@reduxjs/toolkit";
import { invoiceReducer } from "./Reducer";

export const store = configureStore({
    reducer:{
        invoiceReducer: invoiceReducer
    }
});