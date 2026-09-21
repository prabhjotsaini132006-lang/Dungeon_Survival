const gameState = {
    current: "waves",

    currentWave: 1,
    maxWaves: 10
};

function resetGame() {
    gameState.current = "waves";
    gameState.currentWave = 1;
}

export { gameState,
    resetGame
 };