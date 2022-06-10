import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showGate, showUser } from '../../features/popupSlice.js';
import { showPanel, hidePanel } from '../../features/panelSlice.js';

function UserBtn(props) {
    const dispatch = useDispatch();

    if (props.toggle) {
        return <button className='navbar__btn' onClick={() => dispatch(showUser())}><i className='bx bxs-user-circle'></i></button>;
    }
}

function GateBtn(props) {
    const dispatch = useDispatch();

    if (!props.toggle) {
        return <button className='navbar__btn' onClick={() => dispatch(showGate())}><i className='bx bx-log-in-circle'></i></button>;
    }
}

function Navbar() {
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.gate.isLogged);
    const panelToggle = useSelector((state) => state.panel.panelToggle);

    function onOpen() {
        if (panelToggle) {
            dispatch(hidePanel());
        } else {
            dispatch(showPanel());
        }
    }

    return (
        <nav className='navbar'>
            <h1 className='navbar__title'>Memorotes</h1>
            <div className='navbar__wrapper'>
                <UserBtn toggle={isLogged} />
                <GateBtn toggle={isLogged} />
                <button className='navbar__btn' onClick={onOpen}><i className='bx bxs-palette'></i></button>
            </div>
        </nav>
    );
}

export default Navbar;