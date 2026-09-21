import {
    player,
    updatePlayer,
    drawPlayer,
    checkLevelUp
} from "./player.js";

import {
    drawFloor,
    drawWalls
} from "./dungeon.js";

import { drawHUD } from "./hud.js";

import {
    updateEnemies,
    drawEnemies
} from "./enemy.js";

import {
    updateCombat,
    drawAttack
} from "./combat.js";

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
    drawEnemies(ctx);
    drawPlayer(ctx);
    drawAttack(ctx);
    drawHUD(ctx, player);
}

function gameLoop() {

    updatePlayer(canvas);

    updateEnemies();

    updateCombat();

    checkLevelUp();

    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();