const app = {
    player: {
        x: 0,
        y: 0,
        direction: 'right',
    },
    tagetCell: {
        x: 5,
        y: 3,
    },
    gameOver: false,
    count: 0,

    /**
     * method to initialise the game
     */
    init: () => {
        app.redrawBoard();
        app.listenKeyboardEvents();
    },

    /**
     * method that deletes, displays the grid and checks if the game is finished.
     */
    redrawBoard: () => {
        app.clearBoard();
        app.drawBoard();
        app.isGameOver();
    },

    /**
     * method of deleting the grid
     */
    clearBoard: () => {
        const divRows = document.querySelectorAll(".row");
        const divboard = document.querySelector(".board");
        for (divRow of divRows) {
            divboard.removeChild(divRow)
        }
    },

    /**
     * method that displays the grid, the character and the end point
     */
    drawBoard: () => {
        for (let row = 0; row < 4; row++) {
            let divRow = document.createElement('div');
            divRow.className = "row";
            for (let cell = 0; cell < 6; cell++) {
                divCell = document.createElement('div');
                divCell.className = "cell";
                if (row === app.tagetCell.y && cell === app.tagetCell.x) {
                    divCell.classList.add("targetCell");
                }
                if (row === app.player.y && cell === app.player.x) {
                    let divGamer = document.createElement('div');
                    divGamer.className = "player";
                    switch (app.player.direction) {
                        case 'left':
                            divGamer.classList.add("direction-left");
                            break;
                        case 'up':
                            divGamer.classList.add("direction-up");
                            break;
                        case 'right':
                            divGamer.classList.add("direction-right");
                            break;
                        case 'down':
                            divGamer.classList.add("direction-down");
                            break;
                    }
                    divCell.appendChild(divGamer);
                }
                divRow.appendChild(divCell);
            }
            document.querySelector(".board").appendChild(divRow);
        }
    },

    /**
     * method of ending the game if the player is on the finishing square
     */
    isGameOver: () => {
        if (app.player.x === app.tagetCell.x && app.player.y === app.tagetCell.y) {
            let message = document.querySelector('#messageFlashEndGame');
            message.className = "messageFlashEndGame";
            message.textContent = `Bravo!!! vous avez gagné en ${app.count} déplacements`;
            app.gameOver = true;
        }
    },

    /**
     * method that allows you to move with the keys by recognising the keys pressed
     */
    listenKeyboardEvents: () => {
        window.addEventListener("keydown", function (event) {
            if (event.preventDefaulted) {
                return;
            } else if (event.code === "ArrowUp") {
                app.moveForward();
            } else if (event.code === "ArrowLeft") {
                app.turnLeft();
            } else if (event.code === "ArrowRight") {
                app.turnRight();
            }
        })
    },

    /**
     * method that allows the player to advance and prevents him from leaving the grid
     * @returns voide
     */
    moveForward: () => {
        if (!!app.gameOver) {
            return;
        }
        app.count++;
        if (
            app.player.y === 0 && app.player.direction === "up"
            || app.player.y === 3 && app.player.direction === "down"
            || app.player.x === 0 && app.player.direction === "left"
            || app.player.x === 5 && app.player.direction === "right"
        ) {
            return;
        } else {
            switch (app.player.direction) {
                case 'left':
                    app.player.x -= 1;
                    break;
                case 'up':
                    app.player.y -= 1;
                    break;
                case 'right':
                    app.player.x += 1;
                    break;
                case 'down':
                    app.player.y += 1;
                    break;
            }
        }
        app.redrawBoard();
    },

    /**
    * method that change the direction of the player counter-clockwise when I press the right arrow
    * @returns void
    */
    turnLeft: () => {
        if (!!app.gameOver) {
            return;
        }
        app.count++;
        switch (app.player.direction) {
            case 'left':
                app.player.direction = 'down';
                break;
            case 'up':
                app.player.direction = 'left';
                break;
            case 'right':
                app.player.direction = 'up';
                break;
            case 'down':
                app.player.direction = 'right';
                break;
        }
        app.redrawBoard();
    },

    /**
     * method that changes the player's direction clockwise when I press the left arrow
     * @returns void
     */
    turnRight: () => {
        if (!!app.gameOver) {
            return;
        }
        app.count++;
        switch (app.player.direction) {
            case 'left':
                app.player.direction = 'up';
                break;
            case 'up':
                app.player.direction = 'right';
                break;
            case 'right':
                app.player.direction = 'down';
                break;
            case 'down':
                app.player.direction = 'left';
                break;
        }
        app.redrawBoard();
    },
};

document.addEventListener('DOMContentLoaded', app.init);