import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, switchMethod } from '../../features/gateSlice.js';
import { hideGate } from '../../features/popupSlice.js';

function Login(props) {
    const dispatch = useDispatch();

    if (props.method == 'Login') {
        return (
            <div className='gate'>
                <div className='gate__wrapper'>
                    <p className='gate__txt'>Nothing is ever really lost to us as long as we remember it.</p>
                </div>
                <form className='gate__form'>
                    <h1 className='gate__method'>Login</h1>
                    <h1 className='gate__sub-title'>Welcome back!</h1>
                    <div className='gate__input-wrapper'>
                        <input className='gate__input' type='text' placeholder='Enter your e-mail'></input>
                        <input className='gate__input' type='password' placeholder='Enter your password'></input>
                    </div>
                    <button className='gate__submit' type='submit'>Login</button>
                    <button className='gate__link' type='button' onClick={() => dispatch(switchMethod())}>Not a member yet?</button>
                </form>
            </div>
        );
    }
}

function SignUp(props) {
    const dispatch = useDispatch();

    if (props.method == 'SignUp') {
        return (
            <div className='gate'>
                <form className='gate__form r'>
                    <h1 className='gate__method'>Sign Up</h1>
                    <h1 className='gate__sub-title r'>Nice to meet you!</h1>
                    <div className='gate__input-wrapper r'>
                        <input className='gate__input' type='text' placeholder='Enter your name'></input>
                        <input className='gate__input' type='text' placeholder='Enter your e-mail'></input>
                        <input className='gate__input' type='password' placeholder='Enter your password'></input>
                        <input className='gate__input' type='password' placeholder='Confirm your password'></input>
                    </div>
                    <button className='gate__submit' type='submit'>Sign Up</button>
                    <button className='gate__link' type='button' onClick={() => dispatch(switchMethod())}>Already have an account?</button>
                </form>
                <div className='gate__wrapper r'>
                    <p className='gate__txt'>The moments we share are the moments we keep forever.</p>
                </div>
            </div>
        );
    }
}

function Gate(props) {
    const dispatch = useDispatch();
    const method = useSelector((state) => state.gate.method);

    function onClose() {
        dispatch(hideGate());
        dispatch(reset());
    }

    if (props.toggle) {
        return (
            <div className='mask dim'>
                <div className='popup l'>
                    <Login method={method} />
                    <SignUp method={method} />
                    <button className='popup__close' onClick={onClose}></button>
                </div>
            </div>
        );
    }
}

export default Gate;