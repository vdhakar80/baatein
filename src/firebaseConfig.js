import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAvEf4yEpnUJ6nyUb7Nwj2r-Ll80pC1so",
  authDomain: "chat-app-3d58d.firebaseapp.com",
  projectId: "chat-app-3d58d",
  storageBucket: "chat-app-3d58d.appspot.com",
  messagingSenderId: "472500071541",
  appId: "1:472500071541:web:cfd0775abf504d804e9c3c",
  measurementId: "G-8XV89L03T8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export const authenticate = firebaseApp.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export default db;
