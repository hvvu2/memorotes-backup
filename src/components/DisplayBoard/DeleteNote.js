import React from 'react';
import { useDispatch } from 'react-redux';
import { hideReadUI, onDelete, hideDeleteUI } from '../../features/noteSlice.js';

function DeleteNote(props) {
    const dispatch = useDispatch();

    function onRemove() {
        dispatch(hideDeleteUI());
        dispatch(hideReadUI());
        dispatch(onDelete());
    }

    if (props.toggle) {
        return (
            <div className='mask'>
                <div className='popup s'>
                    <h1 className='popup__title'>Delete this note?</h1>
                    <p className='popup__txt'>This note will be <span className='highlight'>GONE</span> forever.</p>
                    <button className='popup__btn delete' onClick={onRemove}>Delete</button>
                    <button className='popup__close' onClick={() => dispatch(hideDeleteUI())}></button>
                </div>
            </div>
        );
    }
}

export default DeleteNote;