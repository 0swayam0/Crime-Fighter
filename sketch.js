var player,enemy1,enemyGroup,bullets,bulletsGroup,enemybullets,enemybulletsGroup,gameOver;
var playerImg,enemyImg,enemyImg2,bulletsImg,enemyBulletImg,gameOverImg,bg,startbg,winImg;
var backgroundMusic,gameOverSound,shootSound,startSound,winSound;

var kills=0;
var life=3;
var ammo=12;

var gameState=0;

function preload() {
    playerImg=loadImage("images/playerImg.png");
    enemyImg=loadImage("images/enemyImg.png");
    enemyImg2=loadImage("images/enemyImg2.png");
    bulletImg=loadImage("images/bulletImg.png");
    enemyBulletImg=loadImage("images/enemyBulletImg.png");
    gameOverImg=loadImage("images/gameOverImg.png");
    bg=loadImage("images/background.jpg");
    startBg=loadImage("images/startBg.jpg");
    winImg=loadImage("images/winImg.jpg");

    backgroundMusic=loadSound("sounds/backgroundMusic.mp3");
    gameOverSound=loadSound("sounds/gameOverSound.mp3");
    shootSound=loadSound("sounds/shootSound.mp3");
    startSound=loadSound("sounds/startSound.wav");
}   

function setup() {
    createCanvas(windowWidth, windowHeight);

    player=createSprite(windowWidth/18,windowHeight/2.5,50,50);
    player.addImage(playerImg);
    player.scale=windowWidth/3200;
   
    gameOver=createSprite(windowWidth/2,windowHeight/2,20,20);
    gameOver.visible=false;

    bulletsGroup=new Group();
    enemybulletsGroup=new Group();
    enemyGroup=new Group();

    backgroundMusic.loop();
}
  
function draw() {

    if(gameState===0){
        background(startBg);

        strokeWeight(4);
        stroke(0)
        fill(255)
        textSize(windowHeight/26.96);
        text("Story: Terrorists have set a bomb in the city. You are a soldier who has to stop the terrorists.",windowWidth/126,windowHeight/15.1);
        text("You have 3 lives, use all of them and you die. You have limitied ammo, exhaust them and the game",windowWidth/126,windowHeight/7.55);
        text("will be over. If you kill all the terrorists, you have saved your city.",windowWidth/126,windowHeight/5);

        textSize(windowHeight/25.17);
        fill("red")
        text("How to play :",windowWidth/126,windowHeight/3);
        text("Use arrow keys to move in that particular direction.",windowWidth/126,windowHeight/2.51);
        text("Press the spacebar to shoot.",windowWidth/126,windowHeight/2.16);
        text("Be alert, the enemies can come from anywhere to shoot you.",windowWidth/126,windowHeight/1.9);

        textSize(windowHeight/21.57);
        fill("violet");
        text("May the odds be ever in your favor.",windowWidth/3.15,windowHeight/1.4);

        textSize(windowHeight/18);
        fill(255);
        text("Press S to start",windowWidth/2.4,windowHeight/1.1);
    }

    if(keyCode===83 && gameState===0){
        gameState=1;
        startSound.play();
    }

    if(gameState===1){
        background(bg);

       enemyShoot();
       spawnEnemy();


        if(keyCode==UP_ARROW){
        player.y=player.y-8;
        }

        if(keyCode==DOWN_ARROW){
        player.y=player.y+8;
        }

        if(keyCode==LEFT_ARROW){
        player.x=player.x-8;
        }

        if(keyCode==RIGHT_ARROW){
        player.x=player.x+8;
        }

        if(bulletsGroup.isTouching(enemy1)){
            enemyGroup.destroyEach();
            bulletsGroup.destroyEach();
            kills+=1;
        }

        if(enemybulletsGroup.isTouching(player)){
            enemybulletsGroup.destroyEach();
            life-=1;
        }

        drawSprites();
    
        fill("red")
        textSize(windowHeight/25)
        text("Kills:"+kills,windowWidth/63,windowHeight/30.2);
        text("Lives:"+life,windowWidth/10.5,windowHeight/30.2);
        text("Ammo:"+ammo,windowWidth/5.48,windowHeight/30.2);
}

    if(life===0 || kills===10 || ammo===0){
        gameState=2
    }

    if(gameState===2){
        background(bg);

        strokeWeight(4);
        stroke(0)
        fill(255);
        textSize(windowHeight/18.875);
        text("Press R to restart",windowWidth/2-170,windowHeight-100);

        if(life===0 || ammo===0){
            drawSprites();

            fill("red")
            textSize(windowHeight/25)
            text("Kills:"+kills,windowWidth/63,windowHeight/30.2);
            text("Lives:"+life,windowWidth/10.5,windowHeight/30.2);
            text("Ammo:"+ammo,windowWidth/5.48,windowHeight/30.2);

            gameOver.visible=true;
            gameOver.addImage(gameOverImg);
            gameOver.scale=0.7;
            player.visible=false;
            enemyGroup.destroyEach();
            enemybulletsGroup.destroyEach();

            backgroundMusic.stop();
        }

        if(kills===10){
            drawSprites();

            fill("red")
            textSize(windowHeight/25)
            text("Kills:"+kills,windowWidth/63,windowHeight/30.2);
            text("Lives:"+life,windowWidth/10.5,windowHeight/30.2);
            text("Ammo:"+ammo,windowWidth/5.48,windowHeight/30.2);

            player.visible=false;

            gameOver.visible=true;
            gameOver.addImage(winImg);
            gameOver.scale=windowWidth/3200;
            enemyGroup.destroyEach();
            enemybulletsGroup.destroyEach();

            backgroundMusic.stop();
        }
 
    }
    if(keyCode === 82 && gameState===2){
        restart();
    }
}

function spawnBullets(){
        bullets=createSprite(player.x+50,player.y-60,20,20);
        bullets.addImage(bulletImg);
        bullets.scale=0.1;
        bullets.velocityX=50;
        bulletsGroup.add(bullets);
}

function keyPressed(){
    if(gameState===1){
        if(keyCode===32){
            spawnBullets();
            ammo-=1;

            shootSound.play();
        }
    }
}

function spawnEnemy(){
    if(frameCount%100===0){
    var rand=Math.round(random(1,2))
    if(rand===1){
        enemy1=createSprite(windowWidth/1.08,windowHeight/4.2,50,50);
        enemy1.addImage(enemyImg);
        enemy1.x=random(windowWidth/3.15,windowWidth/1.2);
        enemy1.y=random(windowHeight/2.51,windowHeight/1.25);
    }

    if(rand===2){
        enemy1=createSprite(windowWidth/1.08,windowHeight/4.2,50,50);
        enemy1.addImage(enemyImg2);
        enemy1.x=random(windowWidth/3.15,windowWidth/1.2);
        enemy1.y=random(windowHeight/2.51,windowHeight/1.25);
    }
    
    enemy1.scale=windowHeight/1887;
    enemy1.setCollider("rectangle",0,0,300,500);
    enemyGroup.add(enemy1);

    enemybullets.x=enemy1.x-(windowHeight/1887);
    enemybullets.y=enemy1.y-20;
}
}

function enemyShoot(){
    enemybullets=createSprite(-100,-100,20,20);
    enemybullets.addImage(enemyBulletImg);
    enemybullets.scale=windowWidth/12600;
    enemybullets.velocityX=-35;
    enemybulletsGroup.add(enemybullets);
}

function restart(){
    gameState=0;

    player.visible=true;
    player.x=windowWidth/18;
    player.y=windowHeight/2.5;

    kills=0;
    ammo=12;
    life=3;

    gameOver.visible=false;
}