// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app"
// // import { } from "firebase/a"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "hospital-cda26.firebaseapp.com",
//   projectId: "hospital-cda26",
//   storageBucket: "hospital-cda26.appspot.com",
//   messagingSenderId: "1009659914363",
//   appId: "1:1009659914363:web:8705bb3713bf0cd81a5ade",
// }

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig)


// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hospital-cda26.firebaseapp.com",
  projectId: "hospital-cda26",
  storageBucket: "hospital-cda26.appspot.com",
  messagingSenderId: "1009659914363",
  appId: "1:1009659914363:web:8705bb3713bf0cd81a5ade",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
