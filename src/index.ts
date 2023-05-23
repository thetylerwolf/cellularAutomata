import Cell from "./Cell";

// Constants
const cellSize = 6; // Diameter of the cell
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

// Grid size
const rows = Math.floor(canvas.height / cellSize);
const cols = Math.floor(canvas.width / cellSize);

// Create an empty grid of cells
let grid = new Array(rows);
for (let row = 0; row < rows; row++) {
  grid[row] = new Array(cols);
  for (let col = 0; col < cols; col++) {
    grid[row][col] = new Cell(row, col, false);
  }
}

const randomAlive = () => {
  return Math.random() > 0.49;
};

// Add some initial live cells
grid[3][2].alive = randomAlive();
grid[3][3].alive = randomAlive();
grid[3][4].alive = randomAlive();
grid[2][4].alive = randomAlive();
grid[1][3].alive = randomAlive();

grid[4][3].alive = randomAlive();
grid[4][4].alive = randomAlive();
grid[4][5].alive = randomAlive();
grid[3][5].alive = randomAlive();
grid[2][4].alive = randomAlive();

// Draw the grid
function drawGrid() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      grid[row][col].draw(context, cellSize);
    }
  }
}

// Update the grid based on the Game of Life rules
function updateGrid() {
  let newGrid = new Array(rows);
  for (let row = 0; row < rows; row++) {
    newGrid[row] = new Array(cols);
    for (let col = 0; col < cols; col++) {
      const cell = grid[row][col];

      newGrid[row][col] = cell.checkState(grid);
    }
  }

  grid = newGrid;
}

// Main game loop
function gameLoop() {
  drawGrid();
  updateGrid();
  setTimeout(() => requestAnimationFrame(gameLoop), 30);
}

// Start the game loop
gameLoop();
