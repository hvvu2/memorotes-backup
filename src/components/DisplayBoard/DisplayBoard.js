import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIndex, showCreateUI, showReadUI } from '../../features/noteSlice.js';
import CreateNote from './CreateNote.js';
import ReadNote from './ReadNote.js';
import UpdateNote from './UpdateNote.js';
import DeleteNote from './DeleteNote.js';

function CreateBtn(props) {
    const dispatch = useDispatch();

    if (props.toggle) {
        return (
            <button className='display-board__btn' onClick={() => {
                dispatch(showCreateUI());
            }}>
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
            <CreateNote toggle={createToggle} />
            <ReadNote toggle={readToggle} note={note} />
            <UpdateNote toggle={updateToggle} note={note} />
            <CreateBtn toggle={createBtn} />
            <DeleteNote toggle={deleteToggle} />
        </main>
    );
}

export default DisplayBoard;