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

  const playerOneTurn = function () {
    _boardSquares.forEach((square) => {
      square.removeEventListener('click', playerTwoMove, false);
    });
    _boardSquares.forEach((square) => {
      square.addEventListener('click', playerOneMove, false);
    });
  }

  const playerTwoTurn = function () {
    _boardSquares.forEach((square) => {
      square.removeEventListener('click', playerOneMove, false);
    });
    _boardSquares.forEach((square) => {
      square.addEventListener('click', playerTwoMove, false);
    });
  }

  const stopMoves = function () {
    _boardSquares.forEach((square) => {
      square.removeEventListener('click', playerTwoMove, false);
    });
    _boardSquares.forEach((square) => {
      square.removeEventListener('click', playerOneMove, false);
    });
  }

  const clearBoard = function () {
    winnerBanner.innerText = '';
    _boardSquares.forEach((square) => {
      square.innerText = '';
    });

    playerOneTurn();

    for (let i = 0; i < _board.length; i++) {
      _board[i] = '';
    }
  };

  const playAgain = function () {
    playerOneScore.innerText = 0;
    playerTwoScore.innerText = 0;

    clearBoard();

    clearButton.removeEventListener('click', playAgain, false);
    clearButton.addEventListener('click', clearBoard, false);
    clearButton.innerText = 'Click to begin next round!';
  };

  clearButton.addEventListener('click', clearBoard, false);

  const roundOver = function (winner) {
    winnerBanner.innerText = winner;
    stopMoves();
  };

  const gameOver = function (winner) {
    winnerBanner.innerText = `First To Three Is ${winner}`;
    stopMoves();

    clearButton.innerText = 'Play Again?';
    clearButton.removeEventListener('click', clearBoard, false);
    clearButton.addEventListener('click', playAgain, false);
  };

  const checkForWinner = function (currentMoves, winningMoves) {
    for (let i = 0; i < _board.length; i++) {
      if (!_board.includes('')) {
        roundOver('Tie Game!');
      }
    }
    for (let i = 0; i < winningMoves.length; i++) {
      let a = currentMoves[winningMoves[i][0]];
      let b = currentMoves[winningMoves[i][1]];
      let c = currentMoves[winningMoves[i][2]];
      if (a === '' || b === '' || c === '') {
        continue;
      } else if (a === b && b === c) {
        if (a === 'X') {
          roundOver('Player One Wins This Round!!');
          playerOneScore.innerText++;
        } else if (a === 'O') {
          roundOver('Player Two Wins This Round!!');
          playerTwoScore.innerText++;
        }
      }
    }
    if (playerOneScore.innerText === '3') {
      gameOver('Player One!');
    }
    if (playerTwoScore.innerText === '3') {
      gameOver('Player Two');
    }
  };

  const makeMove = function (square, player) {
    _board[square] = `${player}`;
  };

  const playerOneMove = function () {
      if (this.innerText === '') {
        this.innerText = 'X';
        makeMove(this.dataset.square, this.innerText);
        playerTwoTurn();
    }
    checkForWinner(_board, _winningConditions);
  };

  const playerTwoMove = function () {
      if (this.innerText === '') {
        this.innerText = 'O';
        makeMove(this.dataset.square, this.innerText);
        playerOneTurn();
      }
    checkForWinner(_board, _winningConditions);
  };

  _boardSquares.forEach((square) => {
    square.addEventListener('click', playerOneMove, false);
  });

})();
