import { useState } from 'react';

// Componentes de iconos
const Trophy = () => <span className="text-xl">🏆</span>;
const Users = () => <span className="text-2xl">👥</span>;

function App() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = (newBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  };

  const handleCellClick = (index) => {
    if (board[index] || gameOver) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      setScores(prev => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
    } else if (newBoard.every(cell => cell !== '')) {
      setWinner('tie');
      setGameOver(true);
      setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
  };

  const resetAll = () => {
    resetGame();
    setScores({ X: 0, O: 0, ties: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#161339] to-[#24243e] flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 max-w-lg w-full">

        {/* Título del juego */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2 drop-shadow-lg">
            <Users />
            Tres en línea
          </h1>
          <p className="text-cyan-300 text-lg">¡Consigue 3 en línea para ganar!</p>
        </div>

        {/* Marcador de puntuaciones */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-cyan-500/20 rounded-lg p-3 border border-cyan-400/30">
            <div className="text-cyan-300 text-sm font-medium">Jugador X</div>
            <div className="text-2xl font-bold text-white">{scores.X}</div>
          </div>
          <div className="bg-gray-500/20 rounded-lg p-3 border border-gray-400/30">
            <div className="text-gray-300 text-sm font-medium">Empates</div>
            <div className="text-2xl font-bold text-white">{scores.ties}</div>
          </div>
          <div className="bg-pink-500/20 rounded-lg p-3 border border-pink-400/30">
            <div className="text-pink-300 text-sm font-medium">Jugador O</div>
            <div className="text-2xl font-bold text-white">{scores.O}</div>
          </div>
        </div>

        {/* Indicador de turno actual */}
        <div className="text-center mb-6">
          {!gameOver ? (
            <p className="text-xl text-white">
              Turno del jugador:
              <span className={`font-bold ml-2 ${currentPlayer === 'X' ? 'text-cyan-400' : 'text-pink-400'}`}>
                {currentPlayer}
              </span>
            </p>
          ) : (
            <div className="flex items-center justify-center gap-2 text-xl">
              <Trophy />
              <span className="text-white font-bold">
                {winner === 'tie' ? '¡Empate!' : `¡Ganador: ${winner}!`}
              </span>
            </div>
          )}
        </div>

        {/* Tablero de juego */}
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-3 gap-3">
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                disabled={gameOver || cell}
                className={`
                  w-20 h-20 text-3xl font-bold rounded-lg border-2 transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                  ${cell ? 'cursor-not-allowed' : 'hover:bg-cyan-600/20 cursor-pointer hover:scale-110 active:scale-95'}
                  ${cell === 'X'
                    ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200'
                    : cell === 'O'
                      ? 'bg-pink-500/30 border-pink-400 text-pink-200'
                      : 'bg-white/5 border-white/20 text-white hover:border-white/50'
                  }
                `}
              >
                {cell}
              </button>
            ))}
          </div>
        </div>

        {/* Botones de control */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={resetGame}
            className="flex-1 sm:flex-none flex items-center justify-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 
                     text-white rounded-lg transition-all duration-300 font-medium
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 min-w-[150px]"
          >
            Nueva Partida
          </button>

          <button
            onClick={resetAll}
            className="flex-1 sm:flex-none flex items-center justify-center px-6 py-3 bg-pink-600 hover:bg-pink-700 
                     text-white rounded-lg transition-all duration-300 font-medium
                     focus:outline-none focus:ring-2 focus:ring-pink-400 min-w-[150px]"
          >
            Reiniciar Todo
          </button>
        </div>

        {/* Explicación de cómo jugar */}
        <div className="text-center text-sm text-cyan-200 space-y-1">
          <p className="flex items-center justify-center gap-2">
            <span>🎯</span>
            Haz clic en una casilla vacía para colocar tu símbolo
          </p>
          <p className="flex items-center justify-center gap-2">
            <span>🏆</span>
            Consigue 3 símbolos en línea para ganar
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;
