import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideReadUI, showUpdateUI, showDeleteUI } from '../../features/noteSlice.js';
import { modifyNoteBg } from '../../features/panelSlice.js';
import Context from './Context.js';

function UpdateBtn(props) {
    const dispatch =useDispatch();
    const value = useContext(Context);
    const note = value.note;
    const setTitle = value.setTitle;
    const setContent = value.setContent;
    const setSaveBtn = value.setSaveBtn;

    function onOpen() {
        dispatch(showUpdateUI());
        dispatch(modifyNoteBg(note.noteBg));
        setTitle('');
        setContent('');
        setSaveBtn(false);
    }

    if (props.toggle) {
        return <button className='note__edit' onClick={onOpen}><i className='bx bxs-pencil'></i></button>
    }
}

function DeleteBtn(props) {
    const dispatch = useDispatch();

    if (props.toggle) {
        return <button className='note__delete' onClick={() => dispatch(showDeleteUI())}><i className='bx bxs-trash-alt'></i></button>;
    }
}

function ReadNote(props) {
    const dispatch = useDispatch();
    const [isEditable, setIsEditable] = useState(false);
    const value = useContext(Context);
    const timestamp = value.timestamp;
    const note = value.note;

    useEffect(() => {
        if (note) {
            const noteTimestamp = note.timestamp;

            if (timestamp === noteTimestamp) {
                setIsEditable(true);
            } else {
                setIsEditable(false);
            }
        }
    }, [note]);

    if (props.toggle) {
        let noteStyle = {
            background: null
        };

        if (isEditable) {
            noteStyle = {
                background: `linear-gradient(-45deg, transparent 2em, ${note.noteBg} 0)`
            };
        } else {
            noteStyle = {
                background: note.noteBg
            };
        }

        return (
            <div className='mask dim' onClick={() => dispatch(hideReadUI())}>
                <article className='note' style={noteStyle} onClick={(e) => e.stopPropagation()}>
                    <h1 className='note__date'>{note.date}</h1>
                    <h1 className='note__title'>{note.title}</h1>
                    <p className='note__txt'>{note.content}</p>
                    <UpdateBtn toggle={isEditable} />
                    <DeleteBtn toggle={isEditable} />
                </article>
            </div>
        );
    }
}

export default ReadNote;