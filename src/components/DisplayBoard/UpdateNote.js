import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../features/popupSlice.js';
import { onUpdate, hideUpdateUI, updateNote } from '../../features/noteSlice.js';
import Context from './Context.js';

function SaveBtn(props) {
    if (props.toggle) {
        return <button className='note__submit' type='submit'><i className='bx bxs-check-circle'></i></button>;
    }
}

function UpdateNote(props) {
    const dispatch = useDispatch();
    const value = useContext(Context);
    const [title, setTitle] = [value.title, value.setTitle];
    const [content, setContent] = [value.content, value.setContent];
    const [saveBtn, setSaveBtn] = [value.saveBtn, value.setSaveBtn];
    const isLogged = value.isLogged;
    const uid = value.uid;
    const note = value.note;
    const noteBg = useSelector((state) => state.panel.noteBg);
    const [localNoteBg, setLocalNoteBg] = useState(noteBg);

    useEffect(() => {
        setLocalNoteBg(noteBg);

        if (title.trim() || content.trim()) {
            setSaveBtn(true);
        } else {
            setSaveBtn(false);
        }
        
        if (note) {
            if (localNoteBg != note.noteBg) {
                setSaveBtn(true);
            } else {
                setSaveBtn(false);
            }
        }
    });

    function onSave(e) {
        e.preventDefault();

        if (title.trim() || content.trim() || localNoteBg != note.noteBg) {
            const newNote = {
                title: title,
                content: content,
                noteBg: noteBg
            }

            if (isLogged) {
                dispatch(updateNote({uid, note, newNote}));
                dispatch(hideUpdateUI());
            } else {
                dispatch(onUpdate(newNote));
                dispatch(hideUpdateUI());
            }
        }
    }

    function onClose() {
        if (title.trim() || content.trim()) {
            dispatch(showAlert('Discard'));
        } else {
            dispatch(hideUpdateUI());
        }
    }

    if (props.toggle) {
        let noteStyle = {
            background: `linear-gradient(-45deg, transparent 2em, ${localNoteBg} 0)`
        }

        return (
            <div className='mask'>
                <form className='note' style={noteStyle} onSubmit={(e) => onSave(e)}>
                    <h1 className='note__date'>{note.date}</h1>
                    <i className='note__hint bx bxs-pencil bx-tada'></i>
                    <input className='note__title' type='text' maxLength={35} placeholder='Title' defaultValue={note.title} autoFocus={true} onChange={(e) => setTitle(e.target.value)} />
                    <textarea className='note__txt' row='17' wrap='hard' placeholder='Type something here...' defaultValue={note.content} onChange={(e) => setContent(e.target.value)} />
                    <SaveBtn toggle={saveBtn} />
                    <button className='note__close' type='button' onClick={onClose}><i className='bx bx-x'></i></button>
                </form>
            </div>
        );
    }
}

export default UpdateNote;