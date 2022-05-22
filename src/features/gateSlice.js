import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: false,
    uid: null,
    method: 'Login',
    gateBtn: true,
    logOutBtn: false
}

export const gate = createSlice({
    name: 'gate',
    initialState,
    reducers: {
        reset: (state) => {
            state.method = 'Login';
        },
        switchMethod: (state) => {
            if (state.method == 'Login') {
                state.method = 'SignUp';
            } else {
                state.method = 'Login';
            }
        },
        login: (state, action) => {
            state.isLogged = true;
            state.uid = action.payload;
            state.gateBtn = false;
            state.logOutBtn = true;
        },
        logout: (state) => {
            state.isLogged = false;
            state.uid = null;
            state.gateBtn = true;
            state.logOutBtn = false;
        }
    }
});
export const {
    reset,
    switchMethod,
    login,
    logout
} = gate.actions;
export default gate.reducer;