var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var gameState,PLAY,END,gameOver,gameOverInage,restart,
    restartImage;

var score;


function preload(){
  trex_running = loadAnimation("images/lion1.png","images/lion3.png","images/lion4.png");
  trex_collided = loadImage("images/lion2.png");
  
  groundImage = loadImage("images/ground2.png");
  
  cloudImage = loadImage("images/cloud.png");
  
  obstacle1 = loadImage("images/fire.png");
  obstacle2 = loadImage("images/fire.png");
  obstacle3 = loadImage("images/fire.png");
  obstacle4 = loadImage("images/fire.png");
  obstacle5 = loadImage("images/fire.png");
  obstacle6 = loadImage("images/fire.png");
  
  gameOverImage = loadImage("images/gameoverir.png");
  restartImage = loadImage("images/restart1.png");
}

function setup() {
  createCanvas(900, 300);
  
  trex = createSprite(50,280,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.6;
  //trex.debug=true;
  
  ground = createSprite(200,280,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
 
  
  invisibleGround = createSprite(200,290,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(450,100,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  gameOver.scale = 0.6;
  
  restart = createSprite(450,160,10,10);
  restart.addImage(restartImage);
  restart.scale = 0.3;
  restart.visible = false;
  
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  score = 0;
}

function draw() {
  background("lightblue");
  
  
  textSize(20);
  fill("black");
  text("Score: "+ score, 410,30);

  textSize(15);
  fill("black");
  text("Double Click to jump!",390, 50);

  trex.collide(invisibleGround);
  
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
  
    if(keyDown("space")) {
    trex.velocityY = -10;
  }
    trex.velocityY = trex.velocityY + 0.8
     ground.velocityX = -(6+3*score/100);
     
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }
  
   else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)){
    reset();
  }

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(900,220,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(900,250,10,5);
    obstacle.velocityX = -(6+3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      
      default: break;
      
    }

    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    //obstacle.debug=true;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score = 0;
}