import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchUserName = createAsyncThunk('user/fetchUserName', async (data) => {
    const uid = data.uid;
    const ref = doc(db, 'users', uid);
    const result = await getDoc(ref);
    const userName = result.data().name;
    return userName;
});

export const updateUserName = createAsyncThunk('user/updateUserName', async (data) => {
    const uid = data.uid;
    const newUserName = data.newUserName;
    const ref = doc(db, 'users', uid);
    
    await updateDoc(ref, {
        name: newUserName
    });
    return newUserName;
});

const initialState = {
    isLogged: false,
    uid: null,
    signUpDate: null,
    userName: null,
    method: 'Login'
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
            state.uid = action.payload.uid;
            state.signUpDate = action.payload.signUpDate;
        },
        logout: (state) => {
            state.isLogged = false;
            state.uid = null;
        }
    },
    extraReducers: {
        [fetchUserName.fulfilled]: (state, action) => {
            state.userName = action.payload;
        },
        [updateUserName.fulfilled]: (state, action) => {
            state.userName = action.payload;
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