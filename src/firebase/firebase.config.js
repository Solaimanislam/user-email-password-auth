// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpgi8K6mdOAd0ITh6zYrDN_nrDtei7iCI",
  authDomain: "user-email-password-auth-aff06.firebaseapp.com",
  projectId: "user-email-password-auth-aff06",
  storageBucket: "user-email-password-auth-aff06.appspot.com",
  messagingSenderId: "796575511603",
  appId: "1:796575511603:web:6dfdeb64f8642dc53a9f46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;