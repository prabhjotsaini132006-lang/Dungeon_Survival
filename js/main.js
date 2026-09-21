import {
    player,
    updatePlayer,
    drawPlayer,
    checkLevelUp
} from "./player.js";

import {
    startBoss,
    updateBoss,
    drawBoss
} from "./boss.js";

import { gameState } from "./gameState.js";

import {
    drawFloor,
    drawWalls
} from "./dungeon.js";

import { drawHUD } from "./hud.js";

import {
    updateEnemies,
    drawEnemies,
    startWave,
    startNextWave
} from "./enemy.js";

import {
    updateCombat,
    drawAttack
} from "./combat.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function drawVictoryScreen() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f1c40f";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
        "DUNGEON CLEARED!",
        canvas.width / 2,
        200
    );

    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Arial";
    ctx.fillText(
        "Boss Defeated",
        canvas.width / 2,
        250
    );

    ctx.fillText(
        `Score: ${player.score}`,
        canvas.width / 2,
        300
    );

    ctx.fillText(
        "You survived the dungeon.",
        canvas.width / 2,
        350
    );
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFloor(ctx, canvas);
    drawWalls(ctx);

    if (gameState.current === "waves") {
        drawEnemies(ctx);
    }

    if (gameState.current === "boss") {
        drawBoss(ctx);
    }

    if (gameState.current === "victory") {
    drawVictoryScreen();
    }

    drawPlayer(ctx);
    drawAttack(ctx);
    drawHUD(ctx, player);
}

function gameLoop() {
    updatePlayer(canvas);

    if (gameState.current === "waves") {
        updateEnemies();
        updateCombat();
        checkLevelUp();
        startNextWave(canvas);
    }

   if (gameState.current === "boss") {
    updateBoss();
    updateCombat();
    }

    draw();

    requestAnimationFrame(gameLoop);
}

startWave(canvas);

gameLoop();