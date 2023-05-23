export default class Cell {
  constructor(row, col, alive) {
    this.row = row;
    this.col = col;
    this.alive = alive;
    this.dead = false;
  }

  kill() {
    this.alive = false;
    this.dead = true;
  }

  birth() {
    if (this.dead) return;
    this.alive = true;
    this.dead = false;
  }

  draw(context, cellSize) {
    context.beginPath();
    context.arc(
      this.col * cellSize + cellSize / 2,
      this.row * cellSize + cellSize / 2,
      cellSize / 2.5,
      0,
      2 * Math.PI
    );
    context.fillStyle = this.alive
      ? "#f1ffc4"
      : this.dead
      ? "#ffcaaf"
      : "#a7bed3";
    context.fill();
  }

  countNeighbors(grid) {
    let count = 0;
    const { row, col } = this;
    const rows = grid.length;
    const cols = grid[0].length;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const r = (row + i + rows) % rows;
        const c = (col + j + cols) % cols;
        count += grid[r][c].alive ? 1 : 0;
      }
    }

    count -= this.alive ? 1 : 0;
    return count;
  }
}
