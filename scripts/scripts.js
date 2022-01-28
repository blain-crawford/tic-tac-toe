'use strict';


const Game = (function () {
  let _board = ['','','','','','','','','']
  const _boardSquares = document.querySelectorAll('.game-square');
  const winnerBanner = document.getElementById('winner');
  const playerOneMove = function (value) {
    if(this.innerText === ''){
      value = this.dataset.block;
      this.innerText = 'X';
      _board[value] = this.innerText;
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
    value = this.dataset.block;
      this.innerText = 'O';
      _board[value] = this.innerText;
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





