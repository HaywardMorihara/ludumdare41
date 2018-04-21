var game = new Phaser.Game(800, 600, Phaser.AUTO, 'penguin-defense', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('penguin', 'assets/sprites/p-1.png');
    game.load.image('enemy', 'assets/sprites/phaser-dude.png');
}

function create() {
    initializeGame(game);
}

function update() {
    updateGame(game);
}

function render() {
    if (true) {
        debug(game);
    }
}