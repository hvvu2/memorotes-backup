import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: false,
    method: 'Login',
    loginEmail: '',
    loginPwd: '',
    signUpName: '',
    signUpEmail: '',
    signUpPwd: '',
    signUpRePwd: '' 
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
        }
    }
});
export const {
    reset,
    switchMethod,
} = gate.actions;
export default gate.reducer;