// The Game Board
const gameBoard = (() => {
  // Init board with positions
  let _board = Array(9).fill(0);

  // Indices for valid lines
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

  // Init line values
  let lineValues = Array(8)
    .fill(null)
    .map(() => Array(3).fill(0));

  // Reset line values to all 0
  const _resetLineValues = () => {
    lineValues.forEach((line, index) => {
      line.forEach((value, i) => (lineValues[index][i] = 0));
    });
  };

  // Set line values to corresponding board value
  const _setLineValues = (position) => {
    lines.forEach((line, i) => {
      if (line.includes(position)) {
        const index = line.indexOf(position);
        lineValues[i][index] = _board[position];
      }
    });
    return lineValues;
  };

  // Set board position if empty
  const updateBoard = (position, player) => {
    if (!_board[position]) {
      _board[position] = player;
      return _setLineValues(parseInt(position));
    }
  };

  // Reset the whole game
  const resetGame = () => {
    _board.forEach((e, i) => (_board[i] = 0));
    _resetLineValues();
  };

  return { resetGame, updateBoard };
})();

// The Players
const Player = (player) => {
  // Play method updates and marks board display
  play = (target, position) => {
    const lineValues = gameBoard.updateBoard(position, player);
    if (lineValues) {
      target.textContent = player === 1 ? "X" : "O";
    }
    return lineValues;
  };
  return { play };
};

// The GameMaster
const gameMaster = (() => {
  const restart = document.querySelector(".restart");
  const squares = document.querySelectorAll(".square");
  const display = document.querySelector(".display");

  let turn = 1;
  let isGameOver = false;
  // Init players
  const player1 = Player(1);
  const player2 = Player(2);

  // End the game, display winner or tie
  function _endGame(winner) {
    const text = winner ? `Player ${winner} wins!` : `It's a tie!`;
    _showDisplay(text);
    isGameOver = true;
  }

  // Activate the display, disappears after 2 seconds
  function _showDisplay(text) {
    display.textContent = text;
    display.classList.add("active");
    setTimeout(() => display.classList.remove("active"), 2000);
  }

  // Restart button callback, reset all
  function _restartGame() {
    turn = 1;
    squares.forEach((square) => (square.textContent = ""));
    gameBoard.resetGame();
    isGameOver = false;
  }

  // Get player by turn number
  function _getCurrentPlayer() {
    return turn % 2 !== 0 ? player1 : player2;
  }

  // Check for winner or tie
  function _checkWinner(lineValues) {
    // Sum full lines - lines without 0
    const sum = lineValues
      .filter((line) => !line.includes(0))
      .map((line) => line.reduce((sum, i) => sum + i, 0));
    if (sum.includes(3)) _endGame(1);
    if (sum.includes(6)) _endGame(2);
    if (turn > 9 && !isGameOver) _endGame();
  }

  // Play the turn, evaluate line values after 5th turn
  // Target square on DOM to mark
  function _takeTurn() {
    if (!isGameOver) {
      const target = this;
      const position = this.dataset.position;
      player = _getCurrentPlayer();
      const lineValues = player.play(target, position);
      if (lineValues) {
        turn++;
      }
      if (turn > 5 && lineValues) _checkWinner(lineValues);
    }
  }

  restart.addEventListener("click", _restartGame);
  squares.forEach((square) => {
    square.addEventListener("click", _takeTurn);
  });
})();
