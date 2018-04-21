//movable game objects
var penguin;
var enemy;

//static game objects
var nestGroup;
var egg;
var nest;

//keys
var upKey;
var downKey;
var leftKey;
var rightKey;

//stats
var lives;
var livesText;

function initializeGame(game) {
	game.stage.backgroundColor = '#736357';
	game.physics.startSystem(Phaser.Physics.ARCADE);

    //initialize stats
    lives = 3;
    livesText = game.add.text(16, 16, 'lives: ' + lives, { fontSize: '32px', fill: '#000' });

    //initialize static game objects
    nestGroup = initializeNestGroup(game, lives);

    //initialize players
	penguin = initializePenguin(game);
    enemy = initializeEnemy(game);

    //initialize keystrokes
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

function updateGame(game) {
	updatePenguin(penguin);

    updateEnemy(enemy);

    game.physics.arcade.collide(penguin, enemy);
    game.physics.arcade.overlap(enemy, nestGroup, loseLife, null, this);
}



function debug(game) {
	debugPenguin(game, penguin);

	debugEnemy(game, enemy);
}

function loseLife(enemy, nestGroup) {
    enemy.kill();
    livesText.text = 'lives: ' + --lives;
}
