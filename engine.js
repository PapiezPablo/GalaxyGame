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
    switch(e.keyCode){
        case 38:
            if(shipY > 20){
                shipY -= velocity;
                shipYNow -= 24; 
                shotY = shipYNow + (shipH / 2);
            }
        break;
        case 40:
            if(shipY < 380 - shipH){
                shipY += velocity;
                shipYNow += 24;
                shotY = shipYNow + (shipH / 2);
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
    function shot(){
        ctx.fillStyle = 'white';
        ctx.fillRect(shotX,shotY,shotSize,shotSize);
        shotX += shotSpeed;
        
        shotY = shipY + (shipH / 2);

    
    }
    console.log(shipY);
    
    
    //Engine
    function Engine() {
        back();
        ship();

        if(shotBall == true){
           shot();
            if(shotX >= 1024){

                shotBall = false;
                shotX = shipX + 80;
                shotSize = 0;
            
                
                
            }
        }

    
}


setInterval(Engine, 1000/60);
