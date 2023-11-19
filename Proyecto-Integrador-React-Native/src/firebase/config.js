import app from 'firebase/app';
import firebase from 'firebase';

// configuracion para entrega final

// const firebaseConfig = {
//     apiKey: "AIzaSyAgHPWio3unQwK7ZotWLKILADxjmpxd5D4",
//     authDomain: "trabajo-final-prog3.firebaseapp.com",
//     projectId: "trabajo-final-prog3",
//     storageBucket: "trabajo-final-prog3.appspot.com",
//     messagingSenderId: "142090268872",
//     appId: "1:142090268872:web:6242ea9b7052631d90b5fd"
//   };

// configuracion para desarrollo
// const firebaseConfig = {
//   apiKey: "AIzaSyDvR0-3CXDImrRahYi4Ddfg7O4uUwjPdSI",
//   authDomain: "desarrollo-de-blog.firebaseapp.com",
//   projectId: "desarrollo-de-blog",
//   storageBucket: "desarrollo-de-blog.appspot.com",
//   messagingSenderId: "1009733647277",
//   appId: "1:1009733647277:web:bd180355f5d10f43c0ff24"
// };

// Configuracion Andres
const firebaseConfig = {
  apiKey: "AIzaSyDQfzlZrEb4nnAN_UT8T1AP_1Lyntb8j2k",
  authDomain: "blog-52e28.firebaseapp.com",
  projectId: "blog-52e28",
  storageBucket: "blog-52e28.appspot.com",
  messagingSenderId: "333038874022",
  appId: "1:333038874022:web:01489221935107f0beb367"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
