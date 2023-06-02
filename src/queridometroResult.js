import { useState } from "react"
import "./userQueridometro.css"

function QueridometroResult(data) {
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

    return (
        <div className="queridometro-box">
            <h2>{currentUser.username}</h2>
            {
                userEmojis.map((emoji) => {
                    if (emoji.emojiCount === 0) return
                    return <button className={`${currentUser.uid}-button emoji-button`} 
                    id={`${currentUser.uid}-${emoji.emojiName}`} 
                    key={emoji.emojiName}>
                        {emoji.emoji}
                        <p className="emoji-count">{emoji.emojiCount}</p>
                    </button>
                })
            }
        </div>
    )
}

export default QueridometroResult;
