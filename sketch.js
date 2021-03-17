
var monkey;
var monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground;
var Background;
var Frame;
var survivalTime = 0;
var gameState = PLAY;
var PLAY;
var END;
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  ObstaclesImage = loadImage("obstacle.png");
  Boulder = loadImage("boulder.png");
  
  bgSound = loadSound("backgroundSound.wav");
  
  forest = loadImage("trees.png");
  forest2 = loadImage("trees.png");

  frame = loadImage("frame.png")
}

function setup() {
  createCanvas(700,500)
  bgSound.loop();
  Background = createSprite(190,200,40,40);
  Background.addImage(forest);
  Background.scale=1.7;
  Background.velocityX=-2
  
  Background2 = createSprite(1000,200,40,40);
  Background2.addImage(forest);
  Background2.scale=1.7;
  
  Background.depth = 0;
  Background2.depth = 0;
  
  Frame = createSprite(340,250,10,10);
  Frame.addImage(frame);
  Frame.scale = 1.25;
  Frame.depth = 2;
  
  monkey = createSprite(230,200,20,20);
  monkey.addAnimation("Running", monkey_running);
  monkey.scale = 0.15;
  monkey.velocityY = 5;
 
  ground = createSprite (400,380,800,10);
  ground.x=ground.width/2
  ground.velocityX = -4;
  ground.visible = false;
  bananaGroup = createGroup();
  obsticalGroup = createGroup();

camera.zoom = 1.1;
}


function draw() {
background(90,170,255);
  drawSprites();
  //bgSound.start();
  //new p5.SoundLoop(10, [10]);

  monkey.debug = true;
  monkey.setCollider("circle",0,0,180);

  console.log(monkey.scale);
  monkey.velocityY = monkey.velocityY+1
    monkey.collide(ground);
  Food();
  Obstacles();
 
  if(monkey.isTouching(bananaGroup)) {
  score = score+2
  monkey.scale = monkey.scale + 0.0050;
  bananaGroup.destroyEach();
  }
  //limit to size
  if(monkey.scale > 0.29) {
    monkey.scale = 0.29
  }
  if(monkey.isTouching(obsticalGroup)&&monkey.scale === 0.15) {
   monkey.setCollider("circle",0,0,180);
   Background.velocityX = 0;
   Background2.velocityX = 0;
   ground.velocityX = 0
   bananaGroup.setVelocityXEach(0);
   obsticalGroup.setVelocityXEach(0);
   obsticalGroup.setLifetimeEach(-1);                                  bananaGroup.setLifetimeEach(-1);
   bgSound.stop();
    fill("red");
    textSize(18);
    text("Game Over",monkey.x+50,monkey.y-100);

  }
  if(monkey.isTouching(obsticalGroup)&&monkey.scale > 0.15){
    monkey.setCollider("circle",0,0,180);
    monkey.scale = 0.15;
    obsticalGroup.destroyEach();
    
  }
  if(monkey.scale > 0.15&&monkey.scale<0.2){
    Background.velocityX =-3;
    Background2.velocityX = -3;
   bananaGroup.setVelocityXEach(-3);
  }
  if(monkey.scale > 0.2){
    Background.velocityX =-4;
    Background2.velocityX = -4;
    bananaGroup.setVelocityXEach(-4);
  
  }
  stroke("white")
  textSize(20);
  fill("white")
  
  stroke("black");
  textSize(20);
  fill("white");
    survivalTime = Math.ceil(frameCount/frameRate())
  
  if(keyDown("space")) {
    monkey.y= monkey.y-20;
  }
  
  if(ground.x<200){
    ground.x = 400;
  }
   
  if(Background.x<190){
    Background2.velocityX=-2;
    Background.x = Background.x*2;

  }
   if(Background2.x<190){
    Background2.x = Background.x*2;
    Background.velocityX=-2;

  }
  
    text("Survival Time:" + survivalTime,100,50);
    text("Score: " + score,450,50);
    
}
function Food() {
  if(frameCount % 80 === 0&&ground.velocityX===-4) {
    banana = createSprite(monkey.x+220,random(120,200),10,10)
    banana.addImage(bananaImage);
    banana.scale = 0.18;
    banana.velocityX = -2;
    banana.lifetime = 800;
    bananaGroup.add(banana);
  }
}
function Obstacles() {
  if(frameCount % 300 === 0&&ground.velocityX===-4) {
    obstacles = createSprite(monkey.x+320,370,10,10)
    obstacles.debug = true;

    obstacles.depth = 1;
    obstacles.addImage(ObstaclesImage);
    obstacles.scale = 0.18;
    obstacles.velocityX = -8;
    obstacles.lifetime = 800;
    if(monkey.scale >0.2&& monkey.scale<0.25){
      obstacles.addImage(Boulder);
      obstacles.scale = 0.65;
      obstacles.setCollider("circle",0,0,100);
    }
    else{
      obstacles.addImage(ObstaclesImage);
      obstacles.scale = 0.18;
      obstacles.velocityX = -8;
    }
    if(monkey.scale >0.2){
        obstacles.scale = 0.75;

    }
      obsticalGroup.add(obstacles);
    
  }
}

