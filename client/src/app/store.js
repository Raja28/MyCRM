import { configureStore } from "@reduxjs/toolkit";
import  leadSlice  from "../features/lead";

export const store = configureStore({
    reducer: {
        lead: leadSlice
    }
}) 