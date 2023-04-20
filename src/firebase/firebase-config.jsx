// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr7DJoRL6lpi48rVXcdUnRedqWfpg5Qb8",
  authDomain: "tesis-fc9b8.firebaseapp.com",
  projectId: "tesis-fc9b8",
  storageBucket: "tesis-fc9b8.appspot.com",
  messagingSenderId: "623261324838",
  appId: "1:623261324838:web:459ee94dcc1d939f0778e7",
  measurementId: "G-27SEQQC4LL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();


export {
    auth,
    googleAuthProvider
}