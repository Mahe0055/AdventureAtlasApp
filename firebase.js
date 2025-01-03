// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUN1voAqmA2iNHRMADBGpw1073jT3baKU",
  authDomain: "adventureatlas-68eac.firebaseapp.com",
  projectId: "adventureatlas-68eac",
  storageBucket: "adventureatlas-68eac.firebasestorage.app",
  messagingSenderId: "14307198427",
  appId: "1:14307198427:web:7990c8e874e70cbe1953fe",
};

// Initialiserer Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export { app, database };

// Initialiserer Auth
export const auth =
  Platform.OS === "web"
    ? getAuth(app) // Hvis Platform er web, intialiseres 'getAuth'
    : initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      }); // Hvis Platform er Android/IOS, bruges AnsyncStorage
