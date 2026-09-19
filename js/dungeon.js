const walls = [
    { x: 100, y: 100, width: 200, height: 30 },
    { x: 500, y: 100, width: 200, height: 30 },
    { x: 100, y: 470, width: 200, height: 30 },
    { x: 500, y: 470, width: 200, height: 30 },
    { x: 100, y: 130, width: 30, height: 340 },
    { x: 670, y: 130, width: 30, height: 340 }
];

function drawFloor(ctx, canvas) {
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawWalls(ctx) {
    for (const wall of walls) {
        ctx.fillStyle = "#3b3b3b";

        ctx.fillRect(
            wall.x,
            wall.y,
            wall.width,
            wall.height
        );

        ctx.strokeStyle = "#666";
        ctx.lineWidth = 2;

        ctx.strokeRect(
            wall.x,
            wall.y,
            wall.width,
            wall.height
        );
    }
}

export { walls, drawFloor, drawWalls };