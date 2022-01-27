'use strict';


const Game = (function () {
  let _board = ['','','','','','','','','']
  const _boardSquares = document.querySelectorAll('.game-square');

  const playerMove = function (value) {
    value = this.dataset.block
    this.innerText = 'X'
    _board[value] = this.innerText;
    console.log(_board);
  }

  _boardSquares.forEach(square => {
    square.addEventListener('click', playerMove, false);
  });
  
  return {playerMove};
})();





