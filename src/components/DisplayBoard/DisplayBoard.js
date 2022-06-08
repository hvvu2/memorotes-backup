import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes, setIndex, showCreateUI, showReadUI } from '../../features/noteSlice.js';
import { resetStyle } from '../../features/panelSlice.js';
import { db } from '../../firebase.js';
import { doc, getDoc } from "firebase/firestore";
import Context from './Context.js';
import CreateNote from './CreateNote.js';
import ReadNote from './ReadNote.js';
import UpdateNote from './UpdateNote.js';
import DeleteNote from './DeleteNote.js';

function CreateBtn(props) {
    const dispatch = useDispatch();

    function onOpen() {
        dispatch(showCreateUI());
        dispatch(resetStyle());
        props.setTitle('');
        props.setContent('');
        props.setSaveBtn(false);
    }

    if (props.toggle && props.quota) {
        return (
            <button className='display-board__btn' onClick={onOpen}>
                <i className='bx bxs-plus-circle'></i>
            </button>
        );
    }
}

function DisplayBoard() {
    const dispatch = useDispatch();
    const uid = useSelector((state) => state.gate.uid);
    const isLogged = useSelector((state) => state.gate.isLogged);
    const date = useSelector((state) => state.note.date);
    const timestamp = useSelector((state) => state.note.timestamp);
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
    const [quota, setQuota] = useState(true);

    useEffect(() => {
        if (isLogged) {
            dispatch(fetchNotes({uid}));
            checkQuota();
        } else {
            setQuota(true);
        }
    }, [isLogged]);

    async function checkQuota() {
        const docId = timestamp.toString();
        const ref = doc(db, 'users', uid, 'notes', docId);
        const response = await getDoc(ref);
        const data = response.data(response);
        if (data) {
            setQuota(false);
        } else {
            setQuota(true);
        }
    }

    function onSelect(i) {
        dispatch(setIndex(i));
        dispatch(showReadUI());
    }

    return (
        <main className='display-board'>
            <ul className='display-board__wrapper'>
                {notes.map((info, i) => {
                    const className = 'note-icon__tag ' + info.noteTag;
                    let noteInlineStyle = {
                        background: info.noteColor
                    };
                    let dateInlineStyle = {
                        color: info.dateColor
                    }
                    let titleInlineStyle = {
                        color: info.titleColor,
                        fontWeight: info.titleWeight,
                        fontStyle: info.titleStyle,
                        textDecoration: info.titleDeco,
                        textAlign: info.titleAlign
                    }
                    let contentInlineStyle = {
                        color: info.contentColor,
                        fontWeight: info.contentWeight,
                        fontStyle: info.contentStyle,
                        textDecoration: info.titleDeco,
                        textAlign: info.contentAlign
                    }
                    if (info.timestamp === timestamp) {
                        return (
                            <li className='note-icon' style={noteInlineStyle} key={i} index={i} onClick={() => onSelect(i)}>
                                <div className={className} />
                                <h1 className='note-icon__date' style={dateInlineStyle}>{info.date}</h1>
                                <h1 className='note-icon__title' style={titleInlineStyle}>{info.title}</h1>
                                <p className='note-icon__txt' style={contentInlineStyle}>{info.content}</p>
                                <i className='bx bxs-pencil'></i>
                            </li>
                        );
                    } else {
                        return (
                            <li className='note-icon' style={noteInlineStyle} key={i} index={i} onClick={() => onSelect(i)}>
                                <div className={className} />
                                <h1 className='note-icon__date' style={dateInlineStyle}>{info.date}</h1>
                                <h1 className='note-icon__title' style={titleInlineStyle}>{info.title}</h1>
                                <p className='note-icon__txt' style={contentInlineStyle}>{info.content}</p>
                            </li>
                        );
                    }
                })}
            </ul>
            <CreateBtn 
                toggle={createBtn} 
                quota={quota}
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
                setSaveBtn: setSaveBtn,
                setQuota: setQuota,
                isLogged: isLogged,
                note: note,
                uid: uid,
                date: date,
                timestamp: timestamp
            }}>
                <CreateNote toggle={createToggle} />
                <ReadNote toggle={readToggle} />
                <UpdateNote toggle={updateToggle} />
                <DeleteNote toggle={deleteToggle} />
            </Context.Provider>
        </main>
    );
}

export default DisplayBoard;