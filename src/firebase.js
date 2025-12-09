import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBneuFOu5I89H-01xvMZFlMj71yYjg0zQI",
    authDomain: "hoccunget.firebaseapp.com",
    projectId: "hoccunget",
    storageBucket: "hoccunget.firebasestorage.app",
    messagingSenderId: "430560952804",
    appId: "1:430560952804:web:897d9f2381e41046bd87f1",
    measurementId: "G-6SNKC725HR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();