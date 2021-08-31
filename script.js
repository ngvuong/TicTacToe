// The Game Board
const gameBoard = (() => {
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const add = (position) => {
    // const lines = winningLines.findIndex((line) => line.includes(position));
    let lines = [];
    winningLines.forEach((line, i) => {
      if (line.includes(position)) {
        lines.push();
      }
    });
  };

  const getLineValues = () => {
    let lineValues = [];
    for (let line of winningLines) {
      lineValues.push([board[line[0]], board[line[1]], board[line[2]]]);
    }
    return lineValues;
  };

  const updateBoard = (position, player) => {
    if (!board[position]) {
      board[position] = player;
      console.log(add(parseInt(position)), position);
      return getLineValues();
    }
  };

  const resetBoard = () => {
    for (let i in board) {
      board[i] = 0;
    }
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

const squares = document.querySelectorAll(".square");
const display = document.querySelector(".display");

// The GameMaster
const gameMaster = (() => {
  let turn = 1;
  let isGameOver = false;
  const player1 = Player(1);
  const player2 = Player(2);
  const restart = document.querySelector(".restart");

  function restartGame() {
    turn = 1;
    squares.forEach((square) => (square.textContent = ""));
    gameBoard.resetBoard();
    display.classList.toggle("active");
  }

  restart.addEventListener("click", restartGame);

  function _getCurrentPlayer() {
    return turn % 2 !== 0 ? player1 : player2;
  }

  function checkWinner() {
    if (sum === 3) {
      console.log("Player 1 wins");
      // return;
    } else if (sum === 6) {
      console.log("Player 2 wins");
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
    if (turn > 9 && !isGameOver) console.log("It's a tie!");
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
