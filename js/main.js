import { player, updatePlayer, drawPlayer } from "./player.js";
import { drawFloor, drawWalls } from "./dungeon.js";
import { drawHUD } from "./hud.js";
import { enemy, updateEnemy, drawEnemy } from "./enemy.js";



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawFloor(ctx, canvas);
    drawWalls(ctx);
    drawEnemy(ctx);
    drawPlayer(ctx);
    drawHUD(ctx, player);
}

function gameLoop() {

    updatePlayer(canvas);

    updateEnemy();

    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();