import React from 'react';
import { useDispatch } from 'react-redux';
import { showGate } from '../../features/popupSlice.js'

function Navbar() {
    const dispatch = useDispatch();

    return (
        <nav className='navbar'>
            <h1 className='navbar__title'>Memorotes</h1>
            <div className='navbar__wrapper'>
                <button className='navbar__btn' onClick={() => dispatch(showGate())}><i className='bx bxs-user-circle'></i></button>
                <button className='navbar__btn'><i className='bx bxs-palette'></i></button>
            </div>
        </nav>
    );
}

export default Navbar;