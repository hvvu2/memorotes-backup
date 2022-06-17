import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideUser } from '../../features/popupSlice.js'
import { clearNotes } from '../../features/noteSlice.js';
import { logOut } from '../../firebase.js';
import { updateUserName, logout } from '../../features/gateSlice.js';


function UserName(props) {
    const userName = useSelector((state) => state.gate.userName);

    function onEdit(e) {
        e.stopPropagation();
        props.setIsEditing(true);
    }

    if (!props.toggle) {
        return (
            <div className='user__wrapper'>
                <h1 className='user__title'>{userName}</h1>
                <button className='user__edit' onClick={(e) => onEdit(e)}><i className='bx bxs-pencil'></i></button>
            </div>
        );
    }
}

function EditUserName(props) {
    const dispatch = useDispatch();
    const uid = useSelector((state) => state.gate.uid);
    const [newUserName, setNewUserName] = useState('');

    function onSubmit() {
        dispatch(updateUserName({uid, newUserName}));
        props.setIsEditing(false);
    }
    
    if (props.toggle) {
        return (
            <div className='user__input-wrapper' onClick={(e) => e.stopPropagation()}>
                <input className='user__input' type='text' placeholder='2 - 24 characters' maxLength={24} onChange={(e) => setNewUserName(e.target.value)}/>
                <button className='user__submit' type='button' onClick={onSubmit}><i className='bx bx-check'></i></button>
            </div>
        );
    }
}

function Description() {
    const userName = useSelector((state) => state.gate.userName);
    const notes = useSelector((state) => state.note.notes);
    const signUpDate = useSelector((state) => state.gate.signUpDate);

    if (!notes) {
        return (
            <p className='user__txt'>
                <span className='highlight'>{userName}</span> joined Memorotes on <span className='highlight'>{signUpDate}</span>, and hasn't written a note yet.
            </p>
        );
    } else if (notes.length === 1) {
        return (
            <p className='user__txt'>
                <span className='highlight'>{userName}</span> joined Memorotes on <span className='highlight'>{signUpDate}</span>, and has written <span className='highlight'>1</span> note on <span className='highlight'>{notes[0].date}</span>.
            </p>
        );
    } else {
        return (
            <p className='user__txt'>
                <span className='highlight'>{userName}</span> joined Memorotes on <span className='highlight'>{signUpDate}</span>, and has written <span className='highlight'>{notes.length}</span> notes so far. 
                The very first note was created on <span className='highlight'>{notes[0].date}</span>.
            </p>
        );
    }
}

function Lines() {
    return (
        <div className='user__lines'>
            <div className='user__line' />
            <div className='user__line' />
            <div className='user__line' />
            <div className='user__line' />
        </div>
    );
}

function User(props) {
    const dispatch = useDispatch();
    const uid = useSelector((state) => state.gate.uid);
    const [isEditing, setIsEditing] = useState(false);

    function onLogOut() {
        logOut();
        dispatch(clearNotes());
        dispatch(logout());
        dispatch(hideUser());
    }

    if (props.toggle) {
        return (
            <div className='mask dim'>
                <div className='popup xl' onClick={() => setIsEditing(false)}>
                    <h1 className='popup__title'>Your Info</h1>
                    <article className='user'>
                        <div className='user__img-wrapper'>
                            <div className='user__img'><i className='bx bx-user'></i></div>
                        </div>
                        <UserName toggle={isEditing} setIsEditing={setIsEditing} />
                        <EditUserName toggle={isEditing} setIsEditing={setIsEditing} />
                        <Description />
                        <Lines />
                    </article>
                    <button className='popup__btn' onClick={onLogOut}>Log Out</button>
                    <button className='popup__close' onClick={() => dispatch(hideUser())}><i className='bx bx-x'></i></button>
                </div>
            </div>
        );
    }
}

export default User;