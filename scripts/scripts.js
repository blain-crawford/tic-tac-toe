'use strict';

const Game = (function () {
  let _board = [['','',''], ['','',''], ['','','']]
  const _boardSquares = document.querySelectorAll('.game-square');
  const winnerBanner = document.getElementById('winner');
  const gameOver = function (winner) {
    winnerBanner.innerText = winner;
    console.log('being called')
    _boardSquares.forEach(square => {
      square.removeEventListener('click', playerOneMove, false);
    });

    _boardSquares.forEach(square => {
      square.removeEventListener('click', playerTwoMove, false);
    })
  };

 const checkForWinner = function (currentMoves) {
  for (let i = 0; i < currentMoves.length; i++) {
    if (currentMoves[i][0] === 'X' && currentMoves[i][1] === 'X' && currentMoves[i][2] === 'X') {
      gameOver('Player One WINS!!!');
    } else if (currentMoves[i][0] === 'X' && currentMoves[i][1] === 'X' && currentMoves[i][2] === 'X') {
      gameOver('Player Two WINS!!!');
    }
  }
 }

  let makeMove = function (row, square, player) {
    _board[row][square] = `${player}`;
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
      checkForWinner(_board);
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
      checkForWinner(_board);
    }
  };



  _boardSquares.forEach(square => {
    square.addEventListener('click', playerOneMove, false);
  });
  
  return {playerOneMove, playerTwoMove};
})();





