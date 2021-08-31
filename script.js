// The Game Board
const gameBoard = (() => {
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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

  let lineValues = [];
  const resetLineValues = () => {
    lineValues = [];
    for (let i = 0; i < 9; i++) {
      lineValues.push([0, 0, 0]);
    }
  };

  resetLineValues();

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

  const resetBoard = () => {
    for (let i in board) {
      board[i] = 0;
    }
    resetLineValues();
  };
  return { resetBoard, updateBoard };
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

  function displayWinner(player) {
    const text = `Player ${player} wins!`;
    showDisplay(text);
  }

  function showDisplay(text) {
    display.textContent = text;
    display.classList.add("active");
    setTimeout(() => display.classList.remove("active"), 2000);
  }

  function restartGame() {
    turn = 1;
    squares.forEach((square) => (square.textContent = ""));
    gameBoard.resetBoard();
    isGameOver = false;
  }

  restart.addEventListener("click", restartGame);

  function _getCurrentPlayer() {
    return turn % 2 !== 0 ? player1 : player2;
  }

  function checkWinner() {
    if (sum === 3) {
      displayWinner(1);
    } else if (sum === 6) {
      displayWinner(2);
    }
  }

  function checkGameState(lineValues) {
    for (let line of lineValues) {
      if (!line.includes(0) && !isGameOver) {
        sum = line.reduce((sum, i) => sum + i, 0);
        if (sum === 3 || sum === 6) isGameOver = true;
        checkWinner(sum);
      }
    }

    if (turn > 9 && !isGameOver) showDisplay("It's a Tie!");
  }

  function takeTurn() {
    if (!isGameOver) {
      const target = this;
      const position = this.dataset.position;
      player = _getCurrentPlayer();
      const lineValues = player.play(target, position);
      if (lineValues) {
        turn++;
        checkGameState(lineValues);
      }
    }
  }

  squares.forEach((square) => {
    square.addEventListener("click", takeTurn);
  });

  return { takeTurn };
})();
