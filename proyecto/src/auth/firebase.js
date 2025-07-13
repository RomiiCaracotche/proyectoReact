import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiqzDP75bKgn6d3RqOybcijDPQ8Dt4ldw",
  authDomain: "react-840b5.firebaseapp.com",
  projectId: "react-840b5",
  storageBucket: "react-840b5.firebasestorage.app",
  messagingSenderId: "327712446436",
  appId: "1:327712446436:web:bcee0da0898ee0e82099f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export function crearUsuario(email, password) {
  return(
    new Promise((res, rej) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          res(user)
        })
        .catch((error) => {
          console.log(error.code, error.message)
          const errorCode = error.code;
          const errorMessage = error.message;
          rej(error)
        });
    })
  )
}

export function loginEmailPass(email, password) {
  return(
    new Promise((res, rej) => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        res(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        rej(error)
      })
    })
  )
}
