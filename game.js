
// array containing the pattern until now
var gamePattern = [];

// array containing ids of buttons pressed by user
var userClickedPattern = [];

// array containg the colours of buttons
var buttonColours = ["green","red","yellow","blue"];

// denotes the level number
var level = 0;

var boolGameOver;
var gameStarted = false;

// detecting keypress
$(document).keydown(function()
{
  // only for the first keypress
  // also when game gets over and user wants to play again
  if(gameStarted == false)
  {
    nextColour();
    gameStarted = true;
    boolGameOver = false;
  }
});

// detecting click on buttons and storing the id of the clicked button
// also playing the sound of button click
var i = 0;
$(".btn").click(function()
{
    var userChosencolor = this.id;
    userClickedPattern.push(userChosencolor);

    // playing the animation of the button clicked by user
    playClickAnimation(this.id);

    // playing the sound of button when user clicks on interval
    playButtonSound(this.id);

    // check if user made correct clicks
    checkAnswer();
});


// it generates the next random colour in the sequence
function nextColour()
{
  // generates a random number between 0 and 3
  var randomNumber = Math.floor( Math.random() * 4);

  // choosing a random colour
  randomChosenColour = buttonColours[randomNumber];

  // adding the current colour to the pattern
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  // selecting the button and adding flash animation to it
  var idRandomButton = "#" + randomChosenColour;
  $(idRandomButton).fadeOut(150).fadeIn(150);

  // playing the respective sound of the random button
  playButtonSound(randomChosenColour);

  // increments level and changes level text
  $("#level-title").text("Level " + level);
  level++;
}

// finds the audio file of the button and plays its sound
function playButtonSound(colourOfButton)
{
  var location = "sounds/" + colourOfButton + ".mp3" ;
  var audioOfButton = new Audio(location);
  audioOfButton.play();
}

// finds the button using its id and plays its animation
function playClickAnimation(colourOfButton)
{
  var button = "#" + colourOfButton ;
  $(button).addClass("pressed");

  // removes the class 'pressed' after a delay of 100 ms
  setTimeout(function()
  {
    $(button).removeClass("pressed");
  } , 100);
}

function checkAnswer()
{
  // checking if what user clicked on is the same as the required random pattern turn by turn
  if(gamePattern[i] == userClickedPattern[i])
  {
    i++;
  }

  // when user made an incorrect click
  // game is over
  else
  {
    gameOver();
    boolGameOver = true;
  }

  // if user correctly clicked on all the desired buttons, then send him to the next level
  if(i == gamePattern.length && boolGameOver==false)
  {
    // resetting data for next level
    i = 0;
    userClickedPattern = [];

    // next level after delay of a second
    setTimeout(nextColour,1000);
  }
}

function gameOver()
{
  // playing game over audio
  var gameOverSound = new Audio("sounds/wrong.mp3");
  gameOverSound.play();

  // game over text
  $("#level-title").text("Game Over! You clicked the wrong button. Press any key to play again");

  // game over animation through css
  $("body").addClass("game-over");
  setTimeout(function()
  {
    $("body").removeClass("game-over");
  } , 200);

  // function call for resetting data for next game
  reset();
}

function reset()
{
  // resetting all the data
  level = 0;
  gameStarted = false;
  gamePattern = [];
  i = 0;
  userClickedPattern = [];
}
