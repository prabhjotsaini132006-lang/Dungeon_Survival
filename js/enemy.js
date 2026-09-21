import { player } from "./player.js";
import { isColliding } from "./collision.js";

const enemies = [];

function createEnemy(x, y) {
    return {
        x: x,
        y: y,
        width: 40,
        height: 40,
        speed: 1.5,
        damage: 10,

        health: 100,
        maxHealth: 100,

        attackCooldown: 500,
        lastAttackTime: 0
    };
}

function updateEnemies() {

    for (const enemy of enemies) {

        if (enemy.health <= 0) {
            continue;
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
}

function drawEnemies(ctx) {

    for (const enemy of enemies) {

        if (enemy.health <= 0) {
            continue;
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
}

enemies.push(createEnemy(200, 200));
enemies.push(createEnemy(600, 200));
enemies.push(createEnemy(200, 400));
enemies.push(createEnemy(600, 400));

export {
    enemies,
    updateEnemies,
    drawEnemies
};