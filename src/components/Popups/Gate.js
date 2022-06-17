import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, switchMethod, login, fetchUserName } from '../../features/gateSlice.js';
import { hideCreateUI, hideReadUI, hideUpdateUI, hideDeleteUI } from '../../features/noteSlice.js';
import { hideAlert } from '../../features/popupSlice.js';
import { hideGate } from '../../features/popupSlice.js';
import { auth, registerWithEmailAndPassword, logInWithEmailAndPassword } from '../../firebase.js';

const namePattern = /^.{2,24}$/;
const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})$/;
const pwdPattern = /^.{1,}$/;

function Message(props) {
    if (props.method === 'Login') {
        return <p className='gate__msg err'>{props.msg}</p>;
    } else {
        if (props.msg === 'Welcome to Memorotes!') {
            return <p className='gate__msg ok r'>{props.msg}</p>;
        } else {
            return <p className='gate__msg err r'>{props.msg}</p>;
        }
    }
}

function Login(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('guest@guest.gst');
    const [pwd, setPwd] = useState('000000');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (msg) {
            setTimeout(() => {
                setMsg('');
            }, 2500);
        }
    });

    async function onLogin(e) {
        e.preventDefault();
        if (emailPattern.test(email) && pwdPattern.test(pwd)) {
            if (await logInWithEmailAndPassword(email, pwd)) {
                const uid = auth.currentUser.uid;
                const rawSignUpDate = new Date(auth.currentUser.metadata.creationTime).toISOString();
                const signUpDate = rawSignUpDate.substring(0, 10);

                dispatch(fetchUserName({uid}));
                dispatch(login({uid, signUpDate}));
                dispatch(hideGate());
                dispatch(hideCreateUI());
                dispatch(hideReadUI());
                dispatch(hideUpdateUI());
                dispatch(hideDeleteUI());
                dispatch(hideAlert());
            } else {
                setMsg('Oops! The e-mail or the password is wrong.');
            }
        } else {
            setMsg('Uh-uh... Please check if the fields are filled correctly.');
        }
    }

    if (props.method == 'Login') {
        return (
            <div className='gate'>
                <div className='gate__wrapper'>
                    <p className='gate__txt'>Nothing is ever really lost to us as long as we remember it.</p>
                </div>
                <form className='gate__form' onSubmit={(e) => onLogin(e)}>
                    <h1 className='gate__method'>Login</h1>
                    <h1 className='gate__sub-title'>Welcome back!</h1>
                    <div className='gate__input-wrapper'>
                        <input className='gate__input' name='email' type='text' defaultValue={'guest@guest.gst'} placeholder='Enter your e-mail' onChange={(e) => setEmail(e.target.value)}></input>
                        <input className='gate__input' name='pwd' type='password' defaultValue={'000000'} placeholder='Enter your password' onChange={(e) => setPwd(e.target.value)}></input>
                    </div>
                    <Message method={props.method} msg={msg} />
                    <button className='gate__submit' type='submit'>Login</button>
                    <button className='gate__link' type='button' onClick={() => dispatch(switchMethod())}>Not a member yet?</button>
                </form>
            </div>
        );
    }
}

function SignUp(props) {
    const dispatch = useDispatch();
    const form = useRef(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [rePwd, setRePwd] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (msg) {
            setTimeout(() => {
                setMsg('');
            }, 2500);
        }
    });

    async function onSignUp(e) {
        e.preventDefault();
        if (namePattern.test(name) && emailPattern.test(email) && pwdPattern.test(pwd) && rePwd === pwd) {
            if (await registerWithEmailAndPassword(name, email, pwd)) {
                setMsg('Welcome to Memorotes!');
                form.current.reset();
            } else {
                setMsg('Uh-oh! This e-mail has been registered.');
            }
        } else if (rePwd != pwd) {
            setMsg('Oh... The confirm password does not match.');
        } else {
            setMsg('Oops... Please check if the fields are filled correctly.');
        }
    }

    if (props.method == 'SignUp') {
        return (
            <div className='gate'>
                <form className='gate__form r' ref={form} onSubmit={(e) => onSignUp(e)}>
                    <h1 className='gate__method'>Sign Up</h1>
                    <h1 className='gate__sub-title r'>Nice to meet you!</h1>
                    <div className='gate__input-wrapper r'>
                        <input className='gate__input' name='name' type='text' placeholder='Enter your name (2 - 24 characters)' maxLength='24' onChange={(e) => setName(e.target.value)} />
                        <input className='gate__input' name='email' type='text' placeholder='Enter your e-mail' onChange={(e) => setEmail(e.target.value)} />
                        <input className='gate__input' name='pwd' type='password' placeholder='Enter your password (at least 6 characters)' onChange={(e) => setPwd(e.target.value)} />
                        <input className='gate__input' name='rePwd' type='password' placeholder='Confirm your password' onChange={(e) => setRePwd(e.target.value)} />
                    </div>
                    <Message method={props.method} msg={msg} />
                    <button className='gate__submit r' type='submit'>Sign Up</button>
                    <button className='gate__link r' type='button' onClick={() => dispatch(switchMethod())}>Already have an account?</button>
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
                    <button className='popup__close' onClick={onClose}><i className='bx bx-x'></i></button>
                </div>
            </div>
        );
    }
}

export default Gate;