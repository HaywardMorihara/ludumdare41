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
    PhaserGame.load.spritesheet('penguin-black', 'assets/sprites/penguin.png', 200, 200);
    PhaserGame.load.spritesheet('penguin-orange', 'assets/sprites/penguin-orange.png', 200, 200);
    PhaserGame.load.spritesheet('penguin-blue', 'assets/sprites/penguin-blue.png', 200, 200);
    PhaserGame.load.spritesheet('penguin-pink', 'assets/sprites/penguin-pink.png', 200, 200);
    PhaserGame.load.image('nest', 'assets/static/nest.png');
    PhaserGame.load.image('egg', 'assets/static/egg.png');
    PhaserGame.load.image('enemy', 'assets/sprites/phaser-dude.png');
    PhaserGame.load.spritesheet('snowball', 'assets/sprites/snowball.png');
    PhaserGame.load.image('igloo', 'assets/static/igloo.png');
    PhaserGame.load.spritesheet('hearts', 'assets/sprites/hearts.png', 150, 150);
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
        Game.init(1);
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
