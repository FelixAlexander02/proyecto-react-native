import app from 'firebase/app';
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAgHPWio3unQwK7ZotWLKILADxjmpxd5D4",
    authDomain: "trabajo-final-prog3.firebaseapp.com",
    projectId: "trabajo-final-prog3",
    storageBucket: "trabajo-final-prog3.appspot.com",
    messagingSenderId: "142090268872",
    appId: "1:142090268872:web:6242ea9b7052631d90b5fd"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
