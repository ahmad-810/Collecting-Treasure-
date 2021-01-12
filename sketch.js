// ---- creating sword
var sword,sword_img;

// ---- creating fruits
var fruit, fruit1_img,fruit2_img,fruit3_img,fruit4_img, fruitGroup;

// ---- creating watermeloon
var watermeloon1, watermeloon1Image ;

// ---- creating monster
var monster, monster_anim, enemyGroup;

// ---- creating score & chance
var score;
var chances, chancesImg;

// ---- creating Game States
var START=1;
var PLAY=1;
var END=0;
var gameState=PLAY; 
var gameState=START;

// ---- creating restart & gameOver 
var gameOver,gameOver_img;
var restart,restart_img;

// ---- creating Sounds
var cutSound,gameOverSound,restartMusic,bombSound;

function preload()
{
  // ---- loading images
  sword_img=loadImage("sword3.png");
  
  
  
  fruit1_img=loadImage("apple cutting 1.png");  
  fruit2_img=loadImage("fruit2.png");
  fruit3_img=loadImage("fruit3.png");
  fruit4_img=loadImage("fruit4.png");
  chancesImg=loadImage("chance.png");
  watermeloon1Image = loadImage("watermeloon1.png");
  
  monster_anim=loadAnimation("bomb2.png");
  
  gameOver_img=loadImage("gameOver.png");
  
  restart_img=loadImage("restart.png");
  
  // ---- loading  sounds 
  cutSound=loadSound("swoosh1.mp3");
  gameOverSound=loadSound("gameOver.mp3");
  restartMusic=loadSound("gameOver1.mp3");
  bombSound=loadSound("bomb.wav");
 
}

function setup()
{
  //To create a canvas
  createCanvas(500,500);
  
  
  
  score = createSprite(435,25,15,15);
  score. addImage(watermeloon1Image);
  score.scale=0.3/2;  
  
  chance = createSprite(50,25,15,15);
  chance. addImage( chancesImg);
  chance.scale= 0.5;  
  
  sword=createSprite(200,200,10,10);
  sword.addImage(sword_img);
  sword.scale=0.2;
  
  restart=createSprite(250,260,10,10);
  restart.addImage(restart_img);
  restart.scale=0.3;
  
  sword.setCollider("circle",0,0,20);
  
  
 
  fruitGroup=new Group();
  enemyGroup=new Group();
  
  
  score=0;
  
  chances=3;
  
  
  gameOver=createSprite(250,200,10,10);
  gameOver.addImage(gameOver_img);
  gameOver.scale=1.5;
  
  
  
}

function draw()
{
 
  //To assign a background to programme
  background("azure");
  
    
  if(gameState===PLAY)
  {
    
     
  //Instructions for playing this game/USER GUIDE
   background("azure");
    
    fruitGroup.velocityX = -(8 + 10* score/5)
    fruitGroup.velocityX =  (8 + 10* score/5)
    
     //To make sword move along the mouse in all directions 
     sword.y=World.mouseY;
     sword.x=World.mouseX;
   
  if(score>0&&score%5===0)
  {
    background("yellow");
  } else if(score>0&&score%2===0)
  {
    background("lightgrey");
  }
  
   //To call fruits and enemy function in draw()
   fruits();
   enemy();
    
   
   if(sword.isTouching(fruitGroup))
   {
     fruitGroup.destroyEach();
    fruit1_img=loadImage("apple cutting 1.png"); 
     score=score+1;
     
     cutSound.play();
     
   }
  

   if(sword.isTouching(enemyGroup))
   {
     enemyGroup.destroyEach();
     chances=chances-1;
     bombSound.play();
   }
    sword.visible = true ; 
        
  gameOver.visible= false;
  restart.visible= false;
 
    
  } 
   else if(gameState===END)
  {
    fruitGroup.setVelocityEach(0);
    enemyGroup.setVelocityEach(0);
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    sword.visible = false ;
    
    gameOver.visible=true;
    restart.visible=true;
    fruit.velocityX = 0;
    
    // ----- if i preesed mouse on restart batuern so restart the game
       if(mousePressedOver(restart)) {
        reset();
      }

     
  }
 
  
  if(chances===0)
  {
    gameState=END;

  }
  
    if (score === 1) {
    gameState = "Over";
    stroke("green");
    fill("black");
    textSize(35);
    text("you won this game", 120, 230);
    text("Prees 'R' to reset", 130, 280);
    }
  
  if (keyDown("R")& gameState === "Over"){
   gameState = "PLAY";
    score =0;
   chance =3;
   
  }
  
  drawSprites();
  
  
  fill("black");
  textSize(25);
  text(" : "+score,450,30);
  text(": "+chances,100,30);
}

function reset(){
  
  // ---- creating gameState PLAY 
    gameState = PLAY ;
  
  // ---- creating gameOver invisible when i click restart batuern
    gameOver.visible = false;
    restart.visible = false;

   //To make sword move along the mouse in all directions 
     sword.y=World.mouseY;
     sword.x=World.mouseX;
  
  // ---- creating destroy fruitGroup & enemyGroup when i click restart batuern 
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
  
  // ---- creating score when i click restart batuern
    score = 0;
  
  // ---- creating score when i click restart batuern
    chances = 3;
}

function fruits()
{
 
  if(World.frameCount%75===0)
  {
  
  fruit=createSprite(580,200,20,20);

  sf=Math.round(random(1,4));
  
  if(sf===1)
  {
    fruit.addImage(fruit1_img); 
  } 
  else if (sf===2)
  {
    fruit.addImage(fruit2_img);
  }
  else if(sf===3)
  {
    fruit.addImage(fruit3_img);
  }
  else
  {
    fruit.addImage(fruit4_img);
  }
    
 
  fruit.scale=0.170;
  
 
  fruit.y=Math.round(random(50,340));

 
  fruit.velocityX=-4;
 
  fruit.setLifetime=100;
  
 
  fruitGroup.add(fruit);
  
 
  changefruit=Math.round(random(1,2))
  if(changefruit===1)
    {
      fruit.velocityX=-(4.5+score/4);
      fruit.x=600;
    }
    else if(changefruit===2)
    {
      fruit.velocityX=(4.5+score/4);
      fruit.x=0;
    }
  }
  
}

function enemy()
{
 
  if(World.frameCount%150===0)
  {
  monster=createSprite(500,200,5,5);

  monster.y=Math.round(random(50,350));
  monster.addAnimation("moving",monster_anim);
  monster.velocityX=-5;
  monster.scale = 0.3;
  monster.setLifetime=125;
  enemyGroup.add(monster);
    
  }
  
}
