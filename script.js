
// Declaring variables
const arrowKeys = { left: false, up: false, right: false, down: false }; // setting object of arrowkeys to false
const speedKeys = { up: false, down: false };
const playBoard = document.querySelector("#playboard");
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;
let speed = 200;
let controllerIndex = null;

// Place the fruit (food) randomly
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over! Press OK to Replay.");
  location.reload();
};

//set controllerIndex to the index of the connected controller. 
function handleGamepadConnected(event) {
  controllerIndex = event.gamepad.index;
  console.log("Gamepad connected. Index: ", controllerIndex);
};

function handleGamepadInput() {
  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];
    const axes = gamepad.axes;

    const buttons = gamepad.buttons;
    arrowKeys.up = buttons[12].pressed;
    arrowKeys.down = buttons[13].pressed;
    arrowKeys.left = buttons[14].pressed;
    arrowKeys.right = buttons[15].pressed;
    speedKeys.up = buttons[1].pressed;
    speedKeys.down = buttons[2].pressed;
    
    const xAxis = axes[0]; // X-axis value of the left stick
    const yAxis = axes[1]; // Y-axis value of the left stick
    const stickDeadZone = 0.8;

    const upDownValue = gamepad.axes[1];

    if (upDownValue <= -stickDeadZone) {
      arrowKeys.up = true;
    } else if (upDownValue >= stickDeadZone) {
      arrowKeys.down = true;
    }

    const leftRightValue = gamepad.axes[0];
    
    if (leftRightValue <= -stickDeadZone) {
      arrowKeys.left = true;
    } else if (leftRightValue >= stickDeadZone) {
      arrowKeys.right = true;
    }
  }
};

// if an arrowkey is pressed and the velocity is not in the oposite direction, set new velocity to the direction of the arrowkey
function movePlayer() {
  if (arrowKeys.up && velocityY != 1) velocityX = 0, velocityY = -1;
  if (arrowKeys.down && velocityY != -1) velocityX = 0, velocityY = 1;
  if (arrowKeys.left && velocityX != 1) velocityX = -1, velocityY = 0;
  if (arrowKeys.right && velocityX != -1) velocityX = 1, velocityY = 0;
}


// Sett the double speed
function changeSspeed() {
  if (speedKeys.up === true) {
      speed /= 2; // increase speed (double)
      clearInterval(setIntervalId);
      setIntervalId = setInterval(initGame, speed);
  } else if (speedKeys.down === true) {
      speed *= 2; // decrease speed (half)
      clearInterval(setIntervalId);
      setIntervalId = setInterval(initGame, speed);
  }
  return speed;
};


// Initializing the game when function is called by intervals
const initGame = () => {
  if (gameOver) return handleGameOver();

  let placeItem = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`; // Place the food

  // If snake overlaps food, change food position and make snake grow +1
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
  }

  // Push the fruit position to the 0/last element of the body-array
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  // Put the first item of the array in the current position
  snakeBody[0] = [snakeX, snakeY];

  // Continuously move the snake on every interval
  snakeX += velocityX;
  snakeY += velocityY;

  // Collision walls
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  // Read the array snake body
  for (let i = 0; i < snakeBody.length; i++) {
    placeItem += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    // Check for a collision between the head and any other body parts
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }
  playBoard.innerHTML = placeItem;
  movePlayer();
  handleGamepadInput();
};

// Handle arrow key presses. If an arrowkey is pressed then bolean is set to true.
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') arrowKeys.left = true;
  if (event.key === 'ArrowUp') arrowKeys.up = true;
  if (event.key === 'ArrowRight') arrowKeys.right = true;
  if (event.key === 'ArrowDown') arrowKeys.down = true;
  if (event.key === ' ') speedKeys.up = true, console.log(speedKeys);
  if (event.key === 'Shift') speedKeys.down = true, console.log(speedKeys);
});

// Handle arrow key releases. When an arrowkey is released the bolean is set to false.
document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft') arrowKeys.left = false;
  if (event.key === 'ArrowUp') arrowKeys.up = false;
  if (event.key === 'ArrowRight') arrowKeys.right = false;
  if (event.key === 'ArrowDown') arrowKeys.down = false;
  if (event.key === ' ') speedKeys.up = false, console.log(speedKeys);
  if (event.key === 'Shift') speedKeys.down = false, console.log(speedKeys);
});

//check if there is a controller connected, and if so run handleGamepadConnected
window.addEventListener("gamepadconnected", handleGamepadConnected);

initGame();
setIntervalId = setInterval(initGame, speed);
changeFoodPosition();
changeSpeed();

