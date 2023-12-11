export { controllerIndex, speedKeys, arrowKeys };

let speedKeys = { up: false, down: false }; //set speedkeys up and down to false

let controllerIndex = null;

const arrowKeys = { left: false, up: false, right: false, down: false }; // setting object of arrowkeys to false


//set controllerIndex to the index of the connected controller.
export function handleGamepadConnected(event) {
  controllerIndex = event.gamepad.index;
  console.log("Gamepad connected. Index: ", controllerIndex);
};


// function to handle the gamepads inputs
// this changes the values in the arrowKeys object(and speedKeys object) that is used in the handleGamepadInputObjectChange function.
export function handleGamepadInput(arrowKeys, speedkeys) {
  if (controllerIndex !== null) {
    // create the gamepad object from the browsers detected gampad
    const gamepad = navigator.getGamepads()[controllerIndex];
    const axes = gamepad.axes;
    const buttons = gamepad.buttons;

    //if any of the set buttons is pressed it sets the arrowKeys or speedKeys to true
    arrowKeys.up = buttons[12].pressed;
    arrowKeys.down = buttons[13].pressed;
    arrowKeys.left = buttons[14].pressed;
    arrowKeys.right = buttons[15].pressed;
    speedKeys.up = buttons[1].pressed;
    speedKeys.down = buttons[2].pressed;

    // axes is an array with two values between -1 and 1
    // creates an variable with the values from each position of the array
    const xAxis = axes[0]; // X-axis value of the left stick
    const yAxis = axes[1]; // Y-axis value of the left stick

    // create an variable so that if the sticks x or y values are
    const stickDeadZone = 0.8;


    // The following if statement is so that the stick has to have move 80% before the arrowkeys becomes true
    
    //if the yAxis value is smaller or equal to the negative stickDeadZone then arrowKeys.up is true(between -0.8 and -1).
    if (yAxis <= -stickDeadZone) {
      arrowKeys.up = true;  
      //if the yAxis value is greater or equal to the positive stickDeadZone then arrowKeys.down is true(between 0.8 and 1).
    } else if (yAxis >= stickDeadZone) {
      arrowKeys.down = true;
    }
    //same as above but on the x-axis
    if (xAxis <= -stickDeadZone) {
      arrowKeys.left = true;
    } else if (xAxis >= stickDeadZone) {
      arrowKeys.right = true;
    }
  }
};


