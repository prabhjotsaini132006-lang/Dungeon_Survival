import { keys } from "./input.js";
import { walls } from "./dungeon.js";
import { isColliding } from "./collision.js";

const player = {
    x: 375,
    y: 375,
    width: 50,
    height: 50,
    speed: 5,

    direction: "right",

    health: 100,
    maxHealth: 100,

    xp: 0,
    xpToNextLevel: 100,
    level: 1,

    score: 0
};

function updatePlayer(canvas) {

    if (keys["w"] || keys["arrowup"]) {
        player.direction = "up";

        player.y -= player.speed;

        for (const wall of walls) {
            if (isColliding(player, wall)) {
                player.y += player.speed;
            }
        }
    }

    if (keys["s"] || keys["arrowdown"]) {
        player.direction = "down";

        player.y += player.speed;

        for (const wall of walls) {
            if (isColliding(player, wall)) {
                player.y -= player.speed;
            }
        }
    }

    if (keys["a"] || keys["arrowleft"]) {
        player.direction = "left";
        
        player.x -= player.speed;

        for (const wall of walls) {
            if (isColliding(player, wall)) {
                player.x += player.speed;
            }
        }
    }

    if (keys["d"] || keys["arrowright"]) {
        player.direction = "right";
        
        player.x += player.speed;

        for (const wall of walls) {
            if (isColliding(player, wall)) {
                player.x -= player.speed;
            }
        }
    }

    if (player.x < 0) {
        player.x = 0;
    }

    if (player.y < 0) {
        player.y = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

function drawPlayer(ctx) {
    const centerX = player.x + player.width / 2;
    const centerY = player.y + player.height / 2;


    ctx.fillStyle = "#3498db";
    ctx.fillRect(
        player.x + 8,
        player.y + 12,
        player.width - 16,
        player.height - 12
    );

    ctx.fillStyle = "#f1c40f";
    ctx.beginPath();
    ctx.arc(
        centerX,
        player.y + 12,
        12,
        0,
        Math.PI * 2
    );
    ctx.fill();


    ctx.fillStyle = "#222222";

    if (player.direction === "left") {
        ctx.fillRect(centerX - 8, player.y + 8, 4, 4);
        ctx.fillRect(centerX - 2, player.y + 8, 4, 4);
    } else {
        ctx.fillRect(centerX + 2, player.y + 8, 4, 4);
        ctx.fillRect(centerX + 8, player.y + 8, 4, 4);
    }

    ctx.strokeStyle = "#ecf0f1";
    ctx.lineWidth = 4;

    ctx.beginPath();

    if (player.direction === "right") {
        ctx.moveTo(player.x + player.width, centerY);
        ctx.lineTo(player.x + player.width + 15, centerY - 10);
    }

    if (player.direction === "left") {
        ctx.moveTo(player.x, centerY);
        ctx.lineTo(player.x - 15, centerY - 10);
    }

    if (player.direction === "up") {
        ctx.moveTo(centerX, player.y);
        ctx.lineTo(centerX + 10, player.y - 15);
    }

    if (player.direction === "down") {
        ctx.moveTo(centerX, player.y + player.height);
        ctx.lineTo(centerX + 10, player.y + player.height + 15);
    }

    ctx.stroke();
}

function checkLevelUp(){
    if(player.xp >= player.xpToNextLevel){

        player.xp -= player.xpToNextLevel;

        player.level +=1;

        player.xpToNextLevel =
            Math.floor(player.xpToNextLevel * 1.25);

        player.maxHealth += 10;
        player.health = player.maxHealth;

        player.speed += 0.2;
    }
}

function resetPlayer() {
    player.x = 375;
    player.y = 375;

    player.health = 100;
    player.maxHealth = 100;

    player.xp = 0;
    player.xpToNextLevel = 100;

    player.level = 1;
    player.score = 0;

    player.direction = "right";
}

export {
    player,
    updatePlayer,
    drawPlayer,
    checkLevelUp,
    resetPlayer
};