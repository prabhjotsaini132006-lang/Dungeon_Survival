import { player } from "./player.js";
import { isColliding } from "./collision.js";

const enemy = {
    x: 200,
    y: 200,
    width: 40,
    height: 40,
    speed: 1.5,
    damage: 10,

    health: 100,
    maxHealth: 100,

    attackCooldown: 500,
    lastAttackTime: 0
};

function isEnemyAlive() {
    return enemy.health > 0;
}



function updateEnemy() {
    if (!isEnemyAlive()) {
    return;
}
    if (enemy.x < player.x) {
        enemy.x += enemy.speed;
    }

    if (enemy.x > player.x) {
        enemy.x -= enemy.speed;
    }

    if (enemy.y < player.y) {
        enemy.y += enemy.speed;
    }

    if (enemy.y > player.y) {
        enemy.y -= enemy.speed;
    }

    if (isColliding(enemy, player)) {

        const currentTime = performance.now();

         if (
            currentTime - enemy.lastAttackTime >=
            enemy.attackCooldown
        ) {
            player.health -= enemy.damage;

            if (player.health < 0) {
                player.health = 0;
            }

            enemy.lastAttackTime = currentTime;
        }
    }
}

function drawEnemy(ctx) {

    if (!isEnemyAlive()) {
        return;
    }

    ctx.fillStyle = "#e74c3c";

    ctx.fillRect(
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
    );

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;

    ctx.strokeRect(
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
    );
}

export {
    enemy,
    updateEnemy,
    drawEnemy,
    isEnemyAlive
};