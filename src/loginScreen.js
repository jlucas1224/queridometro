import { Link } from 'react-router-dom';
import { handleSignIn } from './Firebase/users';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import { userState } from "./Firebase/users";
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
    const auth = getAuth()
    const navigate = useNavigate()

    async function getUsers() {
        const users = getDocs(collection(db, "users"))

        userState.users = []
 
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

    async function handleSignIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user

                localStorage.setItem('currentUserUid', user.uid)
                
                await getUsers()

                userState.users.find((user) => user.uid === localStorage.getItem('currentUserUid')).votedToday === true ? navigate('/queridometro/result') : navigate('/queridometro/vote')
            })
            .catch((error) => {
                console.error(error)
                alert(error.message)
            });
    }

    const SubmitLogin = async (e) => {
        e.preventDefault();

        const email = document.querySelector("#login-form .email-input").value;
        const password = document.querySelector("#login-form .password-input").value;
        
        handleSignIn(email, password)
    }

    return (
        <div className='register-box'>
            <form className='login' id="login-form" onSubmit={SubmitLogin}>
                <label>Login</label>

                <input className="email-input" type="text" placeholder='Email'/>
                <input className="password-input" type="password" placeholder='Senha'/>

                <input type="submit" value="Login"/>
            </form>
            <div className="login-button">
                <label>
                    <Link to="/queridometro/create-user" style={{textDecoration: 'none'}}>Create User</Link>
                </label>
            </div>
        </div>
    );
}

export default LoginScreen;
