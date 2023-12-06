// Declaring variables
const arrowKeys = { left: false, up: false, right: false, down: false }; // setting object of arrowkeys to false
let speedKeys = { up: false, down: false };
let controllerIndex = null;

//These three needs to be in the initGame loop
//handleGamepadInput();
//changeSpeed();
//check if there is a controller connected, and if so run handleGamepadConnected
//window.addEventListener("gamepadconnected", handleGamepadConnected);

//set controllerIndex to the index of the connected controller.
export function handleGamepadConnected(event) {
  controllerIndex = event.gamepad.index;
  console.log("Gamepad connected. Index: ", controllerIndex);
}

export function handleGamepadInput() {
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
}

// Handle arrow key presses. If an arrowkey is pressed then bolean is set to true.
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") arrowKeys.left = true;
  if (event.key === "ArrowUp") arrowKeys.up = true;
  if (event.key === "ArrowRight") arrowKeys.right = true;
  if (event.key === "ArrowDown") arrowKeys.down = true;
  if (event.key === " ") (speedKeys.up = true), console.log(speedKeys);
  if (event.key === "Shift") (speedKeys.down = true), console.log(speedKeys);
});

// Handle arrow key releases. When an arrowkey is released the bolean is set to false.
document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") arrowKeys.left = false;
  if (event.key === "ArrowUp") arrowKeys.up = false;
  if (event.key === "ArrowRight") arrowKeys.right = false;
  if (event.key === "ArrowDown") arrowKeys.down = false;
  if (event.key === " ") (speedKeys.up = false), console.log(speedKeys);
  if (event.key === "Shift") (speedKeys.down = false), console.log(speedKeys);
});
