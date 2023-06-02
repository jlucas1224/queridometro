import { Link } from 'react-router-dom';
import './createUserScreen.css'
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addUserDocument } from "./Firebase/firebase";

function CreateUserScreen() {
    const auth = getAuth();
    const navigate = useNavigate();
    
    function handleCreateUser(username, email, password) {
    
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) =>{
                const user = userCredential.user;
                console.log('Usuário criado com sucesso!')
    
                await addUserDocument(username, email, user.uid);
    
                navigate('/queridometro/login')
            })
            .catch((error) => {
                console.error(error.message)
                alert(error.message)
            })
    }

    const SubmitCreateUser = async (e) => {
        e.preventDefault();

        const username = document.querySelector("#create-user-form .username-input").value;
        const email = document.querySelector("#create-user-form .email-input").value;
        const password = document.querySelector("#create-user-form .password").value;
        const confirmPassword = document.querySelector("#create-user-form .confirm-password").value;
        
        if (password !== confirmPassword) return alert("Senhas não coincidem")
        
        handleCreateUser(username, email, password)
    }

    return (
        <div className="register-box">
            <form className="login" id="create-user-form" onSubmit={SubmitCreateUser}>
                <label>Create User</label>

                <input className="email-input" placeholder="Email" type="text"/>
                <input className="username-input" placeholder="Username" type="text"/>
                <input className="password" placeholder="Password" type="password"/>
                <input className="confirm-password" placeholder="Confirm password" type="password"/>
                <input type="submit" value="Create user"/>
            </form>

            <div className="register-button">
                <label>
                    <Link to="/queridometro/login" style={{textDecoration: 'none'}}>Login</Link>
                </label>
            </div>
        </div>
    )
}

export default CreateUserScreen;
