import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideUser } from '../../features/popupSlice.js'
import { clearNotes } from '../../features/noteSlice.js';
import { logOut } from '../../firebase.js';
import { logout } from '../../features/gateSlice.js';

function Lines() {
    return (
        <div className='user__lines'>
            <div className='user__line' />
            <div className='user__line' />
            <div className='user__line' />
            <div className='user__line' />
            <div className='user__line' />
            <div className='user__line' />
            <div className='user__line' />
        </div>
    );
}


function User(props) {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.gate.userName);
    const notes = useSelector((state) => state.note.notes);
    const [imgSrc, setImgSrc] = useState('');

    function onLogOut() {
        logOut();
        dispatch(clearNotes());
        dispatch(logout());
    }

    if (props.toggle) {
        return (
            <div className='mask dim'>
                <div className='popup xl'>
                    <h1 className='popup__title'>Your Info</h1>
                    <article className='user'>
                        <div className='user__img-wrapper'>
                            <div className='user__img'></div>
                            <input className='user__upload' type='file' accept='img/*' />
                        </div>
                        <div className='user__wrapper'>
                            <h1 className='user__title'>{userName}</h1>
                            <button className='user__edit'><i className='bx bxs-pencil'></i></button>
                        </div>
                        <span className='user__sub-title'>Member Since: <span className='highlight'></span></span>
                        <span className='user__sub-title'>Total Notes: <span className='highlight'>{notes.length}</span></span>
                        
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