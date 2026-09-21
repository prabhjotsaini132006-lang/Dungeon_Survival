import { player } from "./player.js";
import { isColliding } from "./collision.js";

const boss = {
    x: 350,
    y: 100,

    width: 80,
    height: 80,

    speed: 1,
    damage: 20,

    health: 500,
    maxHealth: 500,

    attackCooldown: 1000,
    lastAttackTime: 0,

    active: false
};

function startBoss(canvas) {
    boss.x = canvas.width / 2 - boss.width / 2;
    boss.y = 50;

    boss.health = boss.maxHealth;
    boss.active = true;
}

function updateBoss() {
    if (!boss.active || boss.health <= 0) {
        return;
    }

    if (boss.x < player.x) {
        boss.x += boss.speed;
    }

    if (boss.x > player.x) {
        boss.x -= boss.speed;
    }

    if (boss.y < player.y) {
        boss.y += boss.speed;
    }

    if (boss.y > player.y) {
        boss.y -= boss.speed;
    }

    // Attack player
    if (isColliding(boss, player)) {
        const currentTime = performance.now();

        if (
            currentTime - boss.lastAttackTime >=
            boss.attackCooldown
        ) {
            player.health -= boss.damage;

            if (player.health < 0) {
                player.health = 0;
            }

            boss.lastAttackTime = currentTime;
        }
    }
}

function drawBoss(ctx) {
    if (!boss.active || boss.health <= 0) {
        return;
    }

    ctx.fillStyle = "#8e44ad";
    ctx.fillRect(
        boss.x,
        boss.y,
        boss.width,
        boss.height
    );

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;

    ctx.strokeRect(
        boss.x,
        boss.y,
        boss.width,
        boss.height
    );

    ctx.fillStyle = "#333333";
    ctx.fillRect(
        boss.x,
        boss.y - 15,
        boss.width,
        8
    );

    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(
        boss.x,
        boss.y - 15,
        boss.width * (boss.health / boss.maxHealth),
        8
    );
}

function resetBoss() {
    boss.x = 350;
    boss.y = 100;

    boss.health = boss.maxHealth;
    boss.active = false;

    boss.lastAttackTime = 0;
}

export {
    boss,
    startBoss,
    updateBoss,
    drawBoss,
    resetBoss
};