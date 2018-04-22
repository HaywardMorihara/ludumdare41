var PhaserGame;

function preload() {
    PhaserGame.load.spritesheet('penguin', 'assets/sprites/penguin.png', 200, 200);
    PhaserGame.load.image('nest', 'assets/static/nest.png');
    PhaserGame.load.image('egg', 'assets/static/diamond.png');
    PhaserGame.load.image('enemy', 'assets/sprites/phaser-dude.png');
}

function create() {
    Game.init();
}

function update() {
    Game.update();
}

function render() {
    if (true) {
        Game.debug();
    }
}

document.addEventListener('DOMContentLoaded', function() {
   PhaserGame = new Phaser.Game(1200, 600, Phaser.AUTO, 'penguin-defense', 
    { preload: preload, create: create, update: update, render: render });
}, false);