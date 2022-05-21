import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    welcomeToggle: true,
    gateToggle: false,
    alertToggle: false,
    alertType: null
}

export const popup = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        showWelcome: (state) => {
            state.welcomeToggle = true;
        },
        hideWelcome: (state) => {
            state.welcomeToggle = false;
        },
        showGate: (state) => {
            state.gateToggle = true;
        },
        hideGate: (state) => {
            state.gateToggle = false;
        },
        showAlert: (state, action) => {
            state.alertType = action.payload;
            state.alertToggle = true;
        },
        hideAlert: (state) => {
            state.alertType = null;
            state.alertToggle = false;
        }
    }
});
export const {
    showWelcome, 
    hideWelcome,
    showGate,
    hideGate, 
    showAlert, 
    hideAlert, 
} = popup.actions;
export default popup.reducer;