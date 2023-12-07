
export function countdown(gameOver, timer, timerEl, timerSetInterval){
  if(timer.seconds == 0){
    clearInterval(timerSetInterval);
    gameOver.state = true;
  }
  if(timer.seconds != 0){
    if(timer.seconds >= 1 && timer.seconds <= 10){
      timer.seconds -= 1;
      timer.minutes = '00';
      timerEl.textContent = `${timer.minutes}:0${timer.seconds}`
    } else {
      timer.seconds -= 1;
      timer.minutes = '00';
      timerEl.textContent = `${timer.minutes}:${timer.seconds}`
    }
  }
}

