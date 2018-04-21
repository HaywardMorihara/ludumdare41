var penguin;
var enemy;

var upKey;
var downKey;
var leftKey;
var rightKey;

function initializeGame(game) {
	game.stage.backgroundColor = '#736357';
	game.physics.startSystem(Phaser.Physics.ARCADE);

	penguin = initializePenguin(game);
    enemy = initializeEnemy(game);

    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

function updateGame(game) {
	updatePenguin(penguin);

    updateEnemy(enemy);

    game.physics.arcade.collide(penguin, enemy);
}

function debug(game) {
	debugPenguin(game, penguin);

	debugEnemy(game, enemy);
}