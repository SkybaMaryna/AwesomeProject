import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC3JJlSf0yo27_bvrnf8WeZVKLNySrrfYo",
    authDomain: "awesomeproject-1506c.firebaseapp.com",
    databaseURL: "https://awesomeproject-1506c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "awesomeproject-1506c",
    storageBucket: "awesomeproject-1506c.appspot.com",
    messagingSenderId: "633787323044",
    appId: "1:633787323044:web:833fc05ebda039e9474c31",
    measurementId: "G-HDK8H5J2J2"
  };
 
  const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
