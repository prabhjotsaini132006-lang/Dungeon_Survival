function drawHUD(ctx, player) {

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    ctx.fillText(
        `Level: ${player.level}`,
        20,
        30
    );

    ctx.fillText(
        `Score: ${player.score}`,
        650,
        30
    );

    // Health bar background
    ctx.fillStyle = "#333";
    ctx.fillRect(20, 45, 200, 20);

    // Health bar
    const healthPercentage =
        player.health / player.maxHealth;

    ctx.fillStyle = "#e74c3c";

    ctx.fillRect(
        20,
        45,
        200 * healthPercentage,
        20
    );

    ctx.fillStyle = "white";
    ctx.font = "14px Arial";

    ctx.fillText(
        `HP: ${player.health}/${player.maxHealth}`,
        25,
        60
    );

    // XP bar background
    ctx.fillStyle = "#333";
    ctx.fillRect(20, 75, 200, 12);

    const xpPercentage =
        player.xp / player.xpToNextLevel;

    ctx.fillStyle = "#f1c40f";

    ctx.fillRect(
        20,
        75,
        200 * xpPercentage,
        12
    );

    ctx.fillStyle = "white";

    ctx.fillText(
        `XP: ${player.xp}/${player.xpToNextLevel}`,
        230,
        85
    );
}

export { drawHUD };