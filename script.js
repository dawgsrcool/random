const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
let score = 0;
const totalItems = 5;
let itemsFound = 0;

// Function to create a hidden item at a random position
function createItem() {
  const item = document.createElement('div');
  item.classList.add('item');
  const x = Math.random() * (gameArea.offsetWidth - 20);
  const y = Math.random() * (gameArea.offsetHeight - 20);
  item.style.left = `${x}px`;
  item.style.top = `${y}px`;
  item.addEventListener('click', () => {
    item.remove();
    score++;
    itemsFound++;
    scoreDisplay.textContent = score;
    if (itemsFound < totalItems) {
      createItem();
    } else {
      alert(`Congratulations! You found all ${totalItems} items!`);
    }
  });
  gameArea.appendChild(item);
}

// Start the game by creating the first item
createItem();