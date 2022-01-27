'use strict';
const boardSquares = document.querySelectorAll('.game-square');

const Game = (function () {
  let board = ['','','','','','','','','']

  const playerMove = function (value) {
    value = this.dataset.block
    this.innerText = 'X'
    board[value] = this.innerText;
    console.log(board);
  }
  return {playerMove};
})();

boardSquares.forEach(square => {
  square.addEventListener('click', Game.playerMove, false);
});



