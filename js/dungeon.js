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

export {
    walls,
    drawFloor,
    drawWalls,
    drawPillars
};