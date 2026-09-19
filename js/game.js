const canvas= document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: 375,
    y: 375,
    width: 50,
    height: 50,
    speed: 5
};

const keys={}

window.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
});

function updatePlayer(){
    if(keys["w"] || keys["arrowup"]){
        player.y -= player.speed;
    }

    if(keys["s"] || keys["arrowdown"]){
        player.y += player.speed;
    }

    if(keys["a"] || keys["arrowleft"]){
        player.x -= player.speed;
    }

    if(keys["d"] || keys["arrowright"]){
        player.x += player.speed;
    }
}

  

function drawPlayer(){
    ctx.fillStyle = "blue";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );
}

function gameLoop(){
    updatePlayer();

    ctx.clearRect(
        0,0,canvas.width,canvas.height
    );

    drawPlayer();

    requestAnimationFrame(gameLoop);
}

gameLoop();