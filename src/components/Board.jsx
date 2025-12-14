import {useEffect, useState} from "react";
import {useSocket} from "../socket.js";

export default function Board({player, xIsNext, squares, onPlay, id, winner, isFinished}) {
  const {socket} = useSocket();
  const [statement, setStatement] = useState(null);

  useEffect(() => {
    socket.on("move-made", (game) => {
      onPlay(game.boards[game.boards.length - 1].board, game.isFinished, game.winner)
    });
  }, [socket, onPlay]);

  async function handleClick(position) {
    if (xIsNext !== (player === "X")) {
      setStatement("It is not your turn");
      return;
    }
    if (isFinished) {
      if (winner === "X" || winner === "O") {
        setStatement(`Game Is Finished. Winner is: ${winner}`);
      } else {
        setStatement("Game Finished As Draw");
      }
      return;
    }

    if (squares[position] !== "N") {
      setStatement(`Position ${position} Is Already Occupied`);
      return;
    }

    if (statement) {
      setStatement(null);
    }
    socket.emit("make-move", id, position);
  }

  const winnerSymbol = calculateWinner(squares);
  let status;
  if (winnerSymbol) {
    status = 'Winner: ' + winnerSymbol;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div style={{
      width: "400px",
      height: "400px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      {status.includes("Winner") && (<div style={{color: "green", padding: "10px"}} className="status">{status}</div>)}
      {status.includes("Next") && (<div style={{color: "white", padding: "10px"}} className="status">{status}</div>)}

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
      <div style={{color: "red", padding: "20px"}}>{statement}</div>
    </div>
  );
}

export function Square({value, onSquareClick}) {
  return (
    <button style={{
      backgroundColor: "black",
      color: "white",
      border: "1.5px solid grey",
      width: "100px",
      height: "100px",
      fontSize: "50px",
    }}
            className="square" onClick={onSquareClick}>
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