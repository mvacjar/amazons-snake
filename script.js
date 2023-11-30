// Declaring the variables
const playBoard = document.querySelector('#playboard');
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;

// Place the fruit (food) randomly
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert('Game Over! Press OK to Replay.');
  location.reload();
}

// Change the direction of the snake and avoid overlap
const changeDirection = (e) => {
  if(e.key === 'ArrowUp' && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
    console.log(velocityY);
  } else if(e.key === 'ArrowDown' && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if(e.key === 'ArrowLeft' && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if(e.key === 'ArrowRight' && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  initGame();
}

// Initializing the game when function is called by intervals
const initGame = () => {
  if(gameOver) return handleGameOver();

  let placeItem = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`; // Place the food

  // If snake overlaps food, change food position and make snake grow +1
  if (snakeX === foodX && snakeY === foodY) { 
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  
  // Put the first item of the array in the current position
  snakeBody[0] = [snakeX, snakeY];

  // Continuously move the snake on every interval
  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    placeItem += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if(i!== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = placeItem;
}

let frequency = 200;

changeFoodPosition();
document.addEventListener('keydown', function(e){
  if(e.key == ' '){
    setIntervalId = setInterval(initGame, 150);
    console.log(frequency);
  } else {
    changeDirection(e);
  }
});


setIntervalId = setInterval(initGame, 200);