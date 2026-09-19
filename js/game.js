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

const walls = [
    { x: 100, y: 100, width: 200, height: 30 },
    { x: 500, y: 100, width: 200, height: 30 },
    { x: 100, y: 470, width: 200, height: 30 },
    { x: 500, y: 470, width: 200, height: 30 },
    { x: 100, y: 130, width: 30, height: 340 },
    { x: 670, y: 130, width: 30, height: 340 }
];

function isColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function updatePlayer(){
    if(keys["w"] || keys["arrowup"]){
        player.y -= player.speed;

        for(const wall of walls){
            if(isColliding(player,wall)) {
                player.y +=player.speed;
            }
        }
    }

    if(keys["s"] || keys["arrowdown"]){
        player.y += player.speed;

        for(const wall of walls){
            if(isColliding(player,wall)) {
                player.y -=player.speed;
            }
        }
    }

    if(keys["a"] || keys["arrowleft"]){
        player.x -= player.speed;

        for(const wall of walls){
            if(isColliding(player,wall)){
                player.x += player.speed;
            }
        }
    }

    if(keys["d"] || keys["arrowright"]){
        player.x += player.speed;

        for(const wall of walls){
            if(isColliding(player,wall)){
                player.x -= player.speed;
            }
        }
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

function drawFloor(){
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}
function drawWalls(){

    for (const wall of walls) {
        ctx.fillStyle = "#3b3b3b";
        ctx.fillRect(
            wall.x,
            wall.y,
            wall.width,
            wall.height
        );

        ctx.strokeStyle = "#666";
        ctx.lineWidth = 2;
        ctx.strokeRect(
            wall.x,
            wall.y,
            wall.width,
            wall.height
        );
    }
}

function drawPlayer(){
    ctx.fillStyle = "#3498db";
    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

    ctx.strokeStyle = "#ffffff";
     ctx.lineWidth = 2;
        ctx.strokeRect(
        player.x,
        player.y,
        player.width,
        player.height
        );
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFloor();
    drawWalls();
    drawPlayer();
}

function gameLoop(){
    updatePlayer();

    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();