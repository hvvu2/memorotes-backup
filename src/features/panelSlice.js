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
        hidePanel: (state) => {
            state.panelToggle = false;
        }
    }
})
export const {
    showPanel,
    hidePanel
} = panel.actions;
export default panel.reducer;