import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "../features/popupSlice.js";
import noteReducer from '../features/noteSlice.js';
import gateReducer from '../features/gateSlice.js';

const store = configureStore({
    reducer: {
        popup: popupReducer,
        note: noteReducer,
        gate: gateReducer,
    }
});

export default store;