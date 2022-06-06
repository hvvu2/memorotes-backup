import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: false,
    uid: null,
    method: 'Login',
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
        },
        logout: (state) => {
            state.isLogged = false;
            state.uid = null;
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