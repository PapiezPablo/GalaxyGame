const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');



//Canvas 
canvas.width = 1024;
canvas.height = 400;
const cw = canvas.width;
const ch = canvas.height;

//Back
const backArt = new Image(); backArt.src = "./IMG/back.jpg";

function back(){
    ctx.drawImage(backArt,0,0,cw,ch);
    ctx.fillStyle = 'white';
    ctx.font = "Italic 50px Times New Roman";
    ctx.textAlign = "left";
    if(score >= 100){
        ctx.font = "Italic 40px Times New Roman";
    }else if (score >= 1000){
        ctx.font = "Italic 30px Times New Roman";
    }
    ctx.fillText(score,900,40);

    //Life
   
    ctx.drawImage(lifeTab[0],30,150,heartSize1,heartSize1);
    ctx.drawImage(lifeTab[1],30,200,heartSize2,heartSize2);
    ctx.drawImage(lifeTab[2],30,250,heartSize3,heartSize3);
}

//Ship
const shipArt = new Image(); shipArt.src = "./IMG/ship.png";
let shipX = 100;
let shipY = 170;
let velocity = 24;
const shipW = 80;
const shipH = 60;
let shipYNow = 200;

function ship(){
    ctx.drawImage(shipArt,shipX,shipY,shipW,shipH);
}

const move = (e) => {
    //console.log(e.keyCode)
    //console.log(shotY);
    switch(e.keyCode){
        case 38:
            if(shipY > 20){
                shipY -= velocity;
            }
        break;
        case 40:
            if(shipY < 380 - shipH){
                shipY += velocity;
            }
        break;
        case 87:
            if(shipY > 20){
                shipY -= velocity;
                }
        break;
        case 83:
            if(shipY < 380 - shipH){
                shipY += velocity;
            }
        break;
        case 32:
            shotBall = true;
            shotSize = 10;
            blockShotY = true;
            console.log(shotY);
         break;
        }
    }
    window.addEventListener("keydown", move);
    window.addEventListener("click", move);
    
    
    //Shot
    let shotX = shipX + 80;
    let shotY = 200;
    let shotSize = 10;
    let shotSpeed = 5;
    let shotBall = false;
    let blockShotY = false;
    function shot(){
        ctx.fillStyle = 'white';
        ctx.fillRect(shotX,shotY,shotSize,shotSize);
        shotX += shotSpeed;
        

    
    }

    //Enemy
    const enemy1 = new Image(); enemy1.src = "./IMG/Enemy.png";
    const enemy2 = new Image(); enemy2.src = "./IMG/Enemy2.png";
    const enemy3 = new Image(); enemy3.src = "./IMG/Enemy3.png";
    const tableEnemy = [enemy1,enemy2,enemy3];
    const tableY = [32,56,80,104,128,152,176,200,224,248,272,296,320,344,368];
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    let losEnemy = getRandomIntInclusive(0,2);
    let losEnemyY = getRandomIntInclusive(0,14);
    
    let enemyX = 1024;
    let enemySize = 30;
    let speedEnemy = 3; 

    function spawnEnemy(){
        ctx.drawImage(tableEnemy[losEnemy],enemyX,tableY[losEnemyY],enemySize,enemySize);
        enemyX -= speedEnemy;
        if(enemyX <= -100){
            enemySize = 30;
            enemyX = 1024;
            losEnemyY = getRandomIntInclusive(0,14);
            losEnemy = getRandomIntInclusive(0,2);
            spawnEnemy();
            
        }
        

    }
    //Score
    let score = 0;
    function getScore(){
        score += 10;
    }
    
    //Life
    const life = new Image(); life.src = "./IMG/heart.png";
    let heartSize1 = 30;
    let heartSize2 = 30;
    let heartSize3 = 30;
    let heartSizeAll = 3;
    let lifeTab = [life,life,life];
    let lifeLose = true;
    function loseLife(){
        if(lifeLose == true){
        if((enemyX <= shipX + shipH)&& (tableY[losEnemyY] + enemySize / 2 >= shipY) && (tableY[losEnemyY] + enemySize / 2 <= shipY + shipH) && (enemyX >= shipX)){
            lifeLose = false;
            heartSizeAll -= 1;
            if(lifeLose == false){
                let x = setInterval(() =>{},10);
                setTimeout(() =>{lifeLose = true;clearInterval(x);},10000);
                }
                console.log(lifeLose);
        }
    }
    }
    

    //Engine
    function Engine() {
        back();
        ship();
        spawnEnemy();
        loseLife();
        
        if(shotBall == true){
           shot();
            if((shotX <= enemyX + enemySize)&& (shotY + shotSize / 2 >= tableY[losEnemyY]) && (shotY + shotSize / 2 <= tableY[losEnemyY] + enemySize) && (shotX >= enemyX)){
                //Shot
                shotX = shipX + 80;
                shotSize = 0;
                blockShotY = false;
                shotBall = false;

                //Enemy
                enemySize = 30;
                enemyX = 1024;
                losEnemyY = getRandomIntInclusive(0,14);
                losEnemy = getRandomIntInclusive(0,2);
                spawnEnemy();

                //Score
                getScore();
                console.log(score);

                
            
                
                
            }else if(shotX >= 1024){
                shotX = shipX + 80;
                shotSize = 0;
                blockShotY = false;
                shotBall = false;
            }
        
        }
        if(blockShotY == false){
            shotY = shipY + (shipH / 2);
            };

            

    
}


setInterval(Engine, 1000/60);
