import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export const authenticate = firebaseApp.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export default db;
