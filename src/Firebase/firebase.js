import { initializeApp } from "firebase/app";
import { doc, getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, updateDoc } from "firebase/firestore";

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
            uid: uid,
            cobra: 0,
            vomito: 0,
            sorriso: 0,
            coracao: 0,
            raiva: 0,
            coracao_partido: 0,
            bomba: 0,
            banana: 0,
            planta: 0,
            votedToday: false,
        });

    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function updateDate(date) {
    const dateRef = doc(db, "date", "dateNow")

    await updateDoc(dateRef, {
        date: date,
    })
}

async function resetUsersStatus(usersIds) {
    await usersIds.forEach(async (id) => {
        const userRef = doc(db, "users", id)
        await updateDoc(userRef, {
            votedToday: false,
            cobra: 0,
            vomito: 0,
            sorriso: 0,
            coracao: 0,
            raiva: 0,
            coracao_partido: 0,
            bomba: 0,
            banana: 0,
            planta: 0,
        })
    })
}

async function handleResetUsersStatus() {
    const usersRef = getDocs(collection(db, "users"))
    const usersIds = []

    await usersRef.then((querySnapshot) => {
        querySnapshot.docs.map(doc => {
            usersIds.push(doc.id)
        })
    })

    await resetUsersStatus(usersIds)
}

export async function validateDay() {
    let date = []
    const today = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`

    await getDocs(collection(db, "date")).then((querySnapshot) => {
        querySnapshot.docs.map(doc => doc.data())
        date = querySnapshot.docs.map(doc => doc.data())
    })

    if (date[0].date === today) return

    await updateDate(today)
    await handleResetUsersStatus()
}
