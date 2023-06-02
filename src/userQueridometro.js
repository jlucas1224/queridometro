import { useEffect, useState } from "react"
import { userState } from "./Firebase/users";
import "./userQueridometro.css"

function UserQueridometro(data) {
    const currentUser = data.user
    const [userEmojis, setUserEmojis] = useState([
        { emoji: "🐍", emojiName: "cobra", emojiCount: currentUser.cobra, voted: 0 },
        { emoji: "🤮", emojiName: "vomito", emojiCount: currentUser.vomito, voted: 0 },
        { emoji: "😃", emojiName: "sorriso", emojiCount: currentUser.sorriso, voted: 0 },
        { emoji: "💖", emojiName: "coracao", emojiCount: currentUser.coracao, voted: 0 },
        { emoji: "😠", emojiName: "raiva", emojiCount: currentUser.raiva, voted: 0 },
        { emoji: "💔", emojiName: "coracao_partido", emojiCount: currentUser.coracao_partido, voted: 0 },
        { emoji: "💣", emojiName: "bomba", emojiCount: currentUser.bomba, voted: 0 },
        { emoji: "🍌", emojiName: "banana", emojiCount: currentUser.banana, voted: 0 },
        { emoji: "🌳", emojiName: "planta", emojiCount: currentUser.planta, voted: 0 },
    ])

    function handleSelectButton(emojiName) {
        const button = document.getElementById(`${currentUser.uid}-${emojiName}`)
        const buttons = document.getElementsByClassName(`${currentUser.uid}-button`)

        if (button.classList.contains("selected-button")) {
            button.classList.remove("selected-button")
            return
        }
        else {
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove("selected-button")
            }

            button.classList.add("selected-button")
        }

    }

    const clickEmoji = (emojiName) => {
        handleSelectButton(emojiName)

        userEmojis.forEach((emoji) => {
            if (emoji.emojiName === emojiName) {

                setUserEmojis((emojis) => {
                    return emojis.map((emoji) => {
                        if (emoji.emojiName === emojiName && emoji.voted === 0) {
                            return { ...emoji, emojiCount: emoji.emojiCount + 1, voted: 1 }
                        }

                        if (emoji.voted === 1) {
                            return { ...emoji, emojiCount: emoji.emojiCount - 1, voted: 0 }
                        }

                        return emoji
                    })
                })
            }
        })
    }

    function updateUserState() {
        userState.users.forEach((user) => {
            if (user.uid !== currentUser.uid) return

            userEmojis.forEach((emoji) => {
                if (emoji.voted === 0) return
                
                userState.users.find((user) => user.uid === currentUser.uid).votedOn = emoji.emojiName
            })
        })
    }

    useEffect(() => {
        updateUserState()

        const votado = userEmojis.find((emoji) => {
            if (emoji.voted === 1) return true
            return false
        })

        userState.users.find((user) =>  user.uid === currentUser.uid).vote = votado ? 1 : 0
    },[userEmojis])

    return (
        <div className="queridometro-box">
            <h2>{currentUser.username}</h2>
            {
                userEmojis.map((emoji) => {
                    return <button className={`${currentUser.uid}-button emoji-button`} id={`${currentUser.uid}-${emoji.emojiName}`} onClick={() => clickEmoji(emoji.emojiName)} key={emoji.emojiName}>{emoji.emoji}</button>
                })
            }
        </div>
    )
}

export default UserQueridometro;
