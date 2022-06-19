var userClickedPattern = []; //array for user enteries
var gamePattern = []; //random array which will be predefined

var started = false; //boolean if game started or not
var level = 0; //level

var buttonColors = ["red", "blue", "green", "yellow"]; //array of color
//Onclick
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  //calling with last element index
  checkAnswer(userClickedPattern.length - 1);

});


// Function to check answers

function checkAnswer(currentLevel) {
  console.log(gamePattern);
  console.log(userClickedPattern);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("wrong");
    $("#level-title").text("Game-Over 🥲 Press any key to Start ");
    $("body").addClass("game-over");
    playSound("wrong");

    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    startOver();


  }
}




//on key pressed

$(document).keydown(function() {
  var level = 0;
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  };
});





//function to gnerate sequence per level
function nextSequence() {
  //once level is completed reset the userClickedPattern array
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  randomNumber = Math.floor(Math.random() * 4); //randomNumber

  var randomChosenColor = buttonColors[randomNumber]; //random color chosed from array

  gamePattern.push(randomChosenColor); //pushing colors to gamePattern array

  var chosenId = "#" + randomChosenColor; // id which store chosen color
  $(chosenId).fadeOut("fast").fadeIn("fast");

  playSound(randomChosenColor);
}
//to play sound per button
function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();

}

//addded .pressed CSS class to make animation on clicking
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}

// To restart the gamePattern
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;

}
