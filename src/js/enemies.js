Enemy = function() {
	function init() {
		var enemy = PhaserGame.add.sprite(700, 300, 'enemy');
		PhaserGame.physics.enable(enemy, Phaser.Physics.ARCADE);
		return enemy;
	}

	function update(enemy) {
		enemy.body.velocity.x = -100;
	}

	function debug(enemy) {
	    PhaserGame.debug.body(enemy);

	    PhaserGame.debug.bodyInfo(enemy, 32, 150);
	}

	return {
		init: init,
		update: update,
		debug: debug
	}
}();