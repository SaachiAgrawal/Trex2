var trex;
var run;
var ground;
var gi;
var mis1;
var cloud1;
var ci;
var o1,o2,o3,o4,o5,o6;
var score=0 
var obG;
var clG;
var gameState="play";
var trexCollided;
var gameOver;
var gameOverImage;
var restart;
var restartImage;
var checkpoint;
var  jump;
var die;

function preload(){
 run=loadAnimation("trex1.png","trex3.png","trex4.png");
 gi=loadImage("ground2.png");
 ci=loadImage("cloud.png");
 o1=loadImage("obstacle1.png");
 o2=loadImage("obstacle2.png");
 o3=loadImage("obstacle3.png");
 o4=loadImage("obstacle4.png");
 o5=loadImage("obstacle5.png");
 o6=loadImage("obstacle6.png");
 trexCollided=loadImage("trex_collided.png");
 gameOverImage=loadImage("gameOver.png");
 restartImage=loadImage("restart.jpeg");
 checkpoint=loadSound("checkpoint.mpeg");
 jump=loadSound("jump.mpeg");
 die=loadSound("die.mpeg");
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
  trex=createSprite(50,160,20,50);
  trex.addAnimation("running",run);
  trex.addAnimation("collided",trexCollided);
  trex.scale=0.5;
  trex.debug=false;
  trex.setCollider("circle",0,0,40)

  obG=new Group();

  clG=new Group();

  ground=createSprite(200,180,400,20);
  ground.addImage(gi);
  
  mis1=createSprite(200,190,400,20);
  mis1.visible=false;

  gameOver=createSprite(300,100,10,10);
  gameOver.addImage(gameOverImage);

  restart=createSprite(300,140,10,10);
  restart.addImage(restartImage);

  gameOver.scale=0.5;

  restart.scale=0.5;
  
}

function draw(){
  background("white");
  text("Score: "+score,500,50);

  

  if(gameState==="play"){
      ground.velocityX=-2;
      gameOver.visible=false
      restart.visible=false
      score=score+Math.round(frameCount/60);
      if(score>0&&score%1000===0){
        checkpoint.play();
      }
      if(ground.x<0){
          ground.x=ground.width/2
      }  
      
      if(keyDown("space")&& trex.y>=150){
          trex.velocityY=-10;
          jump.play();
      }
      trex.velocityY=trex.velocityY+0.5;
      cl();
      cactus();
      if(obG.isTouching(trex)){
        gameState="end"
        die.play();
      }
      
  }
  else if(gameState==="end"){
    ground.velocityX=0;
    trex.changeAnimation("collided",trexCollided);
    obG.setVelocityXEach(0);
    clG.setVelocityXEach(0);
    obG.setLifetimeEach(-1);
    clG.setLifetimeEach(-1);
    trex.velocityY=0;
    if(mousePressedOver(restart)){
      reset();
    }

    gameOver.visible=true;
    restart.visible=true;

    
  }


  
  
  trex.collide(mis1);

  
  drawSprites();

}

function cl(){
  if(frameCount %100===0){

  cloud1=createSprite(600,100,40,10);
  cloud1.velocityX=-3
  cloud1.addImage(ci);
  cloud1.y=Math.round(random(10, 100));
  cloud1.lifetime=200
  cloud1.depth=trex.depth;
  trex.depth=trex.depth+1;
  clG.add(cloud1);
}
}

function cactus(){
if(frameCount %100===0){
var obs=createSprite(600,155,10,40)
obs.velocityX=-6;

var a=Math.round(random(1,6));
switch(a){
case 1:obs.addImage(o1);
break;
case 2:obs.addImage(o2);
break;
case 3:obs.addImage(o3);
break;
case 4:obs.addImage(o4);
break;
case 5:obs.addImage(o5);
break;
case 6:obs.addImage(o6);
break;
default:break;
}
obs.scale=0.5;
obs.lifetime=300;
obG.add(obs);
} 
}


function reset(){
  gameState="play";
  gameOver.visible=false;
  restart.visible=false;
  obG.destroyEach();
  clG.destroyEach();
  score=0;
  trex.changeAnimation("running",run);
}