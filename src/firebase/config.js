
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD5Y2SQRDC9zu0UFJjCvjXwVxPabrIK1o",
  authDomain: "disney-app-c8fd4.firebaseapp.com",
  projectId: "disney-app-c8fd4",
  storageBucket: "disney-app-c8fd4.appspot.com",
  messagingSenderId: "403465037804",
  appId: "1:403465037804:web:023db7d7d7044ddd47c2c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})
export const db = getFirestore(app);