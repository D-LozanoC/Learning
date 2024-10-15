import { useState } from "react"
import confetti from "canvas-confetti"

import Square from "./components/Square.jsx"
import WinnerModal from "./components/WinnerModal.jsx"
import Board from "./components/Board.jsx"

import { TURNS } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"

function App() {
  // Creacion de estados
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  // Resetear es simplemente setear nuevamente los estados con los que iniciaba
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  // Actualización del board al hacer click en un cuadrado
  const updateBoard = (index) => {
    // Si ya esta lleno no actualiza la posicion del board
    if (board[index] || winner){ return;}

    // Actualización del board
    const newBoard = [...board]; // Los estados siempre se deben tratar como inmutables
    // Si el estado se muta puede haber problemas de renderizado
    newBoard[index] = turn;
    setBoard(newBoard)

    // Cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)

    // Checa si hay un ganador en el nuevo board
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner) // El seteo no es SINCRONO
    }else if (checkEndGame(newBoard)){
      setWinner(false) 
    }
  }



  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <Board board={board} updateBoard={updateBoard}/>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <section>
        <WinnerModal resetGame={resetGame} winner={winner}/>
      </section>
    </main>
  )
}

export default App
