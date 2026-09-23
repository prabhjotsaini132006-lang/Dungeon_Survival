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
        lastAttackTime: 0,

        hitFlash: false,
        hitFlashUntil: 0
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
    const currentTime = performance.now();

    for (const enemy of enemies) {
        if (enemy.health <= 0) continue;

        const centerX = enemy.x + enemy.width / 2;
        const centerY = enemy.y + enemy.height / 2;

     
        if (
            enemy.hitFlash &&
            currentTime < enemy.hitFlashUntil
        ) {
            ctx.fillStyle = "#ffffff";
        } else {
            enemy.hitFlash = false;
            ctx.fillStyle = "#c0392b";
        }

        ctx.fillRect(
            enemy.x + 4,
            enemy.y + 8,
            enemy.width - 8,
            enemy.height - 8
        );

        ctx.fillStyle = enemy.hitFlash ? "#ffffff" : "#e74c3c";

        ctx.beginPath();
        ctx.arc(
            centerX,
            enemy.y + 10,
            13,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.fillStyle = "#111111";

        ctx.fillRect(
            centerX - 8,
            enemy.y + 7,
            5,
            5
        );

        ctx.fillRect(
            centerX + 3,
            enemy.y + 7,
            5,
            5
        );

        ctx.fillStyle = "#7f8c8d";

        ctx.beginPath();
        ctx.moveTo(enemy.x + 7, enemy.y + 2);
        ctx.lineTo(enemy.x + 12, enemy.y - 8);
        ctx.lineTo(enemy.x + 17, enemy.y + 5);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(enemy.x + enemy.width - 7, enemy.y + 2);
        ctx.lineTo(enemy.x + enemy.width - 12, enemy.y - 8);
        ctx.lineTo(enemy.x + enemy.width - 17, enemy.y + 5);
        ctx.fill();


        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;

        ctx.strokeRect(
            enemy.x + 4,
            enemy.y + 8,
            enemy.width - 8,
            enemy.height - 8
        );

        ctx.fillStyle = "#222222";
        ctx.fillRect(
            enemy.x,
            enemy.y - 8,
            enemy.width,
            5
        );

        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(
            enemy.x,
            enemy.y - 8,
            enemy.width * (enemy.health / enemy.maxHealth),
            5
        );
    }
}

function resetEnemies(){
    enemies.length = 0;
}
export {
    enemies,
    createEnemy,
    spawnEnemy,
    updateEnemies,
    drawEnemies,
    startWave,
    startNextWave,
    resetEnemies
};