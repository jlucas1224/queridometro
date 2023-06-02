import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addUserDocument } from "./firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const userState = {
    users: [],
}

const auth = getAuth();

export function handleCreateUser(username, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) =>{
            const user = userCredential.user;

            await addUserDocument(username, email, user.uid);

            window.location.href = '/login'
        })
        .catch((error) => {
            console.error(error.message)
            alert(error.message)
        })
}

export async function handleSignIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user

            localStorage.setItem('currentUserUid', user.uid)
            
            await getUsers()

            userState.users.find((user) => user.uid === localStorage.getItem('currentUserUid')).votedToday === true ? window.location.href = '/queridometro/result' : window.location.href = '/queridometro/vote'
        })
        .catch((error) => {
            console.error(error)
            alert(error.message)
        });
}

export async function getUsers() {
    const users = getDocs(collection(db, "users"))
    await users.then((querySnapshot) => {
        querySnapshot.docs.map(doc => {
            userState.users.push(doc.data())
            userState.users.forEach((user) => {
                if (user.uid === doc.data().uid) {
                    user.id = doc.id
                }
            })
        })
    })
}

export async function updateUserDocument(id ,uid, emojisVoted) {
    const usersRef = doc(db, "users", id)
    let users = []

    await getDocs(collection(db, "users")).then((querySnapshot) => {
        querySnapshot.docs.map(doc => doc.data())
        users = querySnapshot.docs.map(doc => doc.data())
    })

    const userToUpdate = users.find((user) => user.uid === uid)

    await updateDoc(usersRef, {
        banana: emojisVoted === "banana" ? userToUpdate.banana + 1 : userToUpdate.banana,
        bomba: emojisVoted === "bomba" ? userToUpdate.bomba + 1 : userToUpdate.bomba,
        cobra: emojisVoted === "cobra" ? userToUpdate.cobra + 1 : userToUpdate.cobra,
        coracao: emojisVoted === "coracao" ? userToUpdate.coracao + 1 : userToUpdate.coracao,
        coracao_partido: emojisVoted === "coracao_partido" ? userToUpdate.coracao_partido + 1 : userToUpdate.coracao_partido,
        planta: emojisVoted === "planta" ? userToUpdate.planta + 1 : userToUpdate.planta,
        raiva: emojisVoted === "raiva" ? userToUpdate.raiva + 1 : userToUpdate.raiva,
        sorriso: emojisVoted === "sorriso" ? userToUpdate.sorriso + 1 : userToUpdate.sorriso,
        vomito: emojisVoted === "vomito" ? userToUpdate.vomito + 1 : userToUpdate.vomito,
    })
}

export async function updateVotedToday(id) {
    const usersRef = doc(db, "users", id)

    await updateDoc(usersRef, {
        votedToday: true
    })
}
