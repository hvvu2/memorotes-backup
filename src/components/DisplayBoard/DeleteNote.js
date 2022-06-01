import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { hideReadUI, onDelete, hideDeleteUI, deleteNote } from '../../features/noteSlice.js';
import Context from './Context.js';

function DeleteNote(props) {
    const dispatch = useDispatch();
    const value = useContext(Context);
    const setQuota = value.setQuota;
    const uid = value.uid;
    const isLogged = value.isLogged;
    const note = value.note;

    function onRemove() {
        if (isLogged) {
            dispatch(deleteNote({uid, note}));
            dispatch(hideDeleteUI());
            dispatch(hideReadUI());
            setQuota(true);

        } else {
            dispatch(onDelete());
            dispatch(hideDeleteUI());
            dispatch(hideReadUI());
        }
    }

    if (props.toggle) {
        return (
            <div className='mask'>
                <div className='popup s'>
                    <h1 className='popup__title'>Delete this note?</h1>
                    <p className='popup__txt'>This note will be <span className='highlight'>GONE</span> forever.</p>
                    <button className='popup__btn delete' onClick={onRemove}>Delete</button>
                    <button className='popup__close' onClick={() => dispatch(hideDeleteUI())}><i className='bx bx-x'></i></button>
                </div>
            </div>
        );
    }
}

export default DeleteNote;