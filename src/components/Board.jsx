import { useState } from "react";

export default function Board({ xIsNext, squares, onPlay, move, id, winner, isFinished}) {
  const [statement, setStatement] = useState(null);

  async function handleClick(i) {
    if(isFinished) {
      if(winner === "X" || winner === "O" ) {
        setStatement(`Game Is Finished. Winner is: ${winner}`);
      } else {
        setStatement("Game Finished As Draw");
      }
      return null;
    }

    if (squares[i] !== "N"){
      setStatement(`Position ${i} Is Already Occupied`);
      return null;
    }

    if (statement) {
      setStatement(null);
    }
    const response = await fetch(`http://localhost:8080/api/game/${id}?move=${++move}&position=${i}`, {
      method: 'PUT',
      });
    const updatedGame = await response.json();
    console.log(updatedGame);
    isFinished = updatedGame.finished;
    winner = updatedGame.winner;
    console.log(isFinished, winner);
    const nextSquares = updatedGame.boards[updatedGame.boards.length - 1].board;
    onPlay(nextSquares, isFinished, winner);
  }

  const winnerSymbol = calculateWinner(squares);
  let status;
  if (winnerSymbol) {
    status = 'Winner: ' + winnerSymbol;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div>{statement}</div>
    </>
  );
}

export function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value === 'N' ? null : value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] !== 'N' && squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}