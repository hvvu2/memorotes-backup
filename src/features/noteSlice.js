import { createSlice } from "@reduxjs/toolkit";

const datetime = new Date();
const year = datetime.getFullYear().toString();
const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
const month = months[datetime.getMonth()];
const date = datetime.getDate().toString();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day = days[datetime.getDay()];
const serverTimestamp = year + month + day;
const today = day + ', ' + month + ' ' + date + ', ' + year;

const initialState = {
    status: 'onCall',
    index: null,
    limit: true,
    serverTimestamp: serverTimestamp,
    date: today,
    notes: [],
    uid: null,
    createBtn: true,
    createToggle: false,
    readToggle: false,
    updateBtn: true,
    updateToggle: false,
    deleteBtn: true,
    deleteToggle: false
};

export const note = createSlice({
    name: 'note',
    initialState,
    reducers: {
        setIndex: (state, action) => {
            state.index = action.payload;
        },
        showCreateUI: (state) => {
            state.status = 'Creating';
            state.createBtn = false;
            state.createToggle = true;
        },
        onCreate: (state, action) => {
            state.notes = [...state.notes, action.payload];
        },
        hideCreateUI: (state) => {
            state.status = 'onCall';
            state.createBtn = true;
            state.createToggle = false;
        },
        showReadUI: (state) => {
            state.status = 'Reading';
            state.createBtn = false;
            state.readToggle = true;
        },
        hideReadUI: (state) => {
            state.status = 'onCall';
            state.createBtn = true;
            state.readToggle = false;
        },
        showUpdateUI: (state) => {
            state.status = 'Updating';
            state.updateBtn = false;
            state.updateToggle = true;
        },
        onUpdate: (state, action) => {
            const note = state.notes[state.index];
            const newTitle = action.payload.title;
            const newContent = action.payload.content;

            if (newTitle) {
                note.title = newTitle;
            }

            if (newContent) {
                note.content = newContent;
            }
        },
        hideUpdateUI: (state) => {
            state.status = 'onCall';
            state.updateBtn = true;
            state.updateToggle = false;
        },
        showDeleteUI: (state) => {
            state.status = 'Deleting';
            state.deleteToggle = true;
        }
        ,
        onDelete: (state) => {
            state.notes.splice(state.index, 1);
        },
        hideDeleteUI: (state) => {
            state.status = 'onCall';
            state.deleteToggle = false;
        }
    }
});
export const {
    setIndex,
    showCreateUI, 
    hideCreateUI, 
    onCreate,
    showReadUI, 
    hideReadUI,
    showUpdateUI,
    onUpdate,
    hideUpdateUI,
    showDeleteUI,
    onDelete,
    hideDeleteUI
} = note.actions;
export default note.reducer;