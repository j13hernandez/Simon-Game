let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ['red', 'blue', 'green', 'yellow'];
let randomColorChooser = buttonColors;
let level = 0;

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  playSound(buttonColors[randomNumber]);
  $(`#${buttonColors[randomNumber]}`).fadeOut(100).fadeIn(100);
  level++;
  $('#level-title')[0].innerHTML = `Level ${level}`;
  gamePattern.push(buttonColors[randomNumber]);
  return randomNumber;
}

function playSound(color) {
  let soundChosen = new Audio(`sounds/${color}.mp3`);
  soundChosen.play();
}

function animatePress(clicked) {
  $(`#${clicked}`).addClass('pressed');
  setTimeout(function () {
    $(`#${clicked}`).removeClass('pressed');
  }, 100);
}

$(document).keydown(function () {
  if (level === 0) {
    nextSequence();
  }
  console.log(gamePattern);
});

// gamePattern.push(randomColorChooser);

$('.btn').click(function () {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  nextSequence();
  console.log(gamePattern);
});
