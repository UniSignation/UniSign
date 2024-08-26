// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
import { initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpR2e__8BSPuoLfjrMtN_lpQlGyvn757A",
  authDomain: "unisign-firebase-app.firebaseapp.com",
  projectId: "unisign-firebase-app",
  storageBucket: "unisign-firebase-app.appspot.com",
  messagingSenderId: "32882604580",
  appId: "1:32882604580:web:bf6c0724600cff905076b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
