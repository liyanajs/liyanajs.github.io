// Current state of the game
let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

// 1. Initialize/Draw the Board
function createBoard() {
    boardElement.innerHTML = ""; // Clear existing cells
    board.forEach((val, index) => {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.innerText = val;
        
        // Only allow clicking if the spot is empty
        cell.onclick = () => playerMove(index);
        boardElement.appendChild(cell);
    });
}

// 2. Human Player Move ("X")
function playerMove(index) {
    if (board[index] === " ") {
        board[index] = "X";
        createBoard();
        
        if (checkWinner("X")) {
            statusElement.innerText = "Player X Wins!";
            return;
        }
        if (!board.includes(" ")) {
            statusElement.innerText = "It's a Tie!";
            return;
        }

        // Let the computer think for half a second
        statusElement.innerText = "Computer is thinking...";
        setTimeout(computerMove, 500);
    }
}

// 3. Smart AI Logic ("O") - This matches your Python logic!
function computerMove() {
    let emptySpots = board.map((s, i) => s === " " ? i : null).filter(i => i !== null);

    // --- PHASE 1: ATTACK (Can I win?) ---
    for (let spot of emptySpots) {
        board[spot] = "O";
        if (checkWinner("O")) {
            createBoard();
            statusElement.innerText = "Computer Wins!";
            return;
        }
        board[spot] = " "; // Undo
    }

    // --- PHASE 2: DEFENSE (Must I block?) ---
    for (let spot of emptySpots) {
        board[spot] = "X";
        if (checkWinner("X")) {
            board[spot] = "O"; // Steal the spot
            createBoard();
            statusElement.innerText = "Your Turn (X)";
            return;
        }
        board[spot] = " "; // Undo
    }

    // --- PHASE 3: RANDOM FALLBACK ---
    let choice = emptySpots[Math.floor(Math.random() * emptySpots.length)];
    board[choice] = "O";
    createBoard();
    
    if (checkWinner("O")) {
        statusElement.innerText = "Computer Wins!";
    } else if (!board.includes(" ")) {
        statusElement.innerText = "It's a Tie!";
    } else {
        statusElement.innerText = "Your Turn (X)";
    }
}

// 4. Winning Logic
function checkWinner(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}

// Start the game
createBoard();

document.getElementById("reset").onclick = () => {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    statusElement.innerText = "Your Turn (X)";
    createBoard();
};