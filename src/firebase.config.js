import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCQQy0Lvcwpxn74y7D6P4XfLFZQXXoTRQc",
//   authDomain: "mystore-f00.firebaseapp.com",
//   databaseURL: "https://mystore-f00-default-rtdb.firebaseio.com",
//   projectId: "mystore-f00",
//   storageBucket: "mystore-f00.appspot.com",
//   messagingSenderId: "496111507537",
//   appId: "1:496111507537:web:d1c8a5439d653b71370070",
// };




const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage }