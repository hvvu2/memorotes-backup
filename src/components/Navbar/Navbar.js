import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showGate } from '../../features/popupSlice.js';
import { logout } from '../../features/gateSlice.js';
import { logOut } from '../../firebase.js';

function GateBtn(props) {
    const dispatch = useDispatch();

    if (props.toggle) {
        return <button className='navbar__btn' onClick={() => dispatch(showGate())}><i className='bx bxs-user-circle'></i></button>;
    }

}

function LogOutBtn(props) {
    const dispatch = useDispatch();

    function onLogOut() {
        logOut();
        dispatch(logout());
    }

    if (props.toggle) {
        return <button className='navbar__btn' onClick={onLogOut}><i className='bx bx-log-out-circle'></i></button>;
    }
}

function Navbar() {
    const gateBtn = useSelector((state) => state.gate.gateBtn);
    const logOutBtn = useSelector((state) => state.gate.logOutBtn);

    return (
        <nav className='navbar'>
            <h1 className='navbar__title'>Memorotes</h1>
            <div className='navbar__wrapper'>
                <GateBtn toggle={gateBtn} />
                <LogOutBtn toggle={logOutBtn} />
                <button className='navbar__btn'><i className='bx bxs-palette'></i></button>
            </div>
        </nav>
    );
}

export default Navbar;