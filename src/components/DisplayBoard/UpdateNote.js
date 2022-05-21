import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../features/popupSlice.js';
import { onUpdate, hideUpdateUI } from '../../features/noteSlice.js';

function UpdateNote(props) {
    const dispatch = useDispatch();
    const note = props.note;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function onSubmit(e) {
        e.preventDefault();

        if (title || content) {
            const newNote = {
                title: title,
                content: content
            }
            dispatch(onUpdate(newNote));
            dispatch(hideUpdateUI());
            setTitle('');
            setContent('');
        }
    }

    function onClose() {
        if (title || content) {
            dispatch(showAlert('Discard'));
        } else {
            dispatch(hideUpdateUI());
            setTitle('');
            setContent('');
        }
    }

    if (props.toggle) {
        return (
            <div className='mask'>
                <form className='note' onSubmit={onSubmit}>
                    <h1 className='note__date'>{note.date}</h1>
                    <input className='note__title' type='text' maxLength={35} placeholder='Title' defaultValue={note.title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea className='note__txt' row='17' wrap='hard' placeholder='Type something here...' defaultValue={note.content} onChange={(e) => setContent(e.target.value)} />
                    <button className='note__submit' type='submit'><i className='bx bxs-check-circle'></i></button>
                    <button className='note__close' type='button' onClick={onClose} />
                </form>
            </div>
        );
    }
}

export default UpdateNote;