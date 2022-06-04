import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    panelToggle: false,
    noteBg: '#FDFF93'
}

export const panel = createSlice({
    name: 'panel',
    initialState,
    reducers: {
        showPanel: (state) => {
            state.panelToggle = true;
        },
        resetNoteBg: (state) => {
            state.noteBg = '#FDFF93';
        },
        modifyNoteBg: (state, action) => {
            state.noteBg = action.payload;
        },
        hidePanel: (state) => {
            state.panelToggle = false;
        }
    }
})
export const {
    showPanel,
    resetNoteBg,
    modifyNoteBg,
    hidePanel
} = panel.actions;
export default panel.reducer;