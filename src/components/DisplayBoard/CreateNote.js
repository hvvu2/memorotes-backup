import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showAlert } from '../../features/popupSlice.js'
import { hideCreateUI, onCreate } from '../../features/noteSlice.js';

function CreateNote(props) {
    const dispatch = useDispatch();
    const date = useSelector((state) => state.note.date);
    const uid = useSelector((state) => state.note.uid);
    const serverTimestamp = useSelector((state) => state.note.serverTimestamp);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function onSubmit(e) {
        e.preventDefault();

        if (title && content) {
            const note = {
                date: date,
                uid: uid,
                title: title,
                content: content,
                timestamp: serverTimestamp,
            };
            dispatch(onCreate(note));
            dispatch((hideCreateUI()));
        }
    }

    function onClose() {
        if (title || content) {
            dispatch(showAlert('Discard'));
        } else {
            dispatch((hideCreateUI()));
        }
    }

    if (props.toggle) {
        return (
            <div className='mask dim'>
                <form className='note' onSubmit={onSubmit}>
                    <h1 className='note__date'>{date}</h1>
                    <input className='note__title' type='text' maxLength={35} placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                    <textarea className='note__txt' row='17' wrap='hard' placeholder='Type something here...' onChange={(e) => setContent(e.target.value)} />
                    <button className='note__submit' type='submit'><i className='bx bxs-check-circle'></i></button>
                    <button className='note__close' type='button' onClick={(onClose)} />
                </form>
            </div>
        );
    }
}

export default CreateNote;