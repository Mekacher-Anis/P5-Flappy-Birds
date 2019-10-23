var x = 10,
  y = 10,
  vy = 0;
const dT = 0.08,
  G = 9.8,
  SCL = 10,
  pillarDist = 200,
  openingSize = 10;
var pillars = [];
//the values of counted[] should've been added to pillars[] as 3rd argument
//but I'm too lazy to change all the '2's in the loops to '3's
var counted = [];
var score = 0;
var gameOver = false;

var bird,grass,bg,font;

function preload() {
  bird = loadImage('bird.png');
  grass = loadImage('grass2.png');
  bg = loadImage('sky.jpg');
  font = loadFont('roboto.ttf');
}

function setup() {
  createCanvas(800, 400);
  textFont(font);
  addPillar();
}

function draw() {
  if (gameOver) return;

  noStroke();
  // fill("#87cefa");
  // rect(0, 0, 800, 400);
  // fill("#B4E715");
  // rect(0, 375, 800, 25);
  image(bg,0,0);
  image(grass,-20,360,440,72);
  image(grass,380,360,440,72);

  //draw bird
  push();
  translate( x * SCL, y * SCL);
  rotate((vy<0) ? 0 : map(vy,0,40,0,PI));
  image(bird,0,0);
  pop();

  //draw pillars
  noStroke();
  fill("#D77500");
  for (let i = 0; i < pillars.length / 2; ++i) {
    rect(pillars[i * 2], 0, 25, pillars[i * 2 + 1] * SCL);
    let pillarHeight = 400 / SCL - pillars[i * 2 + 1] - openingSize;
    rect(pillars[i * 2], 400 - pillarHeight * SCL, 25, pillarHeight * SCL);
    pillars[i * 2] -= 1;

    //check collison and score
    if ((x > (pillars[i * 2] - 32) / SCL) &&
      (x < (pillars[i * 2] + 25) / SCL) &&
      (y < pillars[i * 2 + 1] || y > pillars[i * 2 + 1] + openingSize)) {
      endGame();
      break;
    } else if ((x > (pillars[i * 2] - 32) / SCL) &&
      (x < ((pillars[i * 2] + 25) / SCL)) &&
      (y > pillars[i * 2 + 1]) &&
      (y < pillars[i * 2 + 1] + openingSize) &&
      !counted[i]) {
      score += 1;
      counted[i] = true;
    }
  }


  //spawn new pillar
  if ((800 - pillars[pillars.length - 2]) >= pillarDist)
    addPillar();

  if (pillars.length > 5 * 2) {
    pillars.splice(0, 2);
    counted.splice(0, 1);
  }

  //display score
  textSize(42);
  fill(255).strokeWeight(10);
  text(score, 390, 40);

  //hnadle physics
  vy += dT * G;
  y += 0.5 * vy * dT;
  if (y < 0) {
    y = 0;
    vy = 0;
  }
  if (y * SCL >= 400) {
    // y = 37.5;
    // vy = -0;
    endGame();
  }
}

function addPillar() {
  let openingY = random(5, 40 - openingSize);
  pillars.push(800, openingY);
  counted.push(false);
}

function endGame(){
  background("#ff7675");
      fill(0xFFFFFF);
      textSize(42);
      text("Life is Hard.", 300, 200);
      gameOver = true;
}

function reset() {
  x = 10;
  y = 10;
  vy = 0;
  score = 0;
  pillars = [];
  addPillar();
  score = 0;
  gameOver = false;
}

function keyPressed() {
  vy -= 30;

  if (gameOver)
    reset();
}