import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideAlert } from '../../features/popupSlice.js'
import { hideCreateUI, hideUpdateUI } from '../../features/noteSlice.js';

function DiscardCreating() {
    const dispatch = useDispatch();

    function onDiscard() {
        dispatch(hideCreateUI());
        dispatch(hideAlert());
    }

    return (
        <div className='mask'>
            <div className='popup s'>
                <h1 className='popup__title'>Discard this note?</h1>
                <div className='popup__wrapper'>
                    <p className='popup__txt'>
                        Everything you've written so far will be lost.
                    </p>
                </div>
                <button className='popup__btn' onClick={onDiscard}>Confirm</button>
                <button className='popup__close' onClick={() => dispatch(hideAlert())} />
            </div>
        </div>
    );
}

function DiscardUpdating() {
    const dispatch = useDispatch();

    function onDiscard() {
        dispatch(hideUpdateUI());
        dispatch(hideAlert());
    }

    return (
        <div className='mask'>
            <div className='popup s'>
                <h1 className='popup__title'>Discard the edits?</h1>
                <div className='popup__wrapper'>
                    <p className='popup__txt'>
                        The changes you've made will be lost.
                    </p>
                </div>
                <button className='popup__btn' onClick={onDiscard}>Confirm</button>
                <button className='popup__close' onClick={() => dispatch(hideAlert())} />
            </div>
        </div>
    );
}

function Alerts(props) {
    const noteStatus = useSelector((state) => state.note.status);

    if (props.toggle) {
        if (props.type == 'Discard') {
            if (noteStatus == 'Creating') {
                return <DiscardCreating />
            } else if (noteStatus == 'Updating') {
                return <DiscardUpdating />
            }
        }
    }
}

export default Alerts;