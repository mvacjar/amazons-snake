import { countdown } from "./timer.js";
import { checkScore } from "./score.js";
import {
  handleGamepadConnected,
  handleGamepadInput,
  controllerIndex,
  speedKeys,
  arrowKeys,
} from "./gamepad.js";

// Declaring variables
const playBoard = document.querySelector("#playboard");
let startBtnEl = document.querySelector("#start_btn");
const controls = document.querySelectorAll(".arrow_keys_container div");
let foodX, foodY;
let bombX, bombY;
let snakeX = 5,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;
let snakeBody = [];
let gameOver = { state: false };
let setIntervalId;
let speed = 200;
let currentScore = 0;
let currentScoreEl = document.querySelector("#currentScore");
currentScoreEl.textContent = currentScore;
let timer = { minutes: "00", seconds: 60 };
let timerEl = document.querySelector("#timer");
let timerSetInterval;
timerEl.textContent = "00:60";
let lastSpeedChangeTime = 0; // Variable to store the time of the last speed change
let changeSpeedMarker = 0; // set the speed level 0-4

// Declare top player list and variables to call localStorage items
let player1Name = JSON.parse(localStorage.getItem("player1Name")) || "Player 1";
let player1Score =
  Number(JSON.parse(localStorage.getItem("player1Score"))) || 0;

let player2Name = JSON.parse(localStorage.getItem("player2Name")) || "Player 2";
let player2Score =
  Number(JSON.parse(localStorage.getItem("player2Score"))) || 0;

let player3Name = JSON.parse(localStorage.getItem("player3Name")) || "Player 3";
let player3Score =
  Number(JSON.parse(localStorage.getItem("player3Score"))) || 0;

let topPlayersArr = [
  { player1: `${player1Name}`, score: `${player1Score}` },
  { player2: `${player2Name}`, score: `${player2Score}` },
  { player3: `${player3Name}`, score: `${player3Score}` },
];

// Select scoreboard items and show values based on localStorage items
let player1NameEl = document.querySelector("#player1Name");
let player1ScoreEl = document.querySelector("#player1Score");
player1NameEl.textContent = player1Name;
player1ScoreEl.textContent = player1Score;

let player2NameEl = document.querySelector("#player2Name");
let player2ScoreEl = document.querySelector("#player2Score");
player2NameEl.textContent = player2Name;
player2ScoreEl.textContent = player2Score;

let player3NameEl = document.querySelector("#player3Name");
let player3ScoreEl = document.querySelector("#player3Score");
player3NameEl.textContent = player3Name;
player3ScoreEl.textContent = player3Score;

// Place the fruit (food) randomly
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

// Place the boomb randomly
const changeBombPosition = () => {
  bombX = Math.floor(Math.random() * 30) + 1;
  bombY = Math.floor(Math.random() * 30) + 1;
  if (bombY === foodY && bombX === foodX) {
    changeBombPosition();
    changeFoodPosition();
  }
};

// Finish the game and alert it
const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over! Press OK to Replay.");
  location.reload();
};

// Calling changeDirection on each key click and passing key dataset value as an object
controls.forEach((button) =>
  button.addEventListener("click", () =>
    changeDirection({ key: button.dataset.key })
  )
);

// Change the direction of the snake and avoid overlap
const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
    console.log(velocityY);
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

// Handle gamepad buttons
function handleGamepadInputObjectChange() {
  if (arrowKeys.up && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
    console.log("controllerUP");
  } else if (arrowKeys.down && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
    console.log("controllerDown");
  } else if (arrowKeys.left && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
    console.log("controllerLeft");
  } else if (arrowKeys.right && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
    console.log("controllerRight");
  }
}

// Get the current timestamp in milliseconds
function changeSpeed() {
  const currentTime = new Date().getTime();

  // Check if at least one second (1000 milliseconds) has passed since the last speed change
  if (currentTime - lastSpeedChangeTime >= 1000) {
    if (
      speedKeys.up === true &&
      changeSpeedMarker >= 0 &&
      changeSpeedMarker <= 3
    ) {
      // Increment changeSpeedMarker to see what level of speed we are having
      changeSpeedMarker++;
      speed /= 2; //devide speed by half to double the speed in game
      lastSpeedChangeTime = currentTime; // Update last speed change time
      clearInterval(setIntervalId); //clear the current setintervalid
      setIntervalId = setInterval(initGame, speed); //set the new interval with the new halfed speed
    } else if (
      speedKeys.down === true &&
      changeSpeedMarker >= 1 &&
      changeSpeedMarker <= 3
    ) {
      // Decrement changeSpeedMarker to see what level of speed we are having
      changeSpeedMarker--;
      speed *= 2; //double speed to half the speed in game
      lastSpeedChangeTime = currentTime; // Update last speed change time
      clearInterval(setIntervalId); //clear the current setintervalid
      setIntervalId = setInterval(initGame, speed); //set the new interval with the new doubled speed
    }
  }
}

// Initializing the game when function is called by intervals
const initGame = () => {
  if (gameOver.state)
    return checkScore(
      currentScore,
      gameOver,
      player1Name,
      player1Score,
      player2Name,
      player2Score,
      player3Name,
      player3Score,
      setIntervalId,
      timerSetInterval,
      topPlayersArr
    );

  let placeItem = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`; // Place the food
  let placeBomb = `<div class="bomb" style="grid-area: ${bombY} / ${bombX}"></div>`; // Place the bomb

  // If snake overlaps food, change food position and make snake grow +1
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    changeBombPosition();
    snakeBody.push([foodX, foodY]);
    currentScore += 1;
    currentScoreEl.textContent = currentScore;
  }

  // If snake overlaps bomb, change bomb position and make snake shrink -1
  if (snakeX === bombX && snakeY === bombY) {
    if (snakeBody.length > 1) {
      changeBombPosition();
      changeFoodPosition();
      snakeBody.pop([bombX, bombY]);
      currentScore -= 1;
      currentScoreEl.textContent = currentScore;
    } else {
      gameOver.state = true;
    }
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
    gameOver.state = true;
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
      gameOver.state = true;
    }
  }
  placeItem += placeBomb;
  playBoard.innerHTML = placeItem;
  handleGamepadInput(arrowKeys, speedKeys);
  changeSpeed();
  handleGamepadInputObjectChange();
};

// Start timer when start button is clicked
startBtnEl.addEventListener("click", function () {
  let boardCoverEl = document.querySelector("#boardCover");
  let playboardWrapperEl = document.querySelector("#playboard_wrapper");
  boardCoverEl.style.display = "none";
  playboardWrapperEl.style.display = "block";

  timerSetInterval = setInterval(() => {
    countdown(gameOver, timer, timerEl, timerSetInterval);
  }, 1000);
});

changeFoodPosition();
changeBombPosition();
changeSpeed();
setIntervalId = setInterval(initGame, speed);
document.addEventListener("keydown", changeDirection);

//check if there is a controller connected, and if so run handleGamepadConnected
window.addEventListener("gamepadconnected", handleGamepadConnected);
window.addEventListener("gamepadbuttondown", handleGamepadInputObjectChange);

// Handle arrow key presses for the controllerinput. If an arrowkey is pressed then bolean is set to true.
document.addEventListener("keydown", (event) => {
  if (event.key === " ") (speedKeys.up = true), console.log("Speed up");
  if (event.key === "Shift") (speedKeys.down = true), console.log("Speed Down");
});

// Handle arrow key releases for the controller input. When an arrowkey is released the bolean is set to false.
document.addEventListener("keyup", (event) => {
  if (event.key === " ") (speedKeys.up = false), speedKeys;
  if (event.key === "Shift") (speedKeys.down = false), speedKeys;
});
