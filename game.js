let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ['red', 'blue', 'green', 'yellow'];
let randomColorChooser = buttonColors;
let level = 0;

function nextSequence() {
  level++;
  $('#level-title')[0].innerHTML = `Level ${level}`;
  let randomNumber = Math.floor(Math.random() * 4);
  setTimeout(() => {
    playSound(buttonColors[randomNumber]);
    animateSequence(`${buttonColors[randomNumber]}`);
    gamePattern.push(buttonColors[randomNumber]);
  }, 200);
  return randomNumber;
}

function playSound(color) {
  let soundChosen = new Audio(`sounds/${color}.mp3`);
  soundChosen.play();
}

function animateSequence(color) {
  $(`.${color}`).css('background-color', 'white');
  setTimeout(function () {
    $(`.${color}`).css('background-color', `${color}`);
  }, 100);
}

function animatePress(clicked) {
  $(`#${clicked}`).addClass('pressed');
  setTimeout(function () {
    $(`#${clicked}`).removeClass('pressed');
  }, 100);
}

function checkAnswer() {
  for (i = 0; i < userClickedPattern.length; i++) {
    console.log(userClickedPattern[i], gamePattern[i]);
    if (gamePattern[i] === userClickedPattern[i]) {
      if (i === gamePattern.length - 1) {
        userClickedPattern = [];
        setTimeout(() => nextSequence(), 1000);
      }
    } else {
      let sound = new Audio('sounds/wrong.mp3');
      sound.play();
      $('body').addClass('game-over');
      setTimeout(function () {
        $('body').removeClass('game-over');
      }, 200);
      $('#level-title')[0].innerHTML = 'Game Over! Press any key to Restart';
      startOver();
    }
  }
}

function startOver() {
  level = 0;
}

$(document).keydown(function () {
  if (level === 0) {
    setTimeout(() => nextSequence(), 500);
    userClickedPattern = [];
    gamePattern = [];
  }
});

$('.btn').click(function () {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer();
});
