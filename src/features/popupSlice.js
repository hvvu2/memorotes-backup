import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    welcomeToggle: true,
    gateToggle: false,
    userToggle: false,
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
        showUser: (state) => {
            state.userToggle = true;
        },
        hideUser: (state) => {
            state.userToggle = false;
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
    showUser,
    hideUser,
    showAlert, 
    hideAlert, 
} = popup.actions;
export default popup.reducer;