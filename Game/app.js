let board;
const player1 = "O";
const player2 = "X";
const winsCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]



const squares = document.querySelectorAll(".cell");

function reset() {
    startGame()
}

function startGame() {
    board = Array.from(Array(9).keys())
    for (let i = 0; i < squares.length ; i++) {
        squares[i].addEventListener("click", clickTurn);
        squares[i].innerText = ""
    }
}
startGame();

function clickTurn(square) {
    turn(square.target.id,player1);
}

function turn(squareId,player) {
    board[squareId]=player
    document.getElementById(squareId).innerText = player
}