/*
Game Function:
-Player must guess a number between a min and max
-Player gets a certain amount of guesses 
-Notify player of guesses remianing 
-Notify the player of the correct answer if loose
-Let player choose to play again
*/

//Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI Elements
const game = document.getElementById('game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

//assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //check if won
  if (guess === winningNum) {
    //Game over - won

    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    //wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      //Game over - lost

      gameOver(
        false,
        `Game Over, you lost. The correct number was ${winningNum}`
      );
    } else {
      //Game continues - answer wrong

      //change border color
      guessInput.style.borderColor = 'red';

      //clear input
      guessInput.value = '';

      //tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

//Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');
  //Disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = color;
  //set text color
  message.style.color = color;
  //set message
  setMessage(msg);

  //Play again?
  guessBtn.value = 'Play again';
  guessBtn.className += 'play-again';
}

//get Winning Number
function getRandomNum() {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//set message function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
