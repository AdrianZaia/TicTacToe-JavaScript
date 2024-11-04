
/*Tic Tac Toe on Javascript and HTML */

/*______________GAME VARIABLES______________*/

const statusDisplay = document.querySelector('.game--status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*  We set the inital message to let the players know whose turn it is */
statusDisplay.innerHTML = currentPlayerTurn();

/*________________FUNCTIONS________________*/

/*  the game updates its state to reflect the played move, 
    as well as update the user interface to reflect the move made
*/
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

/* This function will change the player after each move 
*/
function handlePlayerChange() {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}


function handleResultValidation() {
/*  This function will check to see the results of the match
    it will continue playing if the win conditions are not met
*/
    let roundWin = false;
    for (let i = 0; i <=7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === ''){
            continue;
        }
        if (a===b && b===c){
            roundWin = true;
            break
        }
    }
    if (roundWin){
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}


function handleCellClick(clickedCellEvent) {
/*  We will save the clicked html element in a variable for ease of use
*/    
        const clickedCell = clickedCellEvent.target;

/*  Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid. 
*/
        const clickedCellIndex = parseInt(
            clickedCell.getAttribute('data-cell-index')
        );

/*  Next we need to check whether the cell is already
*/
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

/*  If everything is working as intended, the game will continue 
*/    
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
}


/* This function will reset the board to the default state */
function handleRestartGame() {
    gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = currentPlayerTurn();
        document.querySelectorAll('.cell')
                .forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);