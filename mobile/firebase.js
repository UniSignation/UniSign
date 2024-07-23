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
  apiKey: "AIzaSyAiWGxgwR651SGdheIiCtElFIeiXEz0kZo",
  authDomain: "unisign-c97e3.firebaseapp.com",
  projectId: "unisign-c97e3",
  storageBucket: "unisign-c97e3.appspot.com",
  messagingSenderId: "101276057076",
  appId: "1:101276057076:web:7601d7e4424f98939f4da1",
  measurementId: "G-2FERBXVCW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
