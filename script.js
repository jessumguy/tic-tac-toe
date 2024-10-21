const game = (function createGameBoard() {
    const grid = [];
    for (let row = 0; row < 3; row++) {
        const newRow = [];
        
        for (let col = 0; col < 3; col++) {
            newRow.push(0)
        }
        grid.push(newRow);
    }

    function renderGrid() {
        const gameBoard = document.getElementById('grid');
        gameBoard.innerHTML = '';
        for (let row = 0; row < 3; row++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'row';
            for (let col = 0; col < 3; col++) {
                const cellButton = document.createElement('button');
                cellButton.className = 'cell';
                cellButton.dataset.row = row;
                cellButton.dataset.col = col;
                cellButton.addEventListener('click', () => handleCellClick(row, col, cellButton));
                rowDiv.appendChild(cellButton);
            }
            gameBoard.appendChild(rowDiv)
        }
    }

    function displayGrid() {
        console.log(grid);
        console.log(grid.map(row => row.join(' | ')).join('\n'));
    }

    function renderPlayerTurn(currentPlayer) {
        const playerTurnSection = document.getElementById('player-turn');
        if (checkWinner()) {
            playerTurnSection.innerHTML = `<span class="player-name">${currentPlayer.name} WINS!!!</span>`;
        } else {
            playerTurnSection.innerHTML = `Player's turn: <span class="player-name">${currentPlayer.name}</span>`;
        }
    }

    function handleCellClick(row, col, cellButton) {
        console.log(`Cell clicked, row: ${row}, col ${col}`)
        if (!gameOver) {
            const playerMove = currentPlayer === player1? 'X' : 'O';
            if (makeMove(row, col, playerMove)) {
                cellButton.textContent = playerMove;
                if (checkWinner()) {
                    gameOver = true;
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                }
            }
        }
        displayGrid();
        renderPlayerTurn(currentPlayer)
    }
        

    function makeMove(row, col, playerMove) {
        if (grid[row][col] === 0) {
            grid[row][col] = playerMove;
            console.log(`${playerMove} placed in row: ${row}, column: ${col}`)
            return true
        } else {
            console.log(`Cell already has an '${playerMove}'`)
            return false
        }
    }

    function checkWinner() {
        const lines = [
            // Rows
            [grid[0][0], grid[0][1], grid[0][2]],
            [grid[1][0], grid[1][1], grid[1][2]],
            [grid[2][0], grid[2][1], grid[2][2]],
            // Columns
            [grid[0][0], grid[1][0], grid[2][0]],
            [grid[0][1], grid[1][1], grid[2][1]],
            [grid[0][2], grid[1][2], grid[2][2]],
            // Diagonal
            [grid[0][0], grid[1][1], grid[2][2]],
            [grid[0][2], grid[1][1], grid[2][0]],
        ];
        for (line of lines) {
            // console.log(line)
            if (line[0] && line[0] === line[1] && line[1] === line[2]) {
                console.log(`${currentPlayer.name} wins!`);
                return true
            } else {
                console.log('No Winner, continue')
            }
        } 
    }

    function createPlayer(name) {
        return {
            name,
            makeMove,
            describe() {
                console.log(`My name is ${name}`)
            }
        }
    }

    let player1, player2
    let currentPlayer;
    let gameOver = false;
    
    function startGame(player1Name, player2Name) {
        player1 = createPlayer(player1Name);
        player2 = createPlayer(player2Name);
        currentPlayer = player1;
        gameOver = false;
        console.log(`Player 1: ${player1.name} joined the game`)
        console.log(`Player 2: ${player2.name} joined the game`)
        renderGrid();
        renderPlayerTurn(currentPlayer);
    }

    return {
        grid,
        // renderGrid,
        // displayGrid,
        // makeMove,
        // checkWinner,
        // createPlayer,
        startGame
    }
})();


// game.grid[0][0] = 'X'
// game.makeMove(0, 0, 'X')
// game.displayGrid()
// game.renderGrid()
game.startGame('Meow', 'Ow')
// player1.describe()
// player1.makeMove(0, 0, 'X', player1.name)

// game.checkWinner()