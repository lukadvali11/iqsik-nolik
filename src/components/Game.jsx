import {useState} from "react";
import {useParams, useLocation} from "react-router-dom";
import Board from './Board';

export default function Game() {
  const [isFinished, setIsFinished] = useState(false);
  const [winner, setWinner] = useState('N');
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const {id} = useParams();
  const {player} = useLocation();
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

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
        <Board player={player} xIsNext={xIsNext}
               squares={currentSquares} onPlay={handlePlay} move={currentMove}
               id={id} winner={winner} isFinished={isFinished}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}