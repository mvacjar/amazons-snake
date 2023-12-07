export { controllerIndex, speedKeys, arrowKeys };

let speedKeys = { up: false, down: false }; //set speedkeys up and down to false

let controllerIndex = null;

const arrowKeys = { left: false, up: false, right: false, down: false }; // setting object of arrowkeys to false


//set controllerIndex to the index of the connected controller.
export function handleGamepadConnected(event) {
  controllerIndex = event.gamepad.index;
  console.log("Gamepad connected. Index: ", controllerIndex);
};

export function handleGamepadInput(arrowKeys, speedkeys) {
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


