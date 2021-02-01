'use strict'
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const SUPER = '⭐';
const CHERRY = '🍒'

var gInterval;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gGame.score = 0;
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    gInterval = setInterval(createCherry, 5000)
}

function buildBoard() {
    const SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 1 && j === 1) board[i][j] = SUPER;
            if (i === 8 && j === 1) board[i][j] = SUPER;
            if (i === 8 && j === 8) board[i][j] = SUPER;
            if (i === 1 && j === 8) board[i][j] = SUPER;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
    if (gGame.score === 70) gameOver();
}

function gameOver() {
    console.log('Game Over');
    renderCell(gPacman.location, EMPTY)
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    var elReButton = document.querySelector('.restart-modal');
    elReButton.style.display = 'flex';
    clearInterval(gInterval)
}

function gameOver2() {
    renderCell(gPacman.location, EMPTY)
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    var elReButton = document.querySelector('.restart-modal2');
    elReButton.style.display = 'flex';
    clearInterval(gInterval)
}

function restartGame() {
    var elReButton = document.querySelector('.restart-modal');
    elReButton.style.display = 'none';
    init()
}

function restartGame2() {
    var elReButton = document.querySelector('.restart-modal2');
    elReButton.style.display = 'none';
    init()
}

function findEmptyCells() {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length - 1; i++) {
        for (var j = 0; j < gBoard.length - 1; j++) {
            if (gBoard[i][j] === EMPTY) emptyCells.push({ i, j });
        }
    }
    return emptyCells;
}

function createCherry() {
    var emptyCells = findEmptyCells();
    if (!emptyCells.length) return;
    var emptyCell = emptyCells[getRandomInt(0, emptyCells.length)]
    gBoard[emptyCell.i][emptyCell.j] = CHERRY;
    renderCell(emptyCell, CHERRY);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}