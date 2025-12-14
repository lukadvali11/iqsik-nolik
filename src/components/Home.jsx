import {useNavigate} from "react-router-dom";
import {useSocket} from "../socket.js";
import {useEffect, useState} from "react";

export default function Home() {
    const navigate = useNavigate();
    const {socket, isConnected} = useSocket();
    const [gameId, setGameId] = useState(null);

    useEffect(() => {
        if (!isConnected) {
          return
        }
        socket.on("game-created", (gameId) => {
            navigate(`/game/${gameId}/waiting`);
        });

        socket.on("game-started", (gameId) => {
            navigate(`/game/${gameId}`, {player: "O"})
        })

        return () => socket.off("game-started");
    }, [isConnected, socket, navigate]);

    const newGameHandler = () => {
        socket.emit("create-game", 1);
    }

    const joinGameHandler = () => {
        socket.emit("join-game", gameId)
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", rowGap: "20px"}}>
            <h1 style={{fontSize: "100px", color: "white"}}>Tic Tac Toe</h1>
            <button style={{
                cursor: "pointer",
                fontSize: "20px",
                backgroundColor: "orange",
                color: "black",
                padding: "20px 50px"
            }} onClick={newGameHandler}>New Game
            </button>
            <button disabled={!gameId}
                    style={{
                        cursor: "pointer",
                        fontSize: "20px",
                        backgroundColor: "orange",
                        color: "black",
                        padding: "20px 50px"
                    }} onClick={joinGameHandler}>Join Game
            </button>
            <div>
                <input
                    value={""}
                    onChange={(e) => setGameId(e.target.value)}
                />
            </div>
        </div>
    )
}



