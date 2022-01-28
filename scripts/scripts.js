'use strict';

const Game = (function () {
  let _board = [['','',''], ['','',''], ['','','']]
  const _boardSquares = document.querySelectorAll('.game-square');
  const winnerBanner = document.getElementById('winner');

 

  let makeMove = function (row, square, player) {
    _board[row][square] = `${player}`;
    console.log(_board);
  };
  
  const playerOneMove = function () {
    if(this.innerText === ''){
      this.innerText = 'X';
      makeMove(this.dataset.row, this.dataset.square, this.innerText);

      _boardSquares.forEach(square => {
        square.removeEventListener('click', playerOneMove, false);
      })
      _boardSquares.forEach(square => {
        square.addEventListener('click', playerTwoMove, false);
      })
    }
  };

  const playerTwoMove = function () {
    if(this.innerText === '') {
      this.innerText = 'O';
      makeMove(this.dataset.row, this.dataset.square, this.innerText);

      _boardSquares.forEach(square => {
        square.removeEventListener('click', playerTwoMove, false);
      })
      _boardSquares.forEach(square => {
        square.addEventListener('click', playerOneMove, false);
      });
    }
  };



  _boardSquares.forEach(square => {
    square.addEventListener('click', playerOneMove, false);
  });
  
  return {playerOneMove, playerTwoMove};
})();





