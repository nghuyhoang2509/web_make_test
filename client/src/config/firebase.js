// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7k7hXhVZz5wVY8biXEUZLUbIw5fuZsew",
  authDomain: "testmaker-4bf4e.firebaseapp.com",
  projectId: "testmaker-4bf4e",
  storageBucket: "testmaker-4bf4e.appspot.com",
  messagingSenderId: "151668384144",
  appId: "1:151668384144:web:c18767ae98a4f995511315",
  measurementId: "G-QRM18V7JGG"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };