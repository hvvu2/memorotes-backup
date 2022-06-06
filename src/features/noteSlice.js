import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, collection, query, orderBy, getDocs, setDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase.js';

const datetime = new Date();
const year = datetime.getFullYear().toString();
const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
const month = months[datetime.getMonth()];
const date = datetime.getDate().toString();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day = days[datetime.getDay()];
const today = day + ', ' + month + ' ' + date + ', ' + year;
const timestamp = parseInt(year + (datetime.getMonth() + 1).toString().padStart(2, '0') + date.padStart(2, '0'));

export const fetchNotes = createAsyncThunk('note/fetchNotes', async (data) => {
    const uid = data.uid;
    const ref = collection(db, 'users', uid, 'notes');
    const q = query(ref, orderBy('timestamp', 'asc'));
    const querySnapshot = await getDocs(q);
    let userNotes = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const note = {
            date: data.date,
            title: data.title,
            content: data.content,
            timestamp: data.timestamp,
            noteBg: data.noteBg
        };
        userNotes = [...userNotes, note];
    });
    return userNotes;
});

export const createNote = createAsyncThunk('note/createNote', async (data) => {
    const uid = data.uid;
    const note = data.note;
    const docId = note.timestamp.toString();

    await setDoc(doc(db, 'users', uid, 'notes', docId), note);
    return note;
});

export const updateNote = createAsyncThunk('note/updateNote', async (data) => {
    const uid = data.uid;
    const docId = data.note.timestamp.toString();
    const newNote = data.newNote;
    const newTitle = newNote.title.trim();
    const newContent = newNote.content.trim();
    const newNoteBg = newNote.noteBg;

    if (newTitle) {
        await updateDoc(doc(db, 'users', uid, 'notes', docId), {
            title: newTitle
        });
    }

    if (newContent) {
        await updateDoc(doc(db, 'users', uid, 'notes', docId), {
            content: newContent
        });
    }

    if (newNoteBg) {
        await updateDoc(doc(db, 'users', uid, 'notes', docId), {
            noteBg: newNoteBg
        });
    }

    return newNote;
});

export const deleteNote = createAsyncThunk('note/deleteNote', async (data) => {
    const uid = data.uid;
    const docId = data.note.timestamp.toString();

    await deleteDoc(doc(db, 'users', uid, 'notes', docId));
});

const initialState = {
    status: 'onCall',
    date: today,
    timestamp: timestamp,
    onCreateTimestamp: null,
    notes: [],
    index: null,
    createBtn: true,
    createToggle: false,
    readToggle: false,
    updateToggle: false,
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
            state.onCreateTimestamp = timestamp;
        },
        onCreate: (state, action) => {
            state.notes = [...state.notes, action.payload];
        },
        hideCreateUI: (state) => {
            state.status = 'onCall';
            state.createBtn = true;
            state.createToggle = false;
            state.onCreateTimestamp = null;
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
            state.updateToggle = true;
        },
        onUpdate: (state, action) => {
            const note = state.notes[state.index];
            const newTitle = action.payload.title;
            const newContent = action.payload.content;
            const newNoteBg = action.payload.noteBg;

            if (newTitle) {
                note.title = newTitle;
            }

            if (newContent) {
                note.content = newContent;
            }

            if (newNoteBg) {
                note.noteBg = newNoteBg;
            }

        },
        hideUpdateUI: (state) => {
            state.status = 'onCall';
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
        },
        clearNotes: (state) => {
            state.notes = [];
        }
    },
    extraReducers: {
        [fetchNotes.fulfilled]: (state, action) => {
            state.notes = action.payload;
        },
        [createNote.fulfilled]: (state, action) => {
            state.notes = [...state.notes, action.payload];
        },
        [updateNote.fulfilled]: (state, action) => {
            const note = state.notes[state.index];
            const newTitle = action.payload.title;
            const newContent = action.payload.content;
            const newNoteBg = action.payload.noteBg;

            if (newTitle) {
                note.title = newTitle;
            }

            if (newContent) {
                note.content = newContent;
            }

            if (newNoteBg) {
                note.noteBg = newNoteBg;
            }
        },
        [deleteNote.fulfilled]: (state) => {
            state.notes.splice(state.index, 1);
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
    hideDeleteUI,
    clearNotes
} = note.actions;
export default note.reducer;