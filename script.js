const gameArea = document.getElementById("game-area");
const timerElement = document.getElementById("timer");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart-button");
const levelElement = document.getElementById("level");

let startTime;
let timerInterval;
let redDot;
let currentLevel = 1;

// Function to start the game
function startGame() {
  // Clear the game area and reset the message
  gameArea.innerHTML = "";
  messageElement.style.display = "none";

  // Start the timer
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 100);

  // Update the level display
  levelElement.textContent = `Level: ${currentLevel}`;

  // Create the red dot
  redDot = document.createElement("div");
  redDot.id = "red-dot";
  redDot.style.top = `${Math.random() * 380}px`;
  redDot.style.left = `${Math.random() * 580}px`;
  redDot.addEventListener("click", handleWin);
  gameArea.appendChild(redDot);

  // Create emojis
  const emojiCount = 20 + currentLevel * 5; // Increase emojis with level
  for (let i = 0; i < emojiCount; i++) {
    createEmoji();
  }

  // Create red squares (traps)
  const redSquareCount = 3 + currentLevel; // Increase red squares with level
  for (let i = 0; i < redSquareCount; i++) {
    createRedSquare();
  }

  // Hide the restart button
  restartButton.style.display = "none";
}

// Function to create a moving emoji
function createEmoji() {
  const emoji = document.createElement("div");
  emoji.className = "emoji";

  // Randomly choose an emoji type
  const emojis = ["😊", "🥴", "🍉", "🐶", "🐱"];
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  // Set initial position to a random spot
  emoji.style.top = `${Math.random() * 380}px`;
  emoji.style.left = `${Math.random() * 580}px`;
  gameArea.appendChild(emoji);

  // Move the emoji randomly
  const speed = 2 + Math.random() * 3;
  const angle = Math.random() * 2 * Math.PI;
  const dx = Math.cos(angle) * speed;
  const dy = Math.sin(angle) * speed;

  function move() {
    let x = parseFloat(emoji.style.left) + dx;
    let y = parseFloat(emoji.style.top) + dy;

    // Check if the emoji hits the wall
    if (x < 0 || x > 580 || y < 0 || y > 380) {
      // Respawn at a random spot
      x = Math.random() * 580;
      y = Math.random() * 380;
    }

    emoji.style.left = `${x}px`;
    emoji.style.top = `${y}px`;

    requestAnimationFrame(move);
  }

  move();
}

// Function to create a red square (trap)
function createRedSquare() {
  const redSquare = document.createElement("div");
  redSquare.className = "red-square";
  redSquare.style.top = `${Math.random() * 380}px`;
  redSquare.style.left = `${Math.random() * 580}px`;
  redSquare.addEventListener("click", handleTrap);
  gameArea.appendChild(redSquare);
}

// Function to handle clicking a red square (trap)
function handleTrap() {
  clearInterval(timerInterval);
  messageElement.style.display = "block";
  restartButton.style.display = "block";
}

// Function to handle winning the game
function handleWin() {
  clearInterval(timerInterval);
  alert(`You found the red dot in ${((Date.now() - startTime) / 1000).toFixed(2)} seconds!`);

  // Move to the next level
  currentLevel++;
  startGame();
}

// Function to update the timer
function updateTimer() {
  const elapsedTime = (Date.now() - startTime) / 1000;
  timerElement.textContent = `Time: ${elapsedTime.toFixed(1)}s`;
}

// Event listener for the restart button
restartButton.addEventListener("click", () => {
  currentLevel = 1; // Reset level
  startGame();
});

// Start the game initially
startGame();