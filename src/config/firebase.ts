import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { EmailAuthProvider, getAuth } from "firebase/auth";
import { config } from './firebase.config';

const firebaseConfig = {
    apiKey: config.firebaseConfig.apiKey,
    authDomain: config.firebaseConfig.authDomain,
    projectId: config.firebaseConfig.projectId,
    storageBucket: config.firebaseConfig.storageBucket,
    messagingSenderId: config.firebaseConfig.messagingSenderId,
    appId: config.firebaseConfig.appId,
};

let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const fireStoreProvider = new EmailAuthProvider();
const fireStoreDB = getFirestore(app);
const fireStoreAuth = getAuth(app);

export { fireStoreProvider, fireStoreAuth };
export default fireStoreDB;
