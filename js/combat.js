import { keys } from "./input.js";
import { player } from "./player.js";
import { enemies } from "./enemy.js";
import { boss } from "./boss.js";
import { isColliding } from "./collision.js";
import { gameState } from "./gameState.js";

const attack = {
    width: 30,
    height: 30,
    damage: 25,
    cooldown: 400,
    lastAttackTime: 0,
    active: false,
    activeUntil: 0
};

function getAttackBox() {

    const box = {
        x: player.x,
        y: player.y,
        width: player.width,
        height: player.height
    };

    if (player.direction === "up") {
        box.x = player.x + 10;
        box.y = player.y - attack.height;
        box.width = player.width - 20;
        box.height = attack.height;
    }

    if (player.direction === "down") {
        box.x = player.x + 10;
        box.y = player.y + player.height;
        box.width = player.width - 20;
        box.height = attack.height;
    }

    if (player.direction === "left") {
        box.x = player.x - attack.width;
        box.y = player.y + 10;
        box.width = attack.width;
        box.height = player.height - 20;
    }

    if (player.direction === "right") {
        box.x = player.x + player.width;
        box.y = player.y + 10;
        box.width = attack.width;
        box.height = player.height - 20;
    }

    return box;
}

function updateCombat() {

    const currentTime = performance.now();

    if (
        keys[" "] &&
        currentTime - attack.lastAttackTime >= attack.cooldown
    ) {

        const attackBox = getAttackBox();

        for (const enemy of enemies) {

            if (enemy.health <= 0) {
                continue;
            }

            if (isColliding(attackBox, enemy)) {

                const wasAlive = enemy.health > 0;

                enemy.health -= attack.damage;

                if (enemy.health < 0) {
                    enemy.health = 0;
                }

                if (wasAlive && enemy.health === 0) {
                    player.xp += 25;
                    player.score += 100;
                }
            }
        }

    if (boss.active && boss.health > 0) {
    if (isColliding(attackBox, boss)) {
        boss.health -= attack.damage;

        if (boss.health < 0) {
            boss.health = 0;
        }

       if (boss.health === 0) {
        boss.active = false;

        player.xp += 250;
        player.score += 1000;

        gameState.current = "victory";
    }
    }
}

        attack.lastAttackTime = currentTime;

        attack.active = true;
        attack.activeUntil = currentTime + 100;
    }

    if (currentTime > attack.activeUntil) {
        attack.active = false;
    }
}

function drawAttack(ctx) {

    if (!attack.active) {
        return;
    }

    const attackBox = getAttackBox();

    ctx.fillStyle = "#f1c40f";

    ctx.fillRect(
        attackBox.x,
        attackBox.y,
        attackBox.width,
        attackBox.height
    );
}

export {
    updateCombat,
    drawAttack
};