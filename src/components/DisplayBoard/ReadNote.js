import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { hideReadUI, showUpdateUI, showDeleteUI } from '../../features/noteSlice.js';
import Context from './Context.js';

function UpdateBtn() {
    const dispatch =useDispatch();
    const value = useContext(Context);

    function onOpen() {
        dispatch(showUpdateUI());
        value.setTitle('');
        value.setContent('');
        value.setSaveBtn(false);
    }

    return (
        <button className='note__edit' onClick={onOpen}>
            <i className='bx bxs-pencil'></i>
        </button>
    );
}

function DeleteBtn() {
    const dispatch = useDispatch();

    return (
        <button className='note__delete' onClick={() => dispatch(showDeleteUI())} />
    );
}

function ReadNote(props) {
    const dispatch = useDispatch();
    const note = props.note;

    if (props.toggle) {
        return (
            <div className='mask dim' onClick={() => dispatch(hideReadUI())}>
                <article className='note' onClick={(e) => e.stopPropagation()}>
                    <h1 className='note__date'>{note.date}</h1>
                    <h1 className='note__title'>{note.title}</h1>
                    <p className='note__txt'>{note.content}</p>
                    <UpdateBtn />
                    <DeleteBtn />
                </article>
            </div>
        );
    }
}

export default ReadNote;