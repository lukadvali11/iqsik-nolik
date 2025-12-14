import {useEffect} from "react";
import {useSocket} from "../socket.js";
import {useNavigate} from "react-router-dom";

export default function WaitingRoom() {
    const {socket} = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("game-started", (gameId) => {
            navigate(`/game/${gameId}`, {player: "X"});
        })
    }, [socket, navigate]);

    return <div>waiting for the opponent</div>
}