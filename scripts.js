const CELL_WIDTH = 50;
const GRID_SIZE = 5;
const EVENT_KEY_LEFT = 37;
const EVENT_KEY_UP = 38;
const EVENT_KEY_RIGHT = 39;
const EVENT_KEY_DOWN = 40;
const ROBOT_INITIAL_X_POS = 55;
const ROBOT_INITIAL_Y_POS = 55;
const BORDER_OFFSET = 2;

const container = document.getElementsByClassName('container')[0];

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
      cell.style.border = '1px solid #ffffff';
      cell.style.borderRadius = '5px';
      cell.style.height = CELL_WIDTH + 'px';
      cell.style.width = CELL_WIDTH + 'px';
      cell.style.backgroundColor = '#c75724';
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  container.appendChild(grid);
};

createGrid(GRID_SIZE);

const robot = document.createElement('img');
robot.src = './r2d2.png';
robot.style.height = '40px';
robot.style.width = '40px';
robot.style.position = 'absolute';
robot.style.top = ROBOT_INITIAL_X_POS + 'px';
robot.style.left = ROBOT_INITIAL_Y_POS + 'px';
container.appendChild(robot);
let currRotation = 0;

document.body.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case EVENT_KEY_LEFT: {
      currRotation -= 90;
      if (currRotation < 0) {
        currRotation = 270;
      }
      robot.style.transform = `rotate(${currRotation}deg)`;
      break;
    }
    case EVENT_KEY_RIGHT: {
      currRotation += 90;
      if (currRotation > 360) {
        currRotation = 90;
      }
      robot.style.transform = `rotate(${currRotation}deg)`;
      break;
    }
    case EVENT_KEY_UP: {
      handleMoveDirection(currRotation);
      break;
    }
    default:
      break;
  }
});

const handleMoveDirection = rotation => {
  const currX = parseInt(robot.style.left);
  const currY = parseInt(robot.style.top);
  let newTop;
  let newLeft;
  switch (rotation) {
    case 0:
    case 360: {
      newTop = currY - CELL_WIDTH - BORDER_OFFSET;
      if (newTop >= ROBOT_INITIAL_Y_POS) {
        robot.style.top = newTop + 'px';
      }
      break;
    }
    case 90: {
      newLeft = currX + CELL_WIDTH + BORDER_OFFSET;
      if (
        newLeft <
        (CELL_WIDTH + BORDER_OFFSET) * GRID_SIZE + ROBOT_INITIAL_X_POS
      ) {
        robot.style.left = newLeft + 'px';
      }
      break;
    }
    case 180: {
      newTop = currY + CELL_WIDTH + BORDER_OFFSET;
      if (
        newTop <
        (CELL_WIDTH + BORDER_OFFSET) * GRID_SIZE + ROBOT_INITIAL_Y_POS
      ) {
        robot.style.top = newTop + 'px';
      }
      break;
    }
    case 270: {
      newLeft = currX - CELL_WIDTH - BORDER_OFFSET;
      if (newLeft >= ROBOT_INITIAL_X_POS) {
        robot.style.left = newLeft + 'px';
      }
      break;
    }
    default:
      break;
  }
};
