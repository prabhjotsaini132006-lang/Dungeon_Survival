const canvas= document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: 375,
    y: 375,
    width: 50,
    height: 50
};

function drawPlayer(){
    ctx.fillStyle = "blue";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );
}

function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);

    drawPlayer();
}

draw();

console.log("Player Created!");