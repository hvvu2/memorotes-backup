import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../features/popupSlice.js'
import { hideCreateUI, onCreate, createNote } from '../../features/noteSlice.js';
import Context from './Context.js';

function SaveBtn(props) {
    if (props.toggle) {
        return <button className='note__submit' type='submit'><i className='bx bxs-check-circle'></i></button>;
    }
}

function CreateNote(props) {
    const dispatch = useDispatch();
    const value = useContext(Context);
    const [title, setTitle] = [value.title, value.setTitle];
    const [content, setContent] = [value.content, value.setContent];
    const [saveBtn, setSaveBtn] = [value.saveBtn, value.setSaveBtn];
    const setQuota = value.setQuota;
    const isLogged = value.isLogged;
    const uid = value.uid;
    const date = value.date;
    const timestamp = value.timestamp;
    const noteBg = useSelector((state) => state.panel.noteBg);
    let noteStyle = {
        background: `linear-gradient(-45deg, transparent 2em, ${noteBg} 0)`
    }

    useEffect(() => {
        if (title.trim() || content.trim()) {
            setSaveBtn(true);
        } else {
            setSaveBtn(false);
        }
    })

    function onSave(e) {
        e.preventDefault();

        if (title.trim() || content.trim()) {
            const note = {
                date: date,
                title: title,
                content: content,
                noteBg: noteBg,
                timestamp: timestamp
            };

            if (isLogged) {
                dispatch(createNote({uid, note}));
                dispatch(hideCreateUI());
                setQuota(false);
            } else {
                dispatch(onCreate(note));
                dispatch(hideCreateUI());
            }
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
                <form className='note' style={noteStyle} onSubmit={(e) => onSave(e)}>
                    <h1 className='note__date'>{date}</h1>
                    <input className='note__title' type='text' maxLength={35} placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                    <textarea className='note__txt' row={17} wrap='hard' placeholder='Type something here...' onChange={(e) => setContent(e.target.value)} />
                    <SaveBtn toggle={saveBtn} />
                    <button className='note__close' type='button' onClick={(onClose)}><i className='bx bx-x'></i></button>
                </form>
            </div>
        );
    }
}

export default CreateNote;