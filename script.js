const gameBoard = (() => {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  // _renderBoard = () => {
  //   squares.forEach((square, i) => {
  //     if (board[i] !== 0) {
  //       square.textContent = board[i];
  //     }
  //   });
  // };

  updateBoard = (position, player) => {
    const targetValue = board[position];
    if (targetValue === 0) {
      board[position] = player;
      // _renderBoard();
      return board;
    }
  };
  return { updateBoard };
})();

const Player = (player) => {
  play = (target, position) => {
    gameBoard.updateBoard(position, player);
    target.textContent = player === 1 ? "X" : "O";
  };
  return { play };
};

const squares = document.querySelectorAll(".square");

const gameMaster = (() => {
  let turn = 1;
  const player1 = Player(1);
  const player2 = Player(2);

  function takeTurn(e) {
    const target = this;
    if (turn % 2 !== 0) {
      player1.play(target, this.dataset.position);
      // this.textContent =
    } else player2.play(target, this.dataset.position);
    turn++;
  }

  squares.forEach((square) => {
    square.addEventListener("click", takeTurn);
  });

  return { takeTurn };
})();
