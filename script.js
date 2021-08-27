const gameBoard = (() => {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  // _renderBoard = () => {
  //   squares.forEach((square, i) => {
  //     if (board[i] !== 0) {
  //       square.textContent = board[i];
  //     }
  //   });
  // };
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const sumBoard = () => {
    for (let line of winningLines) {
      let sum = board[line[0]] + board[line[1]] + board[line[2]];
    }
  };

  const updateBoard = (position, player) => {
    const targetValue = board[position];
    if (targetValue === 0) {
      board[position] = player;
      // _renderBoard();
      return true;
    }
  };
  return { board, updateBoard };
})();

const Player = (player) => {
  play = (target, position) => {
    const isUpdated = gameBoard.updateBoard(position, player);
    if (isUpdated) {
      target.textContent = player === 1 ? "X" : "O";
    }
    return isUpdated;
  };
  return { play };
};

const squares = document.querySelectorAll(".square");

const gameMaster = (() => {
  let turn = 1;
  let isGameOver = false;
  let currentPlayer;
  const player1 = Player(1);
  const player2 = Player(2);
  function _getCurrentPlayer() {
    return (currentPlayer = turn % 2 !== 0 ? player1 : player2);
  }

  function _validateMove(position) {
    let board = gameBoard.board;
    if (board[position] === 0) {
    }
  }

  function checkGameState() {}

  function takeTurn(e) {
    const target = this;
    const position = this.dataset.position;
    currentPlayer = _getCurrentPlayer();
    const isUpdated = currentPlayer.play(target, position);
    if (isUpdated) {
      turn++;
    }
    checkGameState();
  }

  squares.forEach((square) => {
    square.addEventListener("click", takeTurn);
  });

  return { takeTurn };
})();
