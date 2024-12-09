let gameBoard = document.querySelector("#game-board"),
  buttons = document.querySelectorAll(".button"),
  restartButton = document.querySelector("#restart"),
  message = document.querySelector("#status"),
  turnX = true,
  isRunning = false;
// Wining Patterns
const winPatters = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    isRunning = true;
    if (turnX) {
      button.textContent = "X";
      turnX = false;
    } else {
      button.textContent = "O";
      turnX = true;
    }
    button.disabled = true;
    checkWinner();
  });
});

//   Enable Move
const enableMove = () => {
  buttons.forEach((button) => {
    button.disabled = false;
    button.textContent = "";
  });
};

//   Disable Move
const disableMove = () => {
  buttons.forEach((button) => {
    button.disabled = true;
  });
};

// Master function
const checkWinner = () => {
  let isDraw = true;
  winPatters.forEach((pattern) => {
    let posFirstVal = buttons[pattern[0]].textContent,
      posSecondVal = buttons[pattern[1]].textContent,
      posThirdVal = buttons[pattern[2]].textContent;
    if (posFirstVal != "" && posSecondVal != "" && posThirdVal != "") {
      if (posFirstVal === posSecondVal && posSecondVal === posThirdVal) {
        Array.from([
          buttons[pattern[0]],
          buttons[pattern[1]],
          buttons[pattern[2]],
        ]).forEach((element) => {
          element.classList.add("marker");
        });
        message.innerHTML = `Congrats! player <strong>${posFirstVal}</strong> wins!`;
        restartButton.style.display = "block";
        disableMove();
        isDraw = false;
      }
    }
  });

  //   Draw
  if (isDraw) {
    let allFilled = true;
    buttons.forEach((button) => {
      if (button.textContent === "") {
        allFilled = false;
      }
    });

    if (allFilled) {
      message.textContent = "It's draw!";
      restartButton.style.display = "block";
      disableMove();
    }
  }
};

// Restart Game
const restartGame = () => {
  enableMove();
  turnX = true;
  isRunning = false;
  message.textContent = ``;
  restartButton.style.display = "none";
  buttons.forEach((button) => {
    button.classList.remove("marker");
  });
};

restartButton.addEventListener("click", restartGame);
