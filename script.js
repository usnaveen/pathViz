const gridContainer = document.getElementById('grid-container');
const randomizeButton = document.getElementById('randomize-button');
const numObstaclesInput = document.getElementById('num-obstacles');

function generateGrid() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      gridContainer.appendChild(cell);
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setStartAndEndPoints() {
  const cells = gridContainer.querySelectorAll('.cell');
  let startCell, endCell;

  do {
    const randomIndex = getRandomInt(0, cells.length - 1);
    startCell = cells[randomIndex];
  } while (startCell.classList.contains('obstacle') || startCell.classList.contains('red'));

  do {
    const randomIndex = getRandomInt(0, cells.length - 1);
    endCell = cells[randomIndex];
  } while (endCell === startCell || endCell.classList.contains('obstacle') || endCell.classList.contains('green')); 

  startCell.textContent = 'S'; // Adding text content 
  endCell.textContent = 'G';     // Adding text content 
  startCell.classList.add('green');
  endCell.classList.add('red');
}

function setObstacles() {
    const cells = gridContainer.querySelectorAll('.cell');
    const numObstacles = parseInt(numObstaclesInput.value); 

    let count = 0;
    while (count < numObstacles) {
        const randomIndex = getRandomInt(0, cells.length - 1);
        let cell = cells[randomIndex];

        if (!cell.classList.contains('green') && !cell.classList.contains('red')) {
            cell.classList.add('obstacle'); 
            cell.textContent = count + 1; // Numbering obstacles
            count++;
        }
    }
}

generateGrid();
setStartAndEndPoints();

randomizeButton.addEventListener('click', () => {
 gridContainer.innerHTML = ''; // Clear existing grid
 generateGrid();
 setStartAndEndPoints();
  setObstacles(); // Place obstacles 
});
