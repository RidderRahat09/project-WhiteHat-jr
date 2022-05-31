var wallImg, wall;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  wallImg = loadImage("wall.png");
  doorImg = loadImage("door.png");
  climberImg = loadAnimation("b1.png","b2.png","b3.png","b6.png","b9.png");
  ghostImg = loadAnimation("d1.png","d2.png","d3.png","d4.png");
  spookySound = loadSound("spooky.wav");
  invisibleBlockimg=loadAnimation("o1.png","o2.png","o3.png","o4.png","o5.png","o6.png")
}

function setup() {
  createCanvas(600, 600);
  wall = createSprite(300, 300);
  wall.addImage("wall", wallImg);
  wall.velocityY = 1;
wall.scale=2.5


  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

  ghost = createSprite(200,200)
  ghost.addAnimation("ghost",ghostImg)
  ghost.scale=.5


}

function draw() {
  background(200);
  if(gameState==="play"){
    if (wall.y > 400) {
      wall.y = 300
    }
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+5
  }
  
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-5
  }
  
  
  if(keyDown("up_arrow")){
    ghost.velocityY=-5
  }
  
  ghost.velocityY=ghost.velocityY+0.8
  
  
  if (climbersGroup.isTouching(ghost)){
  ghost.velocityY=0
  }
  
  
  if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy()
    gameState="end"
  
    }
  
    spawnDoors()
    drawSprites()
  }
  
  if(gameState==="end"){
    stroke("red")
    fill("yellow")
    textSize(30)
    text("GAME OVER",230,250)
  }

  
}


function spawnDoors() {
  if (frameCount % 120 === 0) {
    door = createSprite(200, -50)
    door.addImage(doorImg)
    door.x = Math.round(random(120, 400))
    door.velocityY = 1
    door.lifetime=800
    doorsGroup.add(door)

    climber = createSprite(200, 10)
    climber.addAnimation("climber",climberImg)
    climber.scale=0.45
    climber.x = door.x
    climber.velocityY = 1
    climber.lifetime=800
    climbersGroup.add(climber)

    invisibleBlock = createSprite(200, 15)
    invisibleBlock.addAnimation("enemy",invisibleBlockimg)
    invisibleBlock.scale=0.1

    invisibleBlock.width=climber.width
    //invisibleBlock.height=2
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 1
  invisibleBlock.debug=true
  invisibleBlock.setCollider("circle",0,0,50)
    invisibleBlockGroup.add(invisibleBlock)
   
    invisibleBlock.lifetime=800
  
    ghost.depth=door.depth
    ghost.depth +=1


  }


}
