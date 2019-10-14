const CELL_WIDTH = 50;
const GRID_SIZE = 5;
const EVENT_KEY_LEFT = 37;
const EVENT_KEY_UP = 38;
const EVENT_KEY_RIGHT = 39;
const EVENT_KEY_DOWN = 40;
const ROBOT_INITIAL_X_POS = 25;
const ROBOT_INITIAL_Y_POS = 25;
const BORDER_OFFSET = 2;

document.body.style.margin = '20px';

const createGrid = size => {
  const grid = document.createElement('div');
  grid.style.position = 'absolute';
  for (let i = 0; i < size; i++) {
    let row = document.createElement('div');
    row.className = 'row';
    row.style.display = 'flex';
    for (let j = 0; j < size; j++) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.style.border = '1px solid black';
      cell.style.height = CELL_WIDTH + 'px';
      cell.style.width = CELL_WIDTH + 'px';
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  document.body.appendChild(grid);
};

createGrid(GRID_SIZE);

const robot = document.createElement('img');
robot.src = './r2d2.png';
robot.style.height = '40px';
robot.style.width = '40px';
robot.style.position = 'absolute';
robot.style.top = ROBOT_INITIAL_X_POS + 'px';
robot.style.left = ROBOT_INITIAL_Y_POS + 'px';
document.body.appendChild(robot);

document.body.addEventListener('keydown', e => {
  const currX = parseInt(robot.style.left);
  const currY = parseInt(robot.style.top);
  let newTop;
  let newLeft;

  switch (e.keyCode) {
    case EVENT_KEY_LEFT: {
      newLeft = currX - CELL_WIDTH - BORDER_OFFSET;
      if (newLeft >= ROBOT_INITIAL_X_POS) {
        robot.style.transform = 'rotate(270deg)';

        robot.style.left = currX - CELL_WIDTH - BORDER_OFFSET + 'px';
      }
      break;
    }
    case EVENT_KEY_UP: {
      newTop = currY - CELL_WIDTH - BORDER_OFFSET;
      if (newTop >= ROBOT_INITIAL_Y_POS) {
        robot.style.transform = 'rotate(0deg)';
        robot.style.top = newTop + 'px';
      }
      break;
    }
    case EVENT_KEY_RIGHT: {
      newLeft = currX + CELL_WIDTH + BORDER_OFFSET;
      if (newLeft <= (CELL_WIDTH + BORDER_OFFSET) * GRID_SIZE) {
        robot.style.transform = 'rotate(90deg)';
        robot.style.left = newLeft + 'px';
      }
      break;
    }
    case EVENT_KEY_DOWN: {
      newTop = currY + CELL_WIDTH + BORDER_OFFSET;
      if (newTop <= (CELL_WIDTH + BORDER_OFFSET) * GRID_SIZE) {
        robot.style.transform = 'rotate(180deg)';
        robot.style.top = newTop + 'px';
      }
      break;
    }
    default:
      break;
  }
});
