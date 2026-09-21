import { keys } from "./input.js";
import { player } from "./player.js";
import { enemies } from "./enemy.js";
import { boss } from "./boss.js";
import { isColliding } from "./collision.js";
import { gameState } from "./gameState.js";


const damageNumbers = [];

function createDamageNumber(enemy, damage) {
    damageNumbers.push({
        x: enemy.x + enemy.width / 2,
        y: enemy.y,
        damage: damage,
        life: 500,
        createdAt: performance.now()
    });
}

function drawDamageNumbers(ctx) {
    const currentTime = performance.now();

    for (let i = damageNumbers.length - 1; i >= 0; i--) {
        const number = damageNumbers[i];

        const elapsed = currentTime - number.createdAt;
        const progress = elapsed / number.life;

        if (progress >= 1) {
            damageNumbers.splice(i, 1);
            continue;
        }

        number.y -= 0.5;

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            `-${number.damage}`,
            number.x,
            number.y
        );
    }
}

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
                createDamageNumber(enemy, attack.damage);

                if (enemy.health < 0) {
                    enemy.health = 0;
                }

                enemy.hitFlash = true;
                enemy.hitFlashUntil = performance.now() + 100;

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
    if (!attack.active) return;

    const progress =
        1 - (attack.activeUntil - performance.now()) / 100;

    const centerX = player.x + player.width / 2;
    const centerY = player.y + player.height / 2;

    ctx.save();

    ctx.translate(centerX, centerY);

    let angle = 0;

    if (player.direction === "right") {
        angle = -Math.PI / 4 + progress * (Math.PI / 2);
    }

    if (player.direction === "left") {
        angle = Math.PI * 3 / 4 + progress * (Math.PI / 2);
    }

    if (player.direction === "up") {
        angle = -Math.PI / 2 + progress * Math.PI;
    }

    if (player.direction === "down") {
        angle = Math.PI / 2 + progress * Math.PI;
    }

    ctx.rotate(angle);

   
    ctx.strokeStyle = "#ecf0f1";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(45, 0);
    ctx.stroke();


    ctx.strokeStyle = "#8e6e53";
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(5, -8);
    ctx.lineTo(5, 8);
    ctx.stroke();

    ctx.restore();
}

export {
    updateCombat,
    drawAttack,
    drawDamageNumbers
};