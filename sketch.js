let score = 0;
const snakeSize = 10;
let snake;
const snakeBody = [];
const targets = [];
const targetCount = 3;

function setup() {
  createCanvas(500, 500);
  background(0);
  snake = new Snake();
  for (let i = 0; i < targetCount; i++) {
    targets.push(new Target());
  }
}

function draw() {
  background(0);

  textSize(32);
  stroke(0);
  strokeWeight(0);
  fill(255, 0, 255);
  text('Score: ' + score, 10, 30);
  fill(255);

  if (keyIsDown(UP_ARROW)) {
    snake.setDir(0, -10);
  } else if (keyIsDown(DOWN_ARROW)) {
    snake.setDir(0, 10);
  } else if (keyIsDown(LEFT_ARROW)) {
    snake.setDir(-10, 0);
  } else if (keyIsDown(RIGHT_ARROW)) {
    snake.setDir(10, 0);
  }

  snake.display();
  snakeBody.forEach(sB => {
    sB.display();
  });

  if (frameCount % 5 === 0) {
    snake.move();
    snake.detectBodyCollision();
    snake.detectTargetCollision();
    snake.detectBoundsCollision();
  }

  for (const target of targets) {
    target.display();
  }

  if (targets.length < targetCount) {
    targets.push(new Target());
  }
}

class Snake {
  constructor(x = width / 2, y = height / 2, xSpeed = snakeSize, ySpeed = 0) {
    this.location = createVector(x, y);
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = snakeSize;
  }

  display() {
    fill(255);
    rect(this.location.x, this.location.y, this.size, this.size);
  }

  move() {
    snakeBody.push(snake);
    if (snakeBody.length > score) {
      snakeBody.shift();
    }
    snake = new Snake(
      this.location.x + this.xSpeed,
      this.location.y + this.ySpeed,
      this.xSpeed,
      this.ySpeed
    );
  }

  setDir(x, y) {
    if (x === -this.xSpeed) {
      return;
    } else if (y === -this.ySpeed) {
      return;
    }
    this.xSpeed = x;
    this.ySpeed = y;
  }

  detectTargetCollision() {
    targets.forEach(t => {
      if (
        t.location.x - this.location.x < 5 &&
        t.location.x - this.location.x > -5 &&
        t.location.y - this.location.y < 5 &&
        t.location.y - this.location.y > -5
      ) {
        t.remove();
        score++;
        return true;
      }
    });
    return false;
  }

  detectBodyCollision() {
    snakeBody.forEach(s => {
      if (
        s.location.x - this.location.x < 10 &&
        s.location.x - this.location.x > -10 &&
        s.location.y - this.location.y < 10 &&
        s.location.y - this.location.y > -10
      ) {
        alert('Game Over');
      }
    });
  }

  detectBoundsCollision() {
    if (
      this.location.x > width ||
      this.location.x < 0 ||
      this.location.y > height ||
      this.location.y < 0
    ) {
      alert('Game Over');
    }
  }
}

class Target {
  constructor() {
    this.location = centerPositionOnGrid(
      random(width - snakeSize),
      random(height - snakeSize)
    );
  }

  display() {
    stroke(255),
      rect(this.location.x, this.location.y, snakeSize / 2, snakeSize / 2);
  }

  remove() {
    targets.splice(targets.indexOf(this), 1);
  }
}

centerPositionOnGrid = (x, y) => {
  return createVector(
    Math.floor(x / snakeSize) * snakeSize + snakeSize / 4,
    Math.floor(y / snakeSize) * snakeSize + snakeSize / 4
  );
};
