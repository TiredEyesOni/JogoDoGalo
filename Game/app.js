let playBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const player1 = "O";
const player2 = "X";
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
startGame();

function startGame() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerText = "";
    squares[i].style.removeProperty("background-color");
    squares[i].addEventListener("click", clickTurn);
  }
}

function reset() {
  location.reload();
}

function clickTurn(square) {
  turn(square.target.id, currentPlayer);

  if (currentPlayer == player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
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
  let plays = board.reduce((a, e, i) =>                     
  (e == player ? a.concat(i) : a), []);						 
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == player1 ? "blue" : "red";
  }
  for (let i = 0; i < squares.length; i++) {
    squares[i].removeEventListener("click", clickTurn);
  }
}
