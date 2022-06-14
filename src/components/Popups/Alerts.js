import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideAlert } from '../../features/popupSlice.js'
import { hideCreateUI, hideUpdateUI } from '../../features/noteSlice.js';
import { resetStyle } from '../../features/panelSlice.js';

function DiscardCreating() {
    const dispatch = useDispatch();

    function onDiscard() {
        dispatch(hideCreateUI());
        dispatch(hideAlert());
        dispatch(resetStyle());
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
                <button className='popup__close' onClick={() => dispatch(hideAlert())}><i className='bx bx-x'></i></button>
            </div>
        </div>
    );
}

function DiscardUpdating() {
    const dispatch = useDispatch();

    function onDiscard() {
        dispatch(hideUpdateUI());
        dispatch(hideAlert());
        dispatch(resetStyle());
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

function ExpiredCreating() {
    const dispatch = useDispatch();
    const style = {
        background: '#AE9288'
    };

    return (
        <div className='mask'>
        <div className='popup s' style={style}>
            <h1 className='popup__title'>This note has expired</h1>
            <div className='popup__wrapper'>
                <p className='popup__txt lh-s'>
                    Oops! Time past never returns...<br/>
                    Please create another note for today.
                </p>
            </div>
            <button className='popup__btn' onClick={() => dispatch(hideAlert())}>Confirm</button>
        </div>
    </div>
    );
}

function ExpiredUpdating() {
    const dispatch = useDispatch();
    const style = {
        background: '#AE9288'
    };

    return (
        <div className='mask'>
        <div className='popup s' style={style}>
            <h1 className='popup__title'>This note has expired</h1>
            <div className='popup__wrapper'>
                <p className='popup__txt'>
                    Time flies...
                    Everything has become a memory.
                </p>
            </div>
            <button className='popup__btn' onClick={() => dispatch(hideAlert())}>Confirm</button>
        </div>
    </div>
    );
}

function Alerts(props) {
    const noteStatus = useSelector((state) => state.note.status);

    if (props.toggle) {
        if (props.type === 'Discard') {
            if (noteStatus === 'Creating') {
                return <DiscardCreating />;
            } else if (noteStatus === 'Updating') {
                return <DiscardUpdating />;
            }
        } else if (props.type === 'Expired') {
            if (noteStatus === 'Creating') {
                return <ExpiredCreating />;
            } else if (noteStatus === 'Updating') {
                return <ExpiredUpdating />;
            }
        }
    }
}

export default Alerts;