import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes, setIndex, showCreateUI, showReadUI } from '../../features/noteSlice.js';
import { defaultStyle } from '../../features/panelSlice.js';
import { db } from '../../firebase.js';
import { doc, getDoc } from "firebase/firestore";
import Context from './Context.js';
import CreateNote from './CreateNote.js';
import ReadNote from './ReadNote.js';
import UpdateNote from './UpdateNote.js';
import DeleteNote from './DeleteNote.js';

const datetime = new Date();
const year = datetime.getFullYear().toString();
const month = (datetime.getMonth() + 1).toString().padStart(2, '0');
const date = datetime.getDate().toString().padStart(2, '0');
const currentDate = parseInt(year + month + date);

function CreateBtn(props) {
    const dispatch = useDispatch();

    function onOpen() {
        dispatch(showCreateUI());
        dispatch(defaultStyle());
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

function Lines(props) {
    if (props.toggle) {
        const className = 'note-icon__line ' + props.toggle;
        return (
        <div className='note-icon__lines'>
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

function DisplayBoard() {
    const dispatch = useDispatch();
    const uid = useSelector((state) => state.gate.uid);
    const isLogged = useSelector((state) => state.gate.isLogged);
    const date = useSelector((state) => state.note.date);
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
    const [timestamp, setTimestamp] = useState(currentDate);

    useEffect(() => {
        if (isLogged) {
            dispatch(fetchNotes({uid}));
            checkQuota();
        } else {
            setQuota(true);
        }
        timer();
        clearInterval(timer);

        function timer() {
            setInterval(() => {
                setTimestamp(currentDate);
            }, 1000);
        }
    }, [isLogged, timestamp]);

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
                                <Lines toggle={info.noteStyle} />
                            </li>
                        );
                    } else {
                        return (
                            <li className='note-icon' style={noteInlineStyle} key={i} index={i} onClick={() => onSelect(i)}>
                                <div className={className} />
                                <h1 className='note-icon__date' style={dateInlineStyle}>{info.date}</h1>
                                <h1 className='note-icon__title' style={titleInlineStyle}>{info.title}</h1>
                                <p className='note-icon__txt' style={contentInlineStyle}>{info.content}</p>
                                <Lines toggle={info.noteStyle} />
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
                timestamp: timestamp,
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