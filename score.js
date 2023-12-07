

export function checkScore(currentScore, gameOver, player1Name, player1Score, 
  player2Name, player2Score, player3Name, player3Score, setIntervalId, timerSetInterval, topPlayersArr){
  if(gameOver.state){
    
    if(currentScore > player1Score || player1Score === 0){
      console.log('first place');
      clearInterval(setIntervalId);
      clearInterval(timerSetInterval);

      player3Name = localStorage.setItem('player3Name',JSON.stringify(topPlayersArr[1].player2));
      player2Name = localStorage.setItem('player2Name',JSON.stringify(topPlayersArr[0].player1));

      player3Score = localStorage.setItem('player3Score',JSON.stringify(topPlayersArr[1].score));
      player2Score = localStorage.setItem('player2Score',JSON.stringify(topPlayersArr[0].score));

      let inputName1 = prompt('YOU GOT THE FIRST PLACE!\n Input your name for the leaderboard:');

      player1Name = localStorage.setItem('player1Name',JSON.stringify(inputName1));
      player1Score = localStorage.setItem('player1Score',currentScore);

      setTimeout(() => location.reload(), 2000);

    } else if(currentScore > player2Score || player2Score === 0){
      console.log('second place');
      clearInterval(setIntervalId);
      clearInterval(timerSetInterval);

      player3Name = localStorage.setItem('player3Name',JSON.stringify(topPlayersArr[1].player2));
      player3Score = localStorage.setItem('player3Score',JSON.stringify(topPlayersArr[1].score));

      let inputName2 = prompt('YOU GOT THE SECOND PLACE!\n Input your name for the leaderboard:');
      player2Name = localStorage.setItem('player2Name',JSON.stringify(inputName2));
      player2Score = localStorage.setItem('player2Score',currentScore);

      setTimeout(() => location.reload(), 2000);

    } else if(currentScore > player3Score || player3Score === 0){
      console.log('third place');
      clearInterval(setIntervalId);
      clearInterval(timerSetInterval);

      let inputName3 = prompt('YOU GOT THE THIRD PLACE!\n Input your name for the leaderboard:');
      player3Name = localStorage.setItem('player3Name',JSON.stringify(inputName3));
      player3Score = localStorage.setItem('player3Score',currentScore);

      setTimeout(() => location.reload(), 2000);

    } else {
      clearInterval(setIntervalId);
      clearInterval(timerSetInterval);
      setTimeout(() => alert('Game Over! Press OK to Replay.'));
      location.reload();
    };

  }
}