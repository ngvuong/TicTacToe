const gameBoard = (() => {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  updateBoard = (position, player) => {
    const target = board[position];
    if (target === 0) {
      board[position] = player == 1 ? "X" : "O";
      // renderBoard();
    }
  };
  return { board, updateBoard };
})();

renderBoard = () => {};
