import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doc, collection, query, orderBy, getDocs } from "firebase/firestore";
import { setIndex, showCreateUI, showReadUI } from '../../features/noteSlice.js';
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

    if (props.toggle) {
        return (
            <button className='display-board__btn' onClick={onOpen}>
                <i className='bx bxs-plus-circle'></i>
            </button>
        );
    }
}

function DisplayBoard() {
    const dispatch = useDispatch();
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
                setSaveBtn: setSaveBtn
            }}>
                <CreateNote toggle={createToggle} />
                <ReadNote toggle={readToggle} note={note} />
                <UpdateNote toggle={updateToggle} note={note} />
                <DeleteNote toggle={deleteToggle} />
            </Context.Provider>
        </main>
    );
}

export default DisplayBoard;