import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { showAlert } from '../../features/popupSlice.js'
import { hideCreateUI, onCreate } from '../../features/noteSlice.js';
import Context from './Context.js';

function SaveBtn(props) {
    if (props.toggle) {
        return <button className='note__submit' type='submit'><i className='bx bxs-check-circle'></i></button>;
    }
}

function CreateNote(props) {
    const dispatch = useDispatch();
    const date = useSelector((state) => state.note.date);
    const uid = useSelector((state) => state.gate.uid);
    const serverTimestamp = useSelector((state) => state.note.serverTimestamp);
    const value = useContext(Context);
    const [title, setTitle] = [value.title, value.setTitle];
    const [content, setContent] = [value.content, value.setContent];
    const [saveBtn, setSaveBtn] = [value.saveBtn, value.setSaveBtn];

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
                <form className='note' onSubmit={(e) => onSave(e)}>
                    <h1 className='note__date'>{date}</h1>
                    <input className='note__title' type='text' maxLength={35} placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                    <textarea className='note__txt' row='17' wrap='hard' placeholder='Type something here...' onChange={(e) => setContent(e.target.value)} />
                    <SaveBtn toggle={saveBtn} />
                    <button className='note__close' type='button' onClick={(onClose)} />
                </form>
            </div>
        );
    }
}

export default CreateNote;