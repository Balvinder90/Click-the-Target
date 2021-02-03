// UI Variables
const title = document.querySelector("title");

const container = document.querySelector(".container");

const rulesPanel = document.querySelector(".rules");
const playButton = document.querySelector(".play");

const scoresPanel = document.querySelector(".scores");

const currentScore = document.querySelector(".current-score .circle");
currentScore.innerText = 0;

const highScore = document.querySelector(".high-score .circle");
highScore.innerText = 0;

const resetHighScore = document.querySelector(".reset-highscore");

const medal = document.querySelector(".medal .circle");

const playAgainButton = document.querySelector(".play-again");

const target = document.querySelector(".target");

// Game state variables
const posInterval = 685;
let prevHighScore = 0;
let medalType = "";
let round = 1;

// LocalStorage Check
if (localStorage.getItem("highScore")) {
  highScore.innerText = localStorage.getItem("highScore");
} else {
  highScore.innerText = 0;
}

// Set height and width of target function
const targetDimensions = () => {
  target.style.width = "5.5rem";
  target.style.height = "5.5rem";
};

// Change position of the target function
const changePos = () => {
  let containerSize = container.getBoundingClientRect();
  let posX = containerSize.width;
  let posY = containerSize.height;

  let randX = Math.round(Math.random() * posX);
  let randY = Math.round(Math.random() * posY);

  if (randX < 50) {
    randX += 50;
  }
  if (randX > 450) {
    randX -= 50;
  }
  if (randY < 50) {
    randY += 50;
  }
  if (randY > 450) {
    randY -= 50;
  }

  target.style.top = `${randY}px`;
  target.style.left = `${randX}px`;
};

// Initialize first game function
const startGame = () => {
  title.textContent = `Click the Target - Round ${round}`;

  targetDimensions();

  rulesPanel.classList.add("fade-out");

  let removeRulesPanel = setTimeout(() => {
    rulesPanel.classList.add("d-none");
    target.classList.remove("d-none");
  }, 1000);

  // Game length
  let seconds = 20;

  // How long for the target to change position
  let change = setInterval(changePos, posInterval);

  const check = () => {
    --seconds;
    if (seconds === 0) {
      clearInterval(change);
      setTimeout(() => {
        target.classList.add("fade-out");
      }, 500);
      setTimeout(() => {
        target.classList.add("d-none");
      }, 1000);
      setTimeout(() => {
        scoresPanel.classList.remove("d-none");
        scoresPanel.classList.add("fade-in");
      }, 1500);
    }
  };

  setInterval(check, 1000);
};

// Start a new game function
const newGame = () => {
  round++;
  title.textContent = `Click the Target - Round ${round}`;

  targetDimensions();

  prevHighScore = 0;

  currentScore.innerText = 0;

  medal.classList.remove(
    "bronze-medal",
    "silver-medal",
    "gold-medal",
    "medal-animation"
  );
  setTimeout(() => {
    scoresPanel.classList.remove("fade-in");
  }, 500);
  setTimeout(() => {
    scoresPanel.classList.add("fade-out");
  }, 1000);
  setTimeout(() => {
    scoresPanel.classList.add("d-none");
  }, 1500);
  setTimeout(() => {
    target.classList.remove("fade-out");
    target.classList.remove("d-none");
  }, 2000);

  // Game length, add additional 2 seconds because of timeout events
  let seconds = 22;

  // How long for the target to change position
  let change = setInterval(changePos, posInterval);

  // Check how much time remains function
  const check = () => {
    --seconds;
    if (seconds === 0) {
      clearInterval(change);
      setTimeout(() => {
        target.classList.add("fade-out");
      }, 500);
      setTimeout(() => {
        target.classList.add("d-none");
      }, 1000);
      setTimeout(() => {
        scoresPanel.classList.remove("d-none");
        scoresPanel.classList.add("fade-in");
      }, 1500);
    }
  };

  setInterval(check, 1000);
};

// Award function
const award = medalType => {
  if (medalType === "gold") {
    medal.classList.add("gold-medal", "medal-animation");
    target.style.height = "2.7rem";
    target.style.width = "2.7rem";
  } else if (medalType === "silver") {
    medal.classList.add("silver-medal", "medal-animation");
    target.style.height = "3.5rem";
    target.style.width = "3.5rem";
  } else if (medalType === "bronze") {
    medal.classList.add("bronze-medal", "medal-animation");
    target.style.height = "4.5rem";
    target.style.width = "4.5rem";
  }
};

// Update score on each target click function
const updateScores = () => {
  currentScore.innerText++;

  if (Number(currentScore.innerText) > Number(highScore.innerText)) {
    prevHighScore = currentScore.innerText;
    highScore.innerText = prevHighScore;
    localStorage.setItem("highScore", highScore.innerText);
  }

  if (Number(currentScore.innerText) === 12) {
    medalType = "gold";
    award(medalType);
  } else if (Number(currentScore.innerText) === 9) {
    medalType = "silver";
    award(medalType);
  } else if (Number(currentScore.innerText) === 6) {
    medalType = "bronze";
    award(medalType);
  }
};

// Clear local storage function
const clearStorage = () => {
  localStorage.clear();
  highScore.innerText = 0;
  console.log("you clicked me");
};

// Click events
playButton.addEventListener("click", startGame);

target.addEventListener("click", updateScores);

playAgainButton.addEventListener("click", newGame);

resetHighScore.addEventListener("click", clearStorage);
