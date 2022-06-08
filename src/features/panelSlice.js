import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    panelToggle: false,
    noteColor: '#FDFF93',
    noteStyle: null,
    noteTag: null,
    dateColor: '#505050',
    titleColor: '#505050',
    titleWeight: 'normal',
    titleStyle: 'normal',
    titleDeco: 'none',
    titleAlign: 'left',
    contentColor: '505050',
    contentWeight: 'normal',
    contentStyle: 'normal',
    contentDeco: 'none',
    contentAlign: 'left'
}

export const panel = createSlice({
    name: 'panel',
    initialState,
    reducers: {
        showPanel: (state) => {
            state.panelToggle = true;
        },
        resetStyle: (state) => {
            state.noteColor = '#FDFF93';
            state.noteStyle = null;
            state.noteTag = null;
            state.dateColor = '#505050';
            state.titleColor = '#505050';
            state.titleWeight = 'normal';
            state.titleStyle = 'normal';
            state.titleDeco = 'none';
            state.titleAlign = 'left';
            state.contentColor = '#505050';
            state.contentWeight = 'normal';
            state.contentStyle = 'normal';
            state.contentDeco = 'none';
            state.contentAlign = 'left';
        },
        modifyNoteColor: (state, action) => {
            state.noteColor = action.payload;
        },
        modifyNoteStyle: (state, action) => {
            state.noteStyle = action.payload;
        },
        modifyNoteTag: (state, action) => {
            state.noteTag = action.payload;
        },
        modifyDateColor: (state, action) => {
            state.dateColor = action.payload;
        },
        modifyTitleColor: (state, action) => {
            state.titleColor = action.payload;
        },
        modifyTitleWeight: (state) => {
            if (state.titleWeight === 'normal') {
                state.titleWeight = 'bold';
            } else {
                state.titleWeight = 'normal';
            }
        },
        modifyTitleStyle: (state) => {
            if (state.titleStyle === 'normal') {
                state.titleStyle = 'italic';
            } else {
                state.titleStyle = 'normal';
            }
        },
        modifyTitleDeco: (state) => {
            if (state.titleDeco === 'none') {
                state.titleDeco = 'underline';
            } else {
                state.titleDeco = 'none';
            }
        },
        modifyTitleAlign: (state, action) => {
            state.titleAlign = action.payload;
        },
        modifyContentColor: (state, action) => {
            state.contentColor = action.payload;
        },
        modifyContentWeight: (state) => {
            if (state.contentWeight === 'normal') {
                state.contentWeight = 'bold';
            } else {
                state.contentWeight = 'normal';
            }
        },
        modifyContentStyle: (state) => {
            if (state.contentStyle === 'normal') {
                state.contentStyle = 'italic';
            } else {
                state.contentStyle = 'normal';
            }
        },
        modifyContentDeco: (state) => {
            if (state.contentDeco === 'none') {
                state.contentDeco = 'underline';
            } else {
                state.contentDeco = 'none';
            }
        },
        modifyContentAlign: (state, action) => {
            state.contentAlign = action.payload;
        },
        inheritStyle: (state, action) => {
            const note = action.payload;
            state.noteColor = note.noteColor;
            state.noteStyle = note.noteStyle;
            state.noteTag = note.noteTag;
            state.dateColor = note.dateColor;
            state.titleColor = note.titleColor;
            state.titleWeight = note.titleWeight;
            state.titleStyle = note.titleStyle;
            state.titleDeco = note.titleDeco;
            state.titleAlign = note.titleAlign;
            state.contentColor = note.contentColor;
            state.contentWeight = note.contentWeight;
            state.contentStyle = note.contentStyle;
            state.contentDeco = note.contentDeco;
            state.contentAlign = note.contentAlign;
        },
        hidePanel: (state) => {
            state.panelToggle = false;
        }
    }
})
export const {
    showPanel,
    resetStyle,
    modifyNoteColor,
    modifyNoteStyle,
    modifyNoteTag,
    modifyDateColor,
    modifyTitleColor,
    modifyTitleWeight,
    modifyTitleStyle,
    modifyTitleDeco,
    modifyTitleAlign,
    modifyContentColor,
    modifyContentWeight,
    modifyContentStyle,
    modifyContentDeco,
    modifyContentAlign,
    inheritStyle,
    hidePanel
} = panel.actions;
export default panel.reducer;