const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE';
const PASSAGE = 'PASSAGE'

const GAMER_IMG = '<img src="img/gamer.png"/>';
const BALL_IMG = '<img src="img/ball.png"/>';
const GLUE_IMG = '<img src="img/stop.png"/>'

var gTimeOut;
var gBoard;
var gGamerPos;
var gBallsInterval;
var gGluesInterval;
var gBallCollected = 0;

function initGame() {
    gBallCollected = 0;
    gTimeOut = setTimeout(gameOver, 30000)
    gGamerPos = { i: getRandomInt(1, 8), j: getRandomInt(1, 10) };
    gBoard = buildBoard();
    renderBoard(gBoard);
    addBallsAndGlues();
}

function buildBoard() {
    var board = createMat(10, 12)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = { type: FLOOR, gameElement: null };
            if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
                cell.type = WALL;
            }
            board[i][j] = cell;
        }
    }
    board[0][5].type = PASSAGE;
    board[4][0].type = PASSAGE;
    board[9][5].type = PASSAGE;
    board[4][11].type = PASSAGE;
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
    board[getRandomInt(1, 8)][getRandomInt(1, 10)].gameElement = BALL;
    board[getRandomInt(1, 8)][getRandomInt(1, 10)].gameElement = BALL;
    return board;
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cellClass = getClassName({ i: i, j: j })
            if (currCell.type === FLOOR) cellClass += ' floor';
            else if (currCell.type === WALL) cellClass += ' wall';
            else cellClass += ' floor';

            strHTML +=
                `\t<td class="cell ${cellClass}" onclick="moveTo(${i}, ${j})" >\n`;

            switch (currCell.gameElement) {
                case GAMER:
                    strHTML += GAMER_IMG;
                    break;
                case BALL:
                    strHTML += BALL_IMG;
                    break;
                case GLUE:
                    strHTML += GLUE_IMG;
            }
            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function moveTo(i, j) {
    if (i === -1) i = 9;
    if (i === 10) i = 0;
    if (j === 12) j = 0;
    if (j === -1) j = 11;
    var targetCell = gBoard[i][j];
    if (targetCell.type === WALL) return;
    var iAbsDiff = Math.abs(i - gGamerPos.i);
    var jAbsDiff = Math.abs(j - gGamerPos.j);
    var elBallCollect = document.querySelector('.ball-count');
    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) || (targetCell.type === PASSAGE)) {
        if (targetCell.gameElement === BALL) {
            popSound()
            elBallCollect.innerText = `Balls count - ${++gBallCollected}`
        }
        if (targetCell.gameElement === GLUE) {
            elBallCollect.innerText = `Balls count - ${--gBallCollected}`;
            stopSound();
        }
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        renderCell(gGamerPos, '');
        gGamerPos.i = i;
        gGamerPos.j = j;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
        renderCell(gGamerPos, GAMER_IMG);
    }
}

function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

function handleKey(event) {
    var i = gGamerPos.i;
    var j = gGamerPos.j;
    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1);
            break;
        case 'ArrowRight':
            moveTo(i, j + 1);
            break;
        case 'ArrowUp':
            moveTo(i - 1, j);
            break;
        case 'ArrowDown':
            moveTo(i + 1, j);
            break;
    }
}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addBallsAndGlues() {
    gBallsInterval = setInterval(addBall, 1000);
    gGluesInterval = setInterval(addGlue, 3000);
}

function addBall() {
    var num1 = getRandomInt(1, 8);
    var num2 = getRandomInt(1, 10);
    gBoard[num1][num2].gameElement = BALL;
    renderBoard(gBoard);
}

function gameOver() {
    elWin = document.querySelector('.board');
    var elCongrads = document.querySelector('.keys');
    elWin.innerHTML = `<button onclick="restartGame()" class="restart-game"
	>Restart Game</button>`
    elCongrads.innerText = 'Congrads! You finished the game!';
    clearInterval(gBallsInterval);
    clearTimeout(gTimeOut);
    clearInterval(gGluesInterval);
}

function restartGame() {
    initGame()
}

function addGlue() {
    var num1 = getRandomInt(1, 8);
    var num2 = getRandomInt(1, 10);
    gBoard[num1][num2].gameElement = GLUE;
    renderBoard(gBoard);
}

function popSound() {
    var sound = new Audio('Audio/pop sound.mp3');
    sound.play();
}

function stopSound() {
    var sound = new Audio('Audio/160909__racche__scratch-speed.wav');
    sound.play();
}