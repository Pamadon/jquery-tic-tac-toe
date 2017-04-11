const BLANK_MARKER = "_";
const PLAYER_1_MARKER = "X";
const PLAYER_2_MARKER = "O";

var currentPlayer;
var nextPlayer;
var numMarkersPlaced;
var board;

/*
    board will be an array of length 9 (one for each cell)

    0 1 2
    3 4 5
    6 7 8
*/

var winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function onPageLoad() {
    $("td").on("click", addMarker);
    $("#reset").on("click", resetBoard);

    resetBoard();
}

function createBlankBoard() {
    return [
        BLANK_MARKER, BLANK_MARKER, BLANK_MARKER,
        BLANK_MARKER, BLANK_MARKER, BLANK_MARKER,
        BLANK_MARKER, BLANK_MARKER, BLANK_MARKER
    ];
}

/*
  pattern is a 3-element array representing a winning combo
  ex: [0, 1, 2] (the top row) or [0, 4, 8] (diagonal)

  0 1 2
  3 4 5
  6 7 8

  returns true if every index in the pattern array === marker
*/
function checkIfBoardMatchesPattern(pattern, marker) {
    var matches = true;

    for (var i = 0; i < 3; i++) {
        matches = matches && board[pattern[i]] === marker;
    }

    return matches;
}

function checkForWin(marker) {
    var winnerWinnerChickenDinner = false;

    // loop over the array of winning patterns
    for (var i = 0; i < winningPatterns.length; i++) {
        if (checkIfBoardMatchesPattern(winningPatterns[i], marker)) {
            winnerWinnerChickenDinner = true;
        }
    }

    return winnerWinnerChickenDinner;
}

function resetBoard() {
    board = createBlankBoard();
    numMarkersPlaced = 0;
    currentPlayer = PLAYER_1_MARKER;
    nextPlayer = PLAYER_2_MARKER;

    $("#reset").html("Clear Board");
    $("td").on("click", addMarker);
    $("td").html("");
    $("#playerTurn").html(`It is ${currentPlayer}'s turn`);
}

function addMarker() {
    // Only add a marker if the cell has not been previously selected.
    if ($(this).html().length === 0) {
        // Find out which cell the user clicked.
        var cellNumber = parseInt($(this).attr("data-num"));

        board[cellNumber] = currentPlayer;
        $(this).html(currentPlayer);
        $(this).attr("data-player", currentPlayer === PLAYER_1_MARKER ? 1 : 2);

        numMarkersPlaced++;

        if (checkForWin(currentPlayer)) {
            alert("Game over, " + currentPlayer + " wins!");
            $("#playerTurn").html("Game over, " + currentPlayer + " wins!");
            $("#reset").html("Play Again");
            $("td").unbind("click", addMarker);
        } else if (numMarkersPlaced == 9) {
            // if the numMarkersPlaced is equal to 9, the game is a draw!

            alert("Game Over! It's a draw!");
            $("#playerTurn").html("Game Over! It's a draw!");
            $("#reset").html("Play Again");
        } else {
            // swap currentPlayer, nextPlayer
            var temp = currentPlayer;
            currentPlayer = nextPlayer;
            nextPlayer = temp;

            $("#playerTurn").html(`It is ${currentPlayer}'s turn`);
        }
    }
}

$(onPageLoad);
