import { handleCreateUser } from "./Firebase/users";

function CreateUserScreen() {
    const submitCreateUser = (e) => {
        e.preventDefault();

        const username = document.querySelector("#create-user-form .username-input").value;
        const email = document.querySelector("#create-user-form .email-input").value;
        const password = document.querySelector("#create-user-form input[type=password]").value;
        
        handleCreateUser(username, email, password)
    };

    return (
        <div>
            <form id="create-user-form" onSubmit={submitCreateUser}>
                <h1>Create User</h1>

                <label>Email</label>
                <input className="email-input" type="text"/>

                <label>Username</label>
                <input className="username-input" type="text"/>

                <label>Password</label>
                <input type="password"/>

                <input type="submit"/>
            </form>
        </div>
    );
}

export default CreateUserScreen;
