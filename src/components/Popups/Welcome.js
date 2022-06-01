import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideWelcome, showGate } from '../../features/popupSlice.js'

function Welcome(props) {
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.gate.isLogged);

    function onOpen() {
        if (!isLogged) {
            dispatch(showGate());
        }
    }

    if (props.toggle) {
        return (
            <div className='mask'>
                <div className='popup m'>
                    <h1 className='popup__title'>Welcome to Memorotes!</h1>
                    <div className='popup__wrapper'>
                        <p className='popup__txt'>
                            Record memorable moments or vent your feelings by writing a note.<br/>
                            But!<br/>
                            Only <span className='highlight'>one note a day</span> and it <span className='highlight'>can't</span> be edited or deleted after the day.
                            Remember to <button className='popup__link' onClick={onOpen}>log in</button> if you want to keep your notes.<br/>
                            Enjoy creating your own memorotes!
                        </p>
                    </div>
                    <p className='popup__hint'><span className='highlight'>Hint:</span> Click the dog-ear to close/delete ➙</p>
                    <button className='popup__close' onClick={() => dispatch(hideWelcome())}><i className='bx bx-x'></i></button>
                </div>
            </div>
        );
    } 
}

export default Welcome;