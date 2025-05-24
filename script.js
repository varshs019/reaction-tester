// Get references to the box and result elements
const box = document.getElementById("box");
const result = document.getElementById("result");
const gameArea = document.getElementById("game-area");

let startTime; // Variable to store the time when the box appears
let timeoutId; // To store the timeout ID for clearing

// Function to make the box appear after a random delay
function appearAfterDelay() {
  // Clear any existing timeout to prevent multiple boxes appearing
  clearTimeout(timeoutId);

  // Generate a random delay between 500ms and 2000ms (0.5 to 2 seconds)
  const delay = Math.random() * 1500 + 500; 

  timeoutId = setTimeout(showBox, delay);
}

// Function to show the box at a random position within the game area
function showBox() {
  // Calculate random top and left positions within the game area bounds
  const gameAreaRect = gameArea.getBoundingClientRect();
  const boxRect = box.getBoundingClientRect();

  // Ensure the box stays within the game area
  const maxTop = gameAreaRect.height - boxRect.height;
  const maxLeft = gameAreaRect.width - boxRect.width;

  // Generate random positions
  const top = Math.random() * maxTop;
  const left = Math.random() * maxLeft;

  // Set the box's position and make it visible
  box.style.top = `${top}px`;
  box.style.left = `${left}px`;
  box.style.display = "block";

  // Record the time when the box appeared
  startTime = Date.now();
}

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for(let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Event handler for when the box is clicked
box.onclick = function () {
  // Calculate the reaction time
  const endTime = Date.now();
  const reactionTime = ((endTime - startTime) / 1000).toFixed(3); // Display in seconds

  // Display the reaction time
  result.textContent = `Your reaction time: ${reactionTime} seconds`;

  // Change the box color after the result is shown
  box.style.backgroundColor = getRandomColor();

  // Hide the box and prepare for the next round
  box.style.display = "none";
  appearAfterDelay();
};

// Start the first round of the game
appearAfterDelay();
