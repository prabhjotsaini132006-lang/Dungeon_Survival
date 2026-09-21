import { player } from "./player.js";
import { isColliding } from "./collision.js";
import { gameState } from "./gameState.js";
import { boss, startBoss } from "./boss.js";

const enemies = [];



function startWave(canvas) {
    const enemyCount = 2 + gameState.currentWave * 2;

    for (let i = 0; i < enemyCount; i++) {
        spawnEnemy(canvas);
    }
}

function isWaveComplete() {

    for (const enemy of enemies) {
        if (enemy.health > 0) {
            return false;
        }
    }

    return true;
}

function startNextWave(canvas) {
    if (!isWaveComplete()) {
        return;
    }

    console.log("Wave complete:", gameState.currentWave);

    if (gameState.currentWave >= gameState.maxWaves) {
        console.log("STARTING BOSS");

        gameState.current = "boss";
        startBoss(canvas);

        console.log("Game State:", gameState.current);
        console.log("Boss:", boss);

        return;
    }

    gameState.currentWave += 1;
    startWave(canvas);
}

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

function spawnEnemy(canvas) {

    const x = Math.random() * (canvas.width - 40);
    const y = Math.random() * (canvas.height - 40);

    enemies.push(createEnemy(x, y));
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

export {
    enemies,
    createEnemy,
    spawnEnemy,
    updateEnemies,
    drawEnemies,
    startWave,
    startNextWave
};