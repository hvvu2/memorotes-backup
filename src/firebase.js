import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc
} from 'firebase/firestore';

// Firebase Init
const firebaseConfig = {
    apiKey: "AIzaSyD0z7F6rMrhiOhQ02YZUXDraAyxc6BSrr0",
    authDomain: "memorotes.firebaseapp.com",
    projectId: "memorotes",
    storageBucket: "memorotes.appspot.com",
    messagingSenderId: "778485683561",
    appId: "1:778485683561:web:f19016b64ac3babd6159f8",
    measurementId: "G-JNZWB5BY06"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Firebase Auth
const registerWithEmailAndPassword = async (name, email, pwd) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, pwd);
        const user = result.user;
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: name,
            email: email
        });
        return true;
    } catch (err) {
        return false;
    }
}

const logInWithEmailAndPassword = async (email, pwd) => {
    if (email, pwd) {
        try {
            await signInWithEmailAndPassword(auth, email, pwd);
            return true;
        } catch (err) {
            return false;
        }
    }
}

const logOut = () => {
    signOut(auth);
}

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logOut
};