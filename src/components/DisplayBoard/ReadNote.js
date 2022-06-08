import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideReadUI, showUpdateUI, showDeleteUI } from '../../features/noteSlice.js';
import { inheritStyle } from '../../features/panelSlice.js';
import Context from './Context.js';

function Tag(props) {
    if (props.toggle) {
        const className = 'note__tag ' + props.toggle;
        return <div className={className} />;
    }
}

function UpdateBtn(props) {
    const dispatch =useDispatch();
    const value = useContext(Context);
    const note = value.note;
    const setTitle = value.setTitle;
    const setContent = value.setContent;
    const setSaveBtn = value.setSaveBtn;

    function onOpen() {
        dispatch(showUpdateUI());
        dispatch(inheritStyle(note));
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

function Lines(props) {
    if (props.toggle) {
        const className = 'note__line ' + props.toggle;
        return (
        <div className='note__lines'>
            <div className={className}></div>
            <div className={className}></div>
            <div className={className}></div>
            <div className={className}></div>
            <div className={className}></div>
            <div className={className}></div>
            <div className={className}></div>
            <div className={className}></div>
            <div className={className}></div>
            <div className={className}></div>
            <div className={className}></div>
            <div className={className}></div>
            <div className={className}></div>
            <div className={className}></div>
            <div className={className}></div>
        </div>
        );
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
        let noteInlineStyle = {
            background: null
        };
        let dateInlineStyle = {
            color: note.dateColor
        };
        let titleInlineStyle = {
            color: note.titleColor,
            fontWeight: note.titleWeight,
            fontStyle: note.titleStyle,
            textDecoration: note.titleDeco,
            textAlign: note.titleAlign
        };
        let contentInlineStyle = {
            color: note.contentColor,
            fontWeight: note.contentWeight,
            fontStyle: note.contentStyle,
            textDecoration: note.contentDeco,
            textAlign: note.contentAlign
        };

        if (isEditable) {
            noteInlineStyle = {
                background: `linear-gradient(-45deg, transparent 2em, ${note.noteColor} 0)`
            };
        } else {
            noteInlineStyle = {
                background: note.noteColor
            };
        }

        return (
            <div className='mask dim' onClick={() => dispatch(hideReadUI())}>
                <article className='note' style={noteInlineStyle} onClick={(e) => e.stopPropagation()}>
                    <Tag toggle={note.noteTag} />
                    <h1 className='note__date' style={dateInlineStyle}>{note.date}</h1>
                    <h1 className='note__title' style={titleInlineStyle}>{note.title}</h1>
                    <p className='note__txt' style={contentInlineStyle}>{note.content}</p>
                    <UpdateBtn toggle={isEditable} />
                    <DeleteBtn toggle={isEditable} />
                    <Lines toggle={note.noteStyle} />
                </article>
            </div>
        );
    }
}

export default ReadNote;