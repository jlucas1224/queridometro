import { updateUserDocument, updateVotedToday, userState } from "./Firebase/users";
import { db } from "./Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import UserQueridometro from "./userQueridometro"; 
import { useNavigate } from "react-router-dom";

function Queridometro() {
    const currentUserUid = localStorage.getItem('currentUserUid')
    const navigate = useNavigate();
    const users =  getDocs(collection(db, "users"))
    const [usersInfo, setUsersInfo] = useState([])

    useEffect(() => {
        initializePage()
    }, [])

    async function initializePage() {
        await handleSetUserInfo()
        validateVote()
    }

    async function handleSetUserInfo() {
        setUsersInfo(userState.users)
    }

    function validateVote() {
        const currentUser = userState.users.find(user => user.uid === currentUserUid)
        
        if (!currentUser.votedToday) return

        navigate('/queridometro/result')
    }

    async function confirmQueridometro() {
        let votes = 0
        const usersLenght = userState.users.length
        const currentUser = userState.users.find(user => user.uid === currentUserUid)
        const currentUserId = currentUser.id

        userState.users.forEach((user) => {
            if (user.uid === currentUserUid) return

            votes += user.vote
        })

        if (votes !== usersLenght - 1) return alert('Você não votou em todos os usuários!')

        userState.users.forEach(async (user) => {
            if (user.uid === currentUserUid) return

            await updateUserDocument(user.id, user.uid, user.votedOn)
        })

        await updateVotedToday(currentUserId)

        navigate('/queridometro/result')
    }

    return (
        <div>
            {
                usersInfo.map((user) => {
                    if (user.uid === currentUserUid) return

                    return <UserQueridometro user={user} key={user.uid}/>
                })
            }
            <button className="confirm-queridometro" onClick={confirmQueridometro}>
                Confirmar
            </button>
        </div>
    );
}

export default Queridometro;
