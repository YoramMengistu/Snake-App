var playBoard = document.querySelector(".play-board");
var scoreElement = document.querySelector(".score");
var highScoreElement = document.querySelector(".high-score");
var controls = document.querySelectorAll(".controls i");
// food
var foodX;
var foodY;
//snake
var snakeX = 10;
var snakeY = 10;
//Game Over
var GameOver = false;
//interval valid
var intervalValid;
//snakeBody
//score
var score = 0;
var snakeBody = [];
//velocity
var velocityX = 0;
var velocityY = 0;
var highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = "High Score:" + highScore;
var changeFoodPosition = function () {
  // passing a random 0-30 value as food position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};
var handleGameOver = function () {
  // here we clear the timer and reloading the page
  clearInterval(intervalValid);
  alert("Game Over!! press ok to return");
  location.reload();
};
var changeDirection = function (e) {
  // here we changing velocity value based on key press
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};
controls.forEach(function (key) {
  // key.addEventListener("click", () =>
  //   changeDirection({ key: key.dataset.key })
  // );
  controls.forEach(function (key) {
    var element = key;
    key.addEventListener("click", function () {
      return changeDirection({ key: element.dataset.key });
    });
  });
});
var init = function () {
  if (GameOver) {
    return handleGameOver();
  }
  var htmlMarkUp =
    '<div class="food" style="grid-area:' + foodY + "/" + foodX + '"></div>';
  //checking if the snake eat the food
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;
    scoreElement.innerHTML = "Score: " + score + " ";
    localStorage.setItem("high-score", highScore);
    highScore = score >= highScore ? score : highScore;
    highScoreElement.innerHTML = "High Score:" + highScore;
  }
  for (var i = snakeBody.length - 1; i > 0; i--) {
    // shifting forward the values of the element in the snake body by one.
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY]; // setting the first element of snake body to current snake position
  snakeX += velocityX;
  snakeY += velocityY;
  // checking if the snake out of wall. if so game over is true
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    GameOver = true;
  }
  for (var i = 0; i < snakeBody.length; i++) {
    htmlMarkUp +=
      '<div class="head" style="grid-area:' +
      snakeBody[i][1] +
      "/" +
      snakeBody[i][0] +
      '"></div>';
    // checking if the snake head hit the body.
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      GameOver = true;
    }
  }
  playBoard.innerHTML = htmlMarkUp;
};
changeFoodPosition();
intervalValid = setInterval(init, 125);
document.addEventListener("keydown", changeDirection);
