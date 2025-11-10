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
        <button onClick={clickHandler}>New Game</button>
    )
}



