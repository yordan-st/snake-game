// JavaScript code for the Snake game

// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Initialize the snake as an array of objects with x and y coordinates
let snake = [{x: 200, y: 200}, {x: 190, y: 200}, {x: 180, y: 200}];

// dx and dy represent the snake's direction. Here, it starts moving to the right.
let dx = 10;
let dy = 0;

// Initialize the food's coordinates
let food = {x: 0, y: 0};

// Flag to prevent the snake from immediately reversing direction
let changingDirection = false;

// Place the first food on the board
placeFood();

// Listen for key presses to change the snake's direction
document.addEventListener("keydown", changeDirection);

// Update the game state every 100 milliseconds
setInterval(update, 100);

// Main game loop
function update() {
    // Check if the game has ended
    if (didGameEnd()) return;

    // Reset the changing direction flag
    changingDirection = false;

    // Clear the canvas, draw the food, update the snake's position, and draw the snake
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
}

// Clear the canvas
function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake on the canvas
function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = 'lightgreen';
        ctx.strokeStyle = 'darkgreen';
        ctx.fillRect(part.x, part.y, 10, 10);
        ctx.strokeRect(part.x, part.y, 10, 10);
    });
}

// Move the snake in the current direction
function advanceSnake() {
    // Create a new head based on the current direction
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // Add the new head to the beginning of the snake body
    snake.unshift(head);

    // Check if the snake has eaten food
    if (head.x === food.x && head.y === food.y) {
        // Place a new food on the board
        placeFood();
    } else {
        // Remove the last part of the snake body
        snake.pop();
    }
}

// Place food at a random location
function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

// Draw the food on the canvas
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Change the direction of the snake based on the key pressed
function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    // Change direction based on the key pressed (arrow keys)
    if (keyPressed === 37 && !goingRight) { dx = -10; dy = 0; }
    else if (keyPressed === 38 && !goingDown) { dx = 0; dy = -10; }
    else if (keyPressed === 39 && !goingLeft) { dx = 10; dy = 0; }
    else if (keyPressed === 40 && !goingUp) { dx = 0; dy = 10; }
}

// Check if the game has ended
function didGameEnd() {
    // Check if the snake has collided with itself
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }

    // Check if the snake has hit the wall
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height - 10;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}