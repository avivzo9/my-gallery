'use strict'
const PACMAN = '⍩⃝';

var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 6
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    var nextLocation = getNextLocation(ev);
    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    if (nextCell === CHERRY) updateScore(5);

    if (nextCell === SUPER) {
        gPacman.isSuper = true;
        setTimeout(function() {
            gPacman.isSuper = false;
        }, 5000);
    }

    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver2();
            return;
        } else {
            var currIdx = getGhostByLocation(nextLocation);
            var currGhost = gGhosts[currIdx];
            gGhosts.splice(currIdx, 1);
            setTimeout(function() {
                gGhosts.push(currGhost);
            }, 3000);
        }
    }

    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCell === FOOD) updateScore(1);

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
        // update the DOM
    renderCell(gPacman.location, EMPTY)
        // Move the pacman
        // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
        // update the DOM
    renderCell(gPacman.location, PACMAN)

}

function getNextLocation(eventKeyboard) {
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
                break
        case 'ArrowDown':
            nextLocation.i++
                break
        case 'ArrowLeft':
            nextLocation.j--
                break
        case 'ArrowRight':
            nextLocation.j++
                break
        default:
            return null

    }
    return nextLocation;
}

function getGhostByLocation(pacmanPosition) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === pacmanPosition.i && gGhosts[i].location.j === pacmanPosition.j) {
            return i;
        }
    }
}