import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from './Board';

export default function Game() {
  const [isFinished, setIsFinished] = useState(false);
  const [winner, setWinner] = useState('N');
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const {id, number} = useParams();
  const [currentMove, setCurrentMove] = useState(number);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  useEffect(() => {
    async function fetchGame() {
      const response = await fetch(`http://localhost:8080/api/game/${id}`);
      const game = await response.json();
      const boards = game.boards.map(board => board.board)
      setHistory(boards);
      setIsFinished(game.finished);
      setWinner(game.winner);
    }

    fetchGame();
  }, [])

  function handlePlay(nextSquares, isFinished, winner) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setIsFinished(isFinished);
    setWinner(winner);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button style={{width: "130px", padding: "10px",}} onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} 
        squares={currentSquares} onPlay={handlePlay} move={currentMove} 
        id={id} winner={winner} isFinished={isFinished}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}