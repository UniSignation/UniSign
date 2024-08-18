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
  apiKey: "AIzaSyBNO5W3g0dEcBT2SsOsRXqwXVC24_h2HBs",
  authDomain: "unisign-sumbit.firebaseapp.com",
  projectId: "unisign-sumbit",
  storageBucket: "unisign-sumbit.appspot.com",
  messagingSenderId: "611590544476",
  appId: "1:611590544476:web:b0c3d282f6c73dc3e75a99",
  measurementId: "G-L4YX1QXNSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
