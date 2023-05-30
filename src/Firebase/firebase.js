import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCTVLDLjodIhWG6jX3h74w-Tw1z_seVSTk",
    authDomain: "queridometro-3e8f0.firebaseapp.com",
    projectId: "queridometro-3e8f0",
    storageBucket: "queridometro-3e8f0.appspot.com",
    messagingSenderId: "182785339284",
    appId: "1:182785339284:web:bafedea68cbab6e5b42981",
    measurementId: "G-KSQC0TFNPX"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

/**
 * @param {string} username 
 * @param {string} email 
 * @param {string} uid 
 */
export async function addUserDocument(username, email, uid) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
          username: username,
          email: email,
          uid: uid
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

