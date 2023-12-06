let lastSpeedChangeTime = 0; // Variable to store the time of the last speed change
let changeSpeedMarker = 0;

export function changeSpeed() {
  // Get the current timestamp in milliseconds
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
  return speed;
}
