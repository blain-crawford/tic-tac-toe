'use strict';

const Game = (function () {
  let _board = [['','',''], ['','',''], ['','','']]
  const _boardSquares = document.querySelectorAll('.game-square');
  const winnerBanner = document.getElementById('winner');
  const playerOneMove = function (row, square) {
    if(this.innerText === ''){
      let row = this.dataset.row;
      let square = this.dataset.square;
      this.innerText = 'X';
      _board[row][square] = `${this.innerText}${square}`;
      console.log(_board);
      _boardSquares.forEach(square => {
        square.removeEventListener('click', playerOneMove, false);
      })
      _boardSquares.forEach(square => {
        square.addEventListener('click', playerTwoMove, false);
      })
    }
  };

  const playerTwoMove = function (value) {
    if(this.innerText === '') {
      let row = this.dataset.row;
      let square = this.dataset.square;
      this.innerText = 'O';
      _board[row][square] = `${this.innerText}${square}`;
      console.log(_board);
      _boardSquares.forEach(square => {
        square.removeEventListener('click', playerTwoMove, false);
      })
      _boardSquares.forEach(square => {
        square.addEventListener('click', playerOneMove, false);
      });
    }
  };

  // const decideWinner = function {
  //   if (_board[0] === 'X' &&&)
  // }

  _boardSquares.forEach(square => {
    square.addEventListener('click', playerOneMove, false);
  });
  
  return {playerOneMove, playerTwoMove};
})();





