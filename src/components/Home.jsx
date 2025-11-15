import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const clickHandler = async () => {
        const response = await fetch('http://localhost:8080/api/game', {
            method: 'POST',
        });
        console.log(response);
        const game = await response.json();
        console.log(game);
        navigate(`/game/${game.id}/move/${game.boards.length - 1}`);
    }
    
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1 style={{fontSize: "100px", color: "white"}}>IQSIK-NOLIK</h1>
            <button style={{cursor: "pointer", fontSize: "20px", backgroundColor: "orange", color: "black", padding: "20px 50px"}}onClick={clickHandler}>New Game</button>
        </div>
    )
}



