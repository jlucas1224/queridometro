import { userState } from "./Firebase/users";
import { db } from "./Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import QueridometroResult from "./queridometroResult";

function Result() {
    const users =  getDocs(collection(db, "users"))
    const [usersInfo, setUsersInfo] = useState([])
    const [waiting, setWaiting] = useState(false)

    useEffect(() => {
        initializePage()
    }, [])
    
    async function initializePage() {
        await handleSetUsersInfo()

        validateVote()
    }


    async function handleSetUsersInfo() {
        userState.users = []

        await users.then((querySnapshot) => {
            querySnapshot.docs.map(doc => {
                userState.users.push(doc.data())
                userState.users.forEach((user) => {
                    if (user.uid === doc.data().uid) {
                        user.id = doc.id
                    }
                })
                setUsersInfo(userState.users)
            })
        })
    }

    function validateVote() {
        const userDidntVote = userState.users.filter((user) => user.votedToday === false)

        if (userDidntVote.length === 0) return
        
        setWaiting(true)
    }

    return (
        <div>
            {
                waiting ? 
                    <div className="loading-container">
                        <div className="loading-text">
                            <span>E</span>
                            <span>S</span>
                            <span>P</span>
                            <span>E</span>
                            <span>R</span>
                            <span>A</span>
                            <span>N</span>
                            <span>D</span>
                            <span>O</span>
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </div>
                        <p className="waiting-label">Cobra a galera lá no zap 👍</p>
                    </div> 
                    :
                    usersInfo.map((user) => {
                        return <QueridometroResult user={user} key={user.uid}/>
                    })
            }
        </div>
    );
}

export default Result;
