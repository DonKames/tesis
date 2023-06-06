// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCnxZ_G4DbMy3mouzH6OAq0wj1DTWz8ccs',
    authDomain: 'tesis-7339f.firebaseapp.com',
    projectId: 'tesis-7339f',
    storageBucket: 'tesis-7339f.appspot.com',
    messagingSenderId: '889854801490',
    appId: '1:889854801490:web:bf35abf3caadbd34fc118b',
    measurementId: 'G-B7X2188NGW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

export { auth, googleAuthProvider, firebaseConfig };
