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
    let shotSpeed = 3;
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
        if(enemyX <= 0){
            enemySize = 30;
            enemyX = 1024;
            losEnemyY = getRandomIntInclusive(0,14);
            losEnemy = getRandomIntInclusive(0,2);
            spawnEnemy();
            
        }
        

    }
    
    
    
    //Engine
    function Engine() {
        back();
        ship();
        spawnEnemy();
    
        
        if(shotBall == true){
           shot();
            if(shotX >= 1024){

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
