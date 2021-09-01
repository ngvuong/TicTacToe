// The Game Board
const gameBoard = (() => {
  let board = Array(9).fill(0);

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

  let lineValues = Array(8)
    .fill(null)
    .map(() => Array(3).fill(0));

  const resetLineValues = () => {
    lineValues.forEach((line, index) => {
      line.forEach((value, i) => (lineValues[index][i] = 0));
    });
  };

  const setLineValues = (position) => {
    lines.forEach((line, i) => {
      if (line.includes(position)) {
        const index = line.indexOf(position);
        lineValues[i][index] = board[position];
      }
    });
    return lineValues;
  };

  const updateBoard = (position, player) => {
    if (!board[position]) {
      board[position] = player;
      return setLineValues(parseInt(position));
    }
  };

  const resetGame = () => {
    board.forEach((e, i) => (board[i] = 0));
    resetLineValues();
  };

  return { resetGame, updateBoard };
})();

// The Players
const Player = (player) => {
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
  const player1 = Player(1);
  const player2 = Player(2);

  function endGame(winner) {
    const text = winner ? `Player ${winner} wins!` : `It's a tie!`;
    showDisplay(text);
    isGameOver = true;
  }

  function showDisplay(text) {
    display.textContent = text;
    display.classList.add("active");
    setTimeout(() => display.classList.remove("active"), 2000);
  }

  function restartGame() {
    turn = 1;
    squares.forEach((square) => (square.textContent = ""));
    gameBoard.resetGame();
    isGameOver = false;
  }

  function _getCurrentPlayer() {
    return turn % 2 !== 0 ? player1 : player2;
  }

  function checkWinner(lineValues) {
    const sum = lineValues
      .filter((line) => !line.includes(0))
      .map((line) => line.reduce((sum, i) => sum + i, 0));
    if (sum.includes(3)) endGame(1);
    if (sum.includes(6)) endGame(2);
    if (turn > 9 && !isGameOver) endGame();
  }

  function takeTurn() {
    if (!isGameOver) {
      const target = this;
      const position = this.dataset.position;
      player = _getCurrentPlayer();
      const lineValues = player.play(target, position);
      if (lineValues) {
        turn++;
      }
      if (turn > 5 && lineValues) checkWinner(lineValues);
    }
  }

  restart.addEventListener("click", restartGame);
  squares.forEach((square) => {
    square.addEventListener("click", takeTurn);
  });
})();
