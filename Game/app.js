let playBoard;
const player1 = "O";
const player2 = "X";
let player1Score = 0;
let player2Score = 0;
let currentPlayer = player1;
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const squares = document.querySelectorAll(".cell");
let score1 = document.querySelector('#player1');
let score2 = document.querySelector('#player2');
startGame();

function startGame() {
  playBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  for (let i = 0; i < squares.length; i++) {
    squares[i].innerText = "";
    squares[i].style.removeProperty("background-color");
    squares[i].addEventListener("click", clickTurn);
  }
  document.querySelector('.text').innerText = '';
}

function reset() {
  startGame();
}

function clickTurn(square) {
  turn(square.target.id, currentPlayer);

  if (currentPlayer == player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
  checkTie();
}

function turn(squareId, player) {
  playBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  document.getElementById(squareId).removeEventListener("click", clickTurn);
  let gameWon = checkWin(playBoard, player);
  if (gameWon) {
    gameOver(gameWon);
  }
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e == player ? a.concat(i) : a), []);						 
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function emptySquares() {
  return playBoard.filter(s => typeof s == 'number')
}

function checkTie() {
  if (emptySquares().length == 0) {
    for (let i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = 'green';
      squares[i].removeEventListener('click', clickTurn);      
    }
    winner("It's a tie!");
  }
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    if (gameWon.player == player1) {
      document.getElementById(index).style.backgroundColor = 'blue';
    } else {
      document.getElementById(index).style.backgroundColor = 'red';
    }
  }
  for (let i = 0; i < squares.length; i++) {
    squares[i].removeEventListener("click", clickTurn);
  }
  if (gameWon.player == player1) {
    winner('Player 1 wins!');
    player1Score += 1;
    localStorage.setItem('player1', player1Score);
  } else {
    winner('Player2 wins!');
    player2Score += 1;
    localStorage.setItem('player2', player2Score);
  }
}

score1.innerText = localStorage.getItem('player1', player1Score);
score2.innerText = localStorage.getItem('player2', player2Score);

function winner(who) {
  document.querySelector('.text').innerText = who;
}

console.log(localStorage);
