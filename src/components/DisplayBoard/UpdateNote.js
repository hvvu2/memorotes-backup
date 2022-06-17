import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../features/popupSlice.js';
import { onUpdate, hideUpdateUI, updateNote } from '../../features/noteSlice.js';
import { resetStyle } from '../../features/panelSlice.js';
import Context from './Context.js';

function Tag(props) {
    if (props.toggle) {
        const className = 'note__tag ' + props.toggle;
        return <div className={className} />;
    }
}

function SaveBtn(props) {
    if (props.toggle) {
        return <button className='note__submit' type='submit'><i className='bx bxs-check-circle'></i></button>;
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

function UpdateNote(props) {
    const dispatch = useDispatch();
    const value = useContext(Context);
    const timestamp = value.timestamp;
    const [title, setTitle] = [value.title, value.setTitle];
    const [content, setContent] = [value.content, value.setContent];
    const [saveBtn, setSaveBtn] = [value.saveBtn, value.setSaveBtn];
    const isLogged = value.isLogged;
    const uid = value.uid;
    const note = value.note;
    const noteColor = useSelector((state) => state.panel.noteColor);
    const noteStyle = useSelector((state) => state.panel.noteStyle);
    const noteTag = useSelector((state) => state.panel.noteTag);
    const dateColor = useSelector((state) => state.panel.dateColor);
    const titleColor = useSelector((state) => state.panel.titleColor);
    const titleWeight = useSelector((state) => state.panel.titleWeight);
    const titleStyle = useSelector((state) => state.panel.titleStyle);
    const titleDeco = useSelector((state) => state.panel.titleDeco);
    const titleAlign = useSelector((state) => state.panel.titleAlign);
    const contentColor = useSelector((state) => state.panel.contentColor);
    const contentWeight = useSelector((state) => state.panel.contentWeight);
    const contentStyle = useSelector((state) => state.panel.contentStyle);
    const contentDeco = useSelector((state) => state.panel.contentDeco);
    const contentAlign = useSelector((state) => state.panel.contentAlign);

    useEffect(() => {
        if (note) {
            if (
                title.trim() ||
                content.trim() ||
                noteColor != note.noteColor ||
                noteStyle != note.noteStyle ||
                noteTag != note.noteTag ||
                dateColor != note.dateColor ||
                titleColor != note.titleColor ||
                titleWeight != note.titleWeight ||
                titleStyle != note.titleStyle ||
                titleDeco != note.titleDeco ||
                titleAlign != note.titleAlign ||
                contentColor != note.contentColor ||
                contentWeight != note.contentWeight ||
                contentStyle != note.contentStyle ||
                contentDeco != note.contentDeco ||
                contentAlign != note.contentAlign
                ) {
                setSaveBtn(true);
            }
        }
    });

    function onSave(e) {
        e.preventDefault();

        if (
            title.trim() ||
            content.trim() ||
            noteColor != note.noteColor ||
            noteStyle != note.noteStyle ||
            noteTag != note.noteTag ||
            dateColor != note.dateColor ||
            titleColor != note.titleColor ||
            titleWeight != note.titleWeight ||
            titleStyle != note.titleStyle ||
            titleDeco != note.titleDeco ||
            titleAlign != note.titleAlign ||
            contentColor != note.contentColor ||
            contentWeight != note.contentWeight ||
            contentStyle != note.contentStyle ||
            contentDeco != note.contentDeco ||
            contentAlign != note.contentAlign
            ) {
            const newNote = {
                title: title,
                content: content,
                noteColor: noteColor,
                noteStyle: noteStyle,
                noteTag: noteTag,
                dateColor: dateColor,
                titleColor: titleColor,
                titleWeight: titleWeight,
                titleStyle: titleStyle,
                titleDeco: titleDeco,
                titleAlign: titleAlign,
                contentColor: contentColor,
                contentWeight: contentWeight,
                contentStyle: contentStyle,
                contentDeco: contentDeco,
                contentAlign: contentAlign
            }

            if (isLogged) {
                if (note.timestamp === timestamp) {
                    dispatch(updateNote({uid, note, newNote}));
                    dispatch(hideUpdateUI());
                    dispatch(resetStyle());
                } else {
                    dispatch(showAlert('Expired'));
                }
            } else {
                dispatch(onUpdate(newNote));
                dispatch(hideUpdateUI());
                dispatch(resetStyle());
            }
        }
    }

    function onClose() {
        if (
            title.trim() ||
            content.trim() ||
            noteColor != note.noteColor ||
            noteStyle != note.noteStyle ||
            noteTag != note.noteTag ||
            dateColor != note.dateColor ||
            titleColor != note.titleColor ||
            titleWeight != note.titleWeight ||
            titleStyle != note.titleStyle ||
            titleDeco != note.titleDeco ||
            titleAlign != note.titleAlign ||
            contentColor != note.contentColor ||
            contentWeight != note.contentWeight ||
            contentStyle != note.contentStyle ||
            contentDeco != note.contentDeco ||
            contentAlign != note.contentAlign
            ) {
            dispatch(showAlert('Discard'));
        } else {
            dispatch(hideUpdateUI());
            dispatch(resetStyle());
        }
    }

    if (props.toggle) {
        let noteInlineStyle = {
            background: `linear-gradient(-45deg, transparent 2em, ${noteColor} 0)`
        };
        let dateInlineStyle = {
            color: dateColor
        };
        let titleInlineStyle = {
            color: titleColor,
            fontWeight: titleWeight,
            fontStyle: titleStyle,
            textDecoration: titleDeco,
            textAlign: titleAlign
        };
        let contentInlineStyle = {
            color: contentColor,
            fontWeight: contentWeight,
            fontStyle: contentStyle,
            textDecoration: contentDeco,
            textAlign: contentAlign
        };

        return (
            <div className='mask'>
                <form className='note' style={noteInlineStyle} onSubmit={(e) => onSave(e)}>
                    <Tag toggle={noteTag} />
                    <h1 className='note__date' style={dateInlineStyle}>{note.date}</h1>
                    <i className='note__hint bx bxs-pencil bx-tada'></i>
                    <input className='note__title' style={titleInlineStyle} type='text' maxLength={40} placeholder='Title' defaultValue={note.title} autoFocus={true} onChange={(e) => setTitle(e.target.value)} />
                    <textarea className='note__txt' style={contentInlineStyle} row='17' wrap='hard' placeholder='Type something here...' defaultValue={note.content} onChange={(e) => setContent(e.target.value)} />
                    <SaveBtn toggle={saveBtn} />
                    <button className='note__close' type='button' onClick={onClose}><i className='bx bx-x'></i></button>
                    <Lines toggle={noteStyle} />
                </form>
            </div>
        );
    }
}

export default UpdateNote;