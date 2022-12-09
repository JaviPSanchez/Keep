import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDING_IP,
  appId: process.env.REACT_APP_ID,
};

//Init firebase
const app = initializeApp(firebaseConfig);

//Init firestore
const db = getFirestore(app);

//Init firebase Auth
const auth = getAuth();

//Init firebase storage
const storage = getStorage(app);

export { db, auth, storage };
