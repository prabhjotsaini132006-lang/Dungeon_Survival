import {
    player,
    updatePlayer,
    drawPlayer,
    checkLevelUp,
    resetPlayer
} from "./player.js";

import {
    startBoss,
    updateBoss,
    drawBoss,
    resetBoss
} from "./boss.js";

import { gameState,
        resetGame
 } from "./gameState.js";

import {
    drawFloor,
    drawWalls,
    drawPillars
} from "./dungeon.js";

import { drawHUD } from "./hud.js";

import {
    updateEnemies,
    drawEnemies,
    startWave,
    startNextWave,
    resetEnemies
} from "./enemy.js";

import {
    updateCombat,
    drawAttack,
    drawDamageNumbers
} from "./combat.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartButton = document.getElementById("restartButton");

restartButton.addEventListener("click", () => {
    restartButton.style.display = "none";
    restartGame();
});

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


function drawGameOverScreen() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#e74c3c";
    ctx.font = "45px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        "GAME OVER",
        canvas.width / 2,
        220
    );

    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Arial";

    ctx.fillText(
        `Score: ${player.score}`,
        canvas.width / 2,
        280
    );

    ctx.fillText(
        "You were defeated.",
        canvas.width / 2,
        330
    );
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFloor(ctx, canvas);
    drawWalls(ctx);
    drawPillars(ctx);

    if (gameState.current === "waves") {
        drawEnemies(ctx);
    }

    if (gameState.current === "boss") {
        drawBoss(ctx);
    }

    if (gameState.current === "victory") {
        drawVictoryScreen();
    }

    if (gameState.current === "gameover") {
        drawGameOverScreen();
    }

    drawPlayer(ctx);
    drawAttack(ctx);
    drawDamageNumbers(ctx);
    drawHUD(ctx, player);
}

function restartGame() {
    resetPlayer();
    resetEnemies();
    resetBoss();
    resetGame();

    startWave(canvas);
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


    if (player.health <= 0 && gameState.current !== "gameover") {
    gameState.current = "gameover";
    restartButton.style.display = "block";
    }

    if (gameState.current === "victory") {
    restartButton.style.display = "block";
    }

    draw();

    requestAnimationFrame(gameLoop);
}


startWave(canvas);

gameLoop();