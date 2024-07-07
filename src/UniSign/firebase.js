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
  apiKey: "AIzaSyCkPgebkz9YZmAs1WxsFgrv96LB5yYkuHk",
  authDomain: "webrtc-b2b55.firebaseapp.com",
  projectId: "webrtc-b2b55",
  storageBucket: "webrtc-b2b55.appspot.com",
  messagingSenderId: "1041844621928",
  appId: "1:1041844621928:web:f003b02334bec7824ae1dd",
  measurementId: "G-P90E07JW3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
