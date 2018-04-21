var game = new Phaser.Game(800, 600, Phaser.AUTO, 'penguin-defense', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.spritesheet('penguin', 'assets/sprites/penguin-front.png', 200, 200);
    game.load.image('nest', 'assets/static/nest.png');
    game.load.image('egg', 'assets/static/diamond.png');
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