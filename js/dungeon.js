import { player } from "./player.js";
const walls = [
    { x: 100, y: 100, width: 200, height: 30 },
    { x: 500, y: 100, width: 200, height: 30 },
    { x: 100, y: 470, width: 200, height: 30 },
    { x: 500, y: 470, width: 200, height: 30 },
    { x: 100, y: 130, width: 30, height: 340 },
    { x: 670, y: 130, width: 30, height: 340 }
];

const pillars = [
    { x: 80, y: 80, size: 30 },
    { x: 690, y: 80, size: 30 },
    { x: 80, y: 490, size: 30 },
    { x: 690, y: 490, size: 30 }
];

const torches = [
    { x: 120, y: 120 },
    { x: 680, y: 120 },
    { x: 120, y: 480 },
    { x: 680, y: 480 }
];

function drawFloor(ctx, canvas) {
    
    ctx.fillStyle = "#151515";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    
    const tileSize = 40;

    ctx.strokeStyle = "#202020";
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += tileSize) {
        for (let y = 0; y < canvas.height; y += tileSize) {
            ctx.strokeRect(
                x,
                y,
                tileSize,
                tileSize
            );
        }
    }
}

function drawWalls(ctx) {
    for (const wall of walls) {

        ctx.fillStyle = "#3a3a3a";
        ctx.fillRect(
            wall.x,
            wall.y,
            wall.width,
            wall.height
        );

        ctx.fillStyle = "#555555";
        ctx.fillRect(
            wall.x,
            wall.y,
            wall.width,
            5
        );

        ctx.fillStyle = "#222222";
        ctx.fillRect(
            wall.x,
            wall.y + wall.height - 5,
            wall.width,
            5
        );

        ctx.strokeStyle = "#111111";
        ctx.lineWidth = 2;

        ctx.strokeRect(
            wall.x,
            wall.y,
            wall.width,
            wall.height
        );

        ctx.strokeStyle = "#292929";
        ctx.lineWidth = 1;

        const stoneSize = 25;

        for (
            let x = wall.x + stoneSize;
            x < wall.x + wall.width;
            x += stoneSize
        ) {
            ctx.beginPath();
            ctx.moveTo(x, wall.y);
            ctx.lineTo(x, wall.y + wall.height);
            ctx.stroke();
        }
    }
}

function drawPillars(ctx) {
    for (const pillar of pillars) {
        const centerX = pillar.x + pillar.size / 2;
        const centerY = pillar.y + pillar.size / 2;

        ctx.fillStyle = "#151515";
        ctx.fillRect(
            pillar.x + 4,
            pillar.y + 5,
            pillar.size,
            pillar.size
        );

        ctx.fillStyle = "#666666";
        ctx.fillRect(
            pillar.x,
            pillar.y,
            pillar.size,
            pillar.size
        );

        ctx.fillStyle = "#888888";
        ctx.fillRect(
            pillar.x - 4,
            pillar.y - 4,
            pillar.size + 8,
            6
        );

        ctx.fillStyle = "#4a4a4a";
        ctx.beginPath();
        ctx.arc(
            centerX,
            centerY,
            8,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.strokeStyle = "#222222";
        ctx.lineWidth = 2;
        ctx.strokeRect(
            pillar.x,
            pillar.y,
            pillar.size,
            pillar.size
        );
    }
}

function drawLighting(ctx, canvas) {
    
    ctx.save();

    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "destination-out";

    for (const torch of torches) {
        const gradient = ctx.createRadialGradient(
            torch.x,
            torch.y,
            10,
            torch.x,
            torch.y,
            150
        );

        gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
        gradient.addColorStop(0.4, "rgba(0, 0, 0, 0.7)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(
            torch.x,
            torch.y,
            150,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

const playerCenterX = player.x + player.width / 2;
const playerCenterY = player.y + player.height / 2;

const playerLight = ctx.createRadialGradient(
    playerCenterX,
    playerCenterY,
    20,
    playerCenterX,
    playerCenterY,
    200
);
    playerLight.addColorStop(0, "rgba(0, 0, 0, 1)");
    playerLight.addColorStop(0.5, "rgba(0, 0, 0, 0.65)");
    playerLight.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = playerLight;

    ctx.beginPath();
   ctx.arc(
    playerCenterX,
    playerCenterY,
    200,
    0,
    Math.PI * 2
);
    ctx.fill();

    ctx.restore();
}

function drawTorches(ctx) {
    const time = performance.now();

    for (const torch of torches) {
        const flicker = Math.sin(time * 0.01 + torch.x) * 2;
        const flameSize = 8 + Math.sin(time * 0.015 + torch.y) * 2;

        ctx.strokeStyle = "#5c4033";
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(torch.x, torch.y);
        ctx.lineTo(torch.x, torch.y + 25);
        ctx.stroke();

        ctx.fillStyle = "#f39c12";

        ctx.beginPath();
        ctx.arc(
            torch.x + flicker,
            torch.y - 3,
            flameSize,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.fillStyle = "#f1c40f";

        ctx.beginPath();
        ctx.arc(
            torch.x + flicker,
            torch.y - 5,
            flameSize / 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}

export {
    walls,
    drawFloor,
    drawWalls,
    drawPillars,
    drawTorches,
    drawLighting
};