import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseKeys = {
    apiKey: "AIzaSyAPzsxBpVyB--dz8XmF-cf_0FJwC5vgo9A",
    authDomain: "asapstudyportal.firebaseapp.com",
    projectId: "asapstudyportal",
    storageBucket: "asapstudyportal.appspot.com",
    messagingSenderId: "638627606104",
    appId: "1:638627606104:web:bf8accb2cb98358960e42d"
   }

// Initialize Firebase
const firebaseApp = initializeApp(firebaseKeys);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDb = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);
const firebaseFunctions = getFunctions(firebaseApp);
export { firebaseApp,firebaseAuth, firebaseDb, firebaseStorage, firebaseFunctions };
