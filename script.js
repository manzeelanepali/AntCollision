const DEFAULT_SPEED_X = -1;
const DEFAULT_SPEED_y = 1;
const DEFAULT_DIRECTION_X = 2;
const DEFAULT_DIRECTION_y = 1;
const DEFAULT_COLOR = "#49b";

const DEFAULT_RADIUS = 12;
const boundaryW = 700;
const boundaryH = 700;
let container = document.getElementById("container");
container.style.width = toPx(boundaryW);
container.style.height = toPx(boundaryH);
container.style.border = "2px solid #000";
container.style.position = "relative";


// helper function that converts the numeric value to pixel  using px
function toPx(value) {
    return `${value}px`;
}

function generateRandom(min = 0, max = 100) {
    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}

class Ant {
    constructor(
        x = boundaryW / 2,
        y = boundaryH / 2,
        speedX = DEFAULT_SPEED_X,
        speedY = DEFAULT_SPEED_X,
        directionX = DEFAULT_DIRECTION_X,
        directionY = DEFAULT_DIRECTION_y,
        radius = DEFAULT_RADIUS,
        color = DEFAULT_COLOR
    ) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.directionX = directionX;
        this.directionY = directionY;
        this.h = radius * 2;
        this.w = radius * 2;
        this.radius = radius;
        this.color = color;
    }

    create() {
    this.ant = document.createElement("img");
   
    this.ant.src = "ant.jpg"; 
    this.ant.style.height = toPx(this.h);
    this.ant.style.width = toPx(this.w);
    this.ant.style.top = toPx(this.x);
    this.ant.style.left = toPx(this.y);
    this.ant.style.position = "absolute";
    container.appendChild(this.ant);


     this.ant.addEventListener("click", () => {
    this.removeAnt();
  });
}

removeAnt() {
  this.ant.parentNode.removeChild(this.ant);
}

     move() {
      setTimeout(()=>{
         this.x += this.speedX * this.directionX;
         this.y += this.speedY * this.directionY;
         this.ant.style.top = toPx(this.y);
         this.ant.style.left = toPx(this.x);

      },900);

  }

    checkWallCollision() {
        if (this.x >= boundaryW - this.w) this.directionX = -1;
        if (this.y >= boundaryH - this.h) this.directionY = -1;

        if (this.x <= 0) this.directionX = 1;
        if (this.y <= 0) this.directionY = 1;
    }
detectCollision(ants) {
    let collision = false;
    ants.forEach((ant) => {
      if (ant !== this) {
        let squareDist =
          (ant.x - this.x) * (ant.x - this.x) +
          (ant.y - this.y) * (ant.y - this.y);
        if (
          squareDist <=
          (ant.radius + this.radius) * (ant.radius + this.radius)
        ) {
          this.directionX = -this.directionX;
          this.directionY = -this.directionY;
          collision = true;
        }
      }
    });
    return collision;
  }
}


let ants = [];

for (let i = 0; i < 5; i++) {
  let color =
    "rgb(" +
    String(generateRandom(1, 256)) +
    ", " +
    String(Math.floor(Math.random() * 256)) +
    ", " +
    String(Math.floor(Math.random() * 256)) +
    ")";
  const radius = generateRandom(15, 30);
  const x = generateRandom(1, boundaryW - radius);
  const y = generateRandom(1, boundaryH - radius);
  let ant = new Ant(
    x,
    y,
    generateRandom(1, 4),
    generateRandom(1, 4),
    Math.random() > 0.5 ? 1 : -1,
    Math.random() > 0.5 ? 1 : -1,
    radius,
    color
  );
  if (ants.length > 1) {
    let collision = ant.detectCollision(ants);
    console.log(collision);
    while (collision) {
      ant = new Ant(
        generateRandom(-1, boundaryW),
        generateRandom(1, boundaryH),
        generateRandom(1, 2),
        generateRandom(1, 2),
        Math.random() > 0.5 ? 1 : -1,
        Math.random() > 0.5 ? 1 : -1,
        generateRandom(20, 30),
        color
      );
      collision = ant.detectCollision(ants);
    }
  }
  ant.create();
  ants.push(ant);
}

function play() {
  ants.forEach((ant) => {
    ant.checkWallCollision();
    ant.detectCollision(ants);
    ant.move();
  });
  window.requestAnimationFrame(() => {
    play();
  });
}

play();