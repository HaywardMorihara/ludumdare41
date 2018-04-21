function initializeEnemy(game) {
	var enemy = game.add.sprite(700, 300, 'enemy');
	game.physics.enable(enemy, Phaser.Physics.ARCADE);
	return enemy;
}

function updateEnemy(enemy) {
	enemy.body.velocity.x = -100;
}

function debugEnemy(game, enemy) {
    game.debug.body(enemy);

    game.debug.bodyInfo(enemy, 32, 150);
}