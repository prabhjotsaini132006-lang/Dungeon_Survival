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

    if(player.x < 0){
        player.x = 0;
    }

    if(player.y < 0){
        player.y = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
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