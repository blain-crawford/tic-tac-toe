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
  const playerOneHumanOrAI = document.getElementById('player-or-AI-left');
  const playerTwoHumanOrAI = document.getElementById('player-or-AI-right');

  const clearBoard = function () {
    winnerBanner.innerText = '';
    _boardSquares.forEach((square) => {
      square.innerText = '';
      square.removeEventListener('click', playerTwoMove, false);
      square.addEventListener('click', playerOneMove, false);
    });
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
    _boardSquares.forEach((square) => {
      square.removeEventListener('click', playerTwoMove, false);
    });
    _boardSquares.forEach((square) => {
      square.removeEventListener('click', playerOneMove, false);
    });
  };

  const gameOver = function (winner) {
    winnerBanner.innerText = `First To Three Is ${winner}`;
    _boardSquares.forEach((square) => {
      square.removeEventListener('click', playerTwoMove, false);
    });
    _boardSquares.forEach((square) => {
      square.removeEventListener('click', playerOneMove, false);
    });
    clearButton.innerText = 'Play Again?';
    clearButton.removeEventListener('click', clearBoard, false);
    clearButton.addEventListener('click', playAgain, false);
  };

  const checkForWinner = function (currentMoves, winningMoves) {
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

  let makeMove = function (square, player) {
    _board[square] = `${player}`;
  };

  const playerOneMove = function () {

    if(playerOneHumanOrAI.value === 'player') {
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
    }

    if(playerOneHumanOrAI.value === 'AI') {
      let aiMove = Math.floor(Math.random() * 9);
      let aiDiv = document.getElementById(`${aiMove}`);
      aiDiv.innerText = 'X';
      console.log(aiMove);
      for (let i = 0; i < _board.length; i++) {
        if(_board[aiMove] === '') {
          _board[aiMove] = 'X';
        } else {
        }
        _board[aiMove] = 'X';
        console.log(aiDiv);
        console.log(_board);
      }
    }
  };

  const playerTwoMove = function () {
    console.log(playerTwoHumanOrAI.value);
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

  return { playerOneMove, playerTwoMove };
})();
