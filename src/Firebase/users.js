import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addUserDocument } from "./firebase";
const auth = getAuth();

export function handleCreateUser(username, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) =>{
            const user = userCredential.user;

            await addUserDocument(username, email, user.uid);
            console.log(user)
            console.log('Mudar de tela')
        })
        .catch((error) => {
            console.error(error)
        })
}
