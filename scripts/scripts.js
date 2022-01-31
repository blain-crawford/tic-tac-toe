'use strict';

const Game = (function () {
  let _board = ['', '', '', '', '', '', '', '', ''];
  let _winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const _boardSquares = document.querySelectorAll('.game-square');
  const winnerBanner = document.getElementById('winner');
  const clearButton = document.querySelector('#clear-button');
  const playerOneScore = document.getElementById('player-one-score');
  const playerTwoScore = document.getElementById('player-two-score');
  const clearBoard = function () {
    _boardSquares.forEach((square) => {
      square.innerText = '';
      square.addEventListener('click', playerOneMove, false);
      winnerBanner.innerHTML = '';
    });
    for (let i = 0; i < _board.length; i++) {
      _board[i] = '';
    }
  };

  clearButton.addEventListener('click', clearBoard, false);

  const gameOver = function (winner) {
    winnerBanner.innerText = winner;
    _boardSquares.forEach((square) => {
      square.removeEventListener('click', playerTwoMove, false);
    });
    _boardSquares.forEach((square) => {
      square.removeEventListener('click', playerOneMove, false);
    });
  };

  const checkForWinner = function (currentMoves, winningMoves) {
    console.log(_board);
    for (let i = 0; i < winningMoves.length; i++) {
      let a = currentMoves[winningMoves[i][0]];
      let b = currentMoves[winningMoves[i][1]];
      let c = currentMoves[winningMoves[i][2]];
      if (a === '' || b === '' || c === '') {
        continue;
      } else if (a === b && b === c) {
        if(playerOneScore.innerText < 3 && playerTwoScore.innerText < 3) {
          if (a === 'X') {
            gameOver('Player One Wins This Round!!');
            playerOneScore.innerText++;
          } else if (a === 'O') {
            gameOver('Player Two Wins This Round!!');
            playerTwoScore.innerText++;
          }
        } else {
          if (a === 'X') {
            gameOver('Player One FIRST TWO THREE!!! Player One Wins The Game!');
            
          } else if (a === 'O') {
            gameOver('Player Two FIRST TWO THREE!!! Player Two Wins The Game!');
          }
        }
      }
    }
  };

  let makeMove = function (square, player) {
    _board[square] = `${player}`;
  };

  const playerOneMove = function () {
    if (this.innerText === '') {
      this.innerText = 'X';
      makeMove(this.dataset.square, this.innerText);

      _boardSquares.forEach((square) => {
        square.removeEventListener('click', playerOneMove, false);
      });
      _boardSquares.forEach((square) => {
        square.addEventListener('click', playerTwoMove, false);
      });
      checkForWinner(_board, _winningConditions);
    }
  };

  const playerTwoMove = function () {
    if (this.innerText === '') {
      this.innerText = 'O';
      makeMove(this.dataset.square, this.innerText);

      _boardSquares.forEach((square) => {
        square.removeEventListener('click', playerTwoMove, false);
      });
      _boardSquares.forEach((square) => {
        square.addEventListener('click', playerOneMove, false);
      });
      checkForWinner(_board, _winningConditions);
    }
  };

  _boardSquares.forEach((square) => {
    square.addEventListener('click', playerOneMove, false);
  });

  return {playerOneMove, playerTwoMove };
})();

