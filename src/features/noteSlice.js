import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, collection, query, orderBy, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
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
            noteColor: data.noteColor,
            noteStyle: data.noteStyle,
            noteTag: data.noteTag,
            dateColor: data.dateColor,
            titleColor: data.titleColor,
            titleWeight: data.titleWeight,
            titleStyle: data.titleStyle,
            titleDeco: data.titleDeco,
            titleAlign: data.titleAlign,
            contentColor: data.contentColor,
            contentWeight: data.contentWeight,
            contentStyle: data.contentStyle,
            contentDeco: data.contentDeco,
            contentAlign: data.contentAlign
        };
        userNotes = [...userNotes, note];
    });
    return userNotes;
});

export const createNote = createAsyncThunk('note/createNote', async (data) => {
    const uid = data.uid;
    const note = data.note;
    const docId = note.timestamp.toString();
    const ref = doc(db, 'users', uid, 'notes', docId);

    await setDoc(ref, note);
    return note;
});

export const updateNote = createAsyncThunk('note/updateNote', async (data) => {
    const uid = data.uid;
    const docId = data.note.timestamp.toString();
    const ref = doc(db, 'users', uid, 'notes', docId);
    const newNote = data.newNote;
    const newTitle = newNote.title.trim();
    const newContent = newNote.content.trim();
    const newNoteColor = newNote.noteColor;
    const newNoteStyle = newNote.noteStyle;
    const newNoteTag = newNote.noteTag;
    const newDateColor = newNote.dateColor;
    const newTitleColor = newNote.titleColor;
    const newTitleWeight = newNote.titleWeight;
    const newTitleStyle = newNote.titleStyle;
    const newTitleDeco = newNote.titleDeco;
    const newTitleAlign = newNote.titleAlign;
    const newContentColor = newNote.contentColor;
    const newContentWeight = newNote.contentWeight;
    const newContentStyle = newNote.contentStyle;
    const newContentDeco = newNote.contentDeco;
    const newContentAlign = newNote.contentAlign;

    if (newTitle) {
        await updateDoc(ref, {
            title: newTitle
        });
    }

    if (newContent) {
        await updateDoc(ref, {
            content: newContent
        });
    }

    await updateDoc(ref, {
        noteColor: newNoteColor,
        noteStyle: newNoteStyle,
        noteTag: newNoteTag,
        dateColor: newDateColor,
        titleColor: newTitleColor,
        titleWeight: newTitleWeight,
        titleStyle: newTitleStyle,
        titleDeco: newTitleDeco,
        titleAlign: newTitleAlign,
        contentColor: newContentColor,
        contentWeight: newContentWeight,
        contentStyle: newContentStyle,
        contentDeco: newContentDeco,
        contentAlign: newContentAlign
    });
    return newNote;
});

export const deleteNote = createAsyncThunk('note/deleteNote', async (data) => {
    const uid = data.uid;
    const docId = data.note.timestamp.toString();
    const ref = doc(db, 'users', uid, 'notes', docId);

    await deleteDoc(ref);
});

const initialState = {
    status: 'onCall',
    date: today,
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
            const newNoteColor = action.payload.noteColor;
            const newNoteStyle = action.payload.noteStyle;
            const newNoteTag = action.payload.noteTag;
            const newDateColor = action.payload.dateColor;
            const newTitleColor = action.payload.titleColor;
            const newTitleWeight = action.payload.titleWeight;
            const newTitleStyle = action.payload.titleStyle;
            const newTitleDeco = action.payload.titleDeco;
            const newTitleAlign = action.payload.titleAlign;
            const newContentColor = action.payload.contentColor;
            const newContentWeight = action.payload.contentWeight;
            const newContentStyle = action.payload.contentStyle;
            const newContentDeco = action.payload.contentDeco;
            const newContentAlign = action.payload.contentAlign;

            if (newTitle) {
                note.title = newTitle;
            }

            if (newContent) {
                note.content = newContent;
            }
            
            note.noteColor = newNoteColor;
            note.noteStyle = newNoteStyle;
            note.noteTag = newNoteTag;
            note.dateColor = newDateColor;
            note.titleColor = newTitleColor;
            note.titleWeight = newTitleWeight;
            note.titleStyle = newTitleStyle;
            note.titleDeco = newTitleDeco;
            note.titleAlign = newTitleAlign;
            note.contentColor = newContentColor;
            note.contentWeight = newContentWeight;
            note.contentStyle = newContentStyle;
            note.contentDeco = newContentDeco;
            note.contentAlign = newContentAlign;
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
            const newNoteColor = action.payload.noteColor;
            const newNoteStyle = action.payload.noteStyle;
            const newNoteTag = action.payload.noteTag;
            const newDateColor = action.payload.dateColor;
            const newTitleColor = action.payload.titleColor;
            const newTitleWeight = action.payload.titleWeight;
            const newTitleStyle = action.payload.titleStyle;
            const newTitleDeco = action.payload.titleDeco;
            const newTitleAlign = action.payload.titleAlign;
            const newContentColor = action.payload.contentColor;
            const newContentWeight = action.payload.contentWeight;
            const newContentStyle = action.payload.contentStyle;
            const newContentDeco = action.payload.contentDeco;
            const newContentAlign = action.payload.contentAlign;

            if (newTitle) {
                note.title = newTitle;
            }

            if (newContent) {
                note.content = newContent;
            }

            note.noteColor = newNoteColor;
            note.noteStyle = newNoteStyle;
            note.noteTag = newNoteTag;
            note.dateColor = newDateColor;
            note.titleColor = newTitleColor;
            note.titleWeight = newTitleWeight;
            note.titleStyle = newTitleStyle;
            note.titleDeco = newTitleDeco;
            note.titleAlign = newTitleAlign;
            note.contentColor = newContentColor;
            note.contentWeight = newContentWeight;
            note.contentStyle = newContentStyle;
            note.contentDeco = newContentDeco;
            note.contentAlign = newContentAlign;
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