const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

// food
let foodX: number;
let foodY: number;

//snake
let snakeX = 10;
let snakeY = 10;

//Game Over
let GameOver = false;

//interval valid
let intervalValid: number;
//snakeBody

//score

let score: any = 0;

let snakeBody: any[][] = [];
//velocity
let velocityX = 0;
let velocityY = 0;

let highScore: any = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score:${highScore}`;

const changeFoodPosition = () => {
  // passing a random 0-30 value as food position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  // here we clear the timer and reloading the page
  clearInterval(intervalValid);
  alert("Game Over!! press ok to return");
  location.reload();
};
const changeDirection = (e: { key: any }) => {
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

controls.forEach((key) => {
  // key.addEventListener("click", () =>
  //   changeDirection({ key: key.dataset.key })
  // );

  controls.forEach((key) => {
    const element = key as HTMLElement;
    key.addEventListener("click", () =>
      changeDirection({ key: element.dataset.key })
    );
  });
});
const init = () => {
  if (GameOver) {
    return handleGameOver();
  }

  let htmlMarkUp = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;

  //checking if the snake eat the food
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;
    scoreElement.innerHTML = `Score: ${score} `;
    localStorage.setItem("high-score", highScore);
    highScore = score >= highScore ? score : highScore;
    highScoreElement.innerHTML = `High Score:${highScore}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
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

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkUp += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
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
