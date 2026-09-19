import { keys } from "./input.js";
import { walls } from "./dungeon.js";
import { isColliding } from "./collision.js";

const player = {
    x: 375,
    y: 375,
    width: 50,
    height: 50,
    speed: 5,

    health: 100,
    maxHealth: 100,

    xp: 0,
    xpToNextLevel: 100,
    level: 1,

    score: 0
};

function updatePlayer(canvas) {

    if (keys["w"] || keys["arrowup"]) {
        player.y -= player.speed;

        for (const wall of walls) {
            if (isColliding(player, wall)) {
                player.y += player.speed;
            }
        }
    }

    if (keys["s"] || keys["arrowdown"]) {
        player.y += player.speed;

        for (const wall of walls) {
            if (isColliding(player, wall)) {
                player.y -= player.speed;
            }
        }
    }

    if (keys["a"] || keys["arrowleft"]) {
        player.x -= player.speed;

        for (const wall of walls) {
            if (isColliding(player, wall)) {
                player.x += player.speed;
            }
        }
    }

    if (keys["d"] || keys["arrowright"]) {
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

export { player, updatePlayer, drawPlayer };