import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes, setIndex, showCreateUI, showReadUI } from '../../features/noteSlice.js';
import { db } from '../../firebase.js';
import { doc, getDoc } from "firebase/firestore";
import Context from './Context.js';
import CreateNote from './CreateNote.js';
import ReadNote from './ReadNote.js';
import UpdateNote from './UpdateNote.js';
import DeleteNote from './DeleteNote.js';

function CreateBtn(props) {
    const dispatch = useDispatch();

    function onOpen() {
        dispatch(showCreateUI());
        props.setTitle('');
        props.setContent('');
        props.setSaveBtn(false);
    }

    if (props.toggle && props.quota) {
        return (
            <button className='display-board__btn' onClick={onOpen}>
                <i className='bx bxs-plus-circle'></i>
            </button>
        );
    }
}

function DisplayBoard() {
    const dispatch = useDispatch();
    const uid = useSelector((state) => state.gate.uid);
    const isLogged = useSelector((state) => state.gate.isLogged);
    const date = useSelector((state) => state.note.date);
    const timestamp = useSelector((state) => state.note.timestamp);
    const createBtn = useSelector((state) => state.note.createBtn);
    const createToggle = useSelector((state) => state.note.createToggle);
    const readToggle = useSelector((state) => state.note.readToggle);
    const updateToggle = useSelector((state) => state.note.updateToggle);
    const deleteToggle = useSelector((state) => state.note.deleteToggle);
    const notes = useSelector((state) => state.note.notes);
    const index = useSelector((state) => state.note.index);
    const note = notes[index];
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [saveBtn, setSaveBtn] = useState(false);
    const [quota, setQuota] = useState(true);
    
    useEffect(() => {
        if (isLogged) {
            dispatch(fetchNotes({uid}));
            checkQuota();
        }
    }, [isLogged]);

    async function checkQuota() {
        const docId = timestamp.toString();
        const ref = doc(db, 'users', uid, 'notes', docId);
        const response = await getDoc(ref);
        const data = response.data(response);
        if (data) {
            setQuota(false);
        } else {
            setQuota(true);
        }
    }

    function onSelect(i) {
        dispatch(setIndex(i));
        dispatch(showReadUI());
    }

    return (
        <main className='display-board'>
            <ul className='display-board__wrapper'>
                {notes.map((info, i) => 
                    <li className='display-board__icon' key={i} index={i} onClick={() => onSelect(i)} />
                )}
            </ul>
            <CreateBtn 
                toggle={createBtn} 
                quota={quota}
                setTitle={setTitle} 
                setContent={setContent} 
                setSaveBtn={setSaveBtn}
            />
            <Context.Provider value={{
                title: title, 
                setTitle: setTitle,
                content: content,
                setContent: setContent,
                saveBtn: saveBtn,
                setSaveBtn: setSaveBtn,
                setQuota: setQuota,
                isLogged: isLogged,
                note: note,
                uid: uid,
                date: date,
                timestamp: timestamp
            }}>
                <CreateNote toggle={createToggle} />
                <ReadNote toggle={readToggle} />
                <UpdateNote toggle={updateToggle} />
                <DeleteNote toggle={deleteToggle} />
            </Context.Provider>
        </main>
    );
}

export default DisplayBoard;