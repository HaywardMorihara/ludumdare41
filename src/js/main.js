var PhaserGame;

Main = {
    debugMode: false,
    state: null,
    screenWidth: 1200,
    screenHeight: 600
};

State = {
  MENU: 0,
  GAME: 1
};

function preload() {
    PhaserGame.load.spritesheet('penguin', 'assets/sprites/penguin.png', 200, 200);
    PhaserGame.load.image('nest', 'assets/static/nest.png');
    PhaserGame.load.image('egg', 'assets/static/diamond.png');
    PhaserGame.load.image('enemy', 'assets/sprites/phaser-dude.png');
}

function create() {
    Controller.init();
    
    if (Main.debugMode) {
        Main.state = State.GAME;
    } else {
        Main.state = State.MENU;
    }

    if (Main.state == State.MENU) {
        Menu.init();
    } else if (Main.state == State.GAME) {
        Game.init();
    } 
}

function update() {
    if (Main.state == State.MENU) {
        Menu.update();
    } else if (Main.state == State.GAME) {
        Game.update();
    }
}

function render() {
    if (Main.debugMode) {
        Game.debug();
    }
}

document.addEventListener('DOMContentLoaded', function() {
   PhaserGame = new Phaser.Game(Main.screenWidth, Main.screenHeight, Phaser.AUTO, 'penguin-defense', 
    { preload: preload, 
        create: create, 
        update: update, 
        render: render });
}, false);
