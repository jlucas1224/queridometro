import { Link } from 'react-router-dom';
import { handleSignIn } from './Firebase/users';

function LoginScreen() {
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
                    <Link to="/create-user" style={{textDecoration: 'none'}}>Create User</Link>
                </label>
            </div>
        </div>
    );
}

export default LoginScreen;
