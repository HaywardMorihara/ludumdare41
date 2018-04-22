Enemies = function() {

	var spawnEvent;

	function init() {
		//could be changed based on difficulty
		var timeParam = 1;

		var enemyGroup = PhaserGame.add.group();
		enemyGroup.enableBody = true;
		PhaserGame.physics.enable(enemyGroup, Phaser.Physics.ARCADE);
		spawnEvent = PhaserGame.time.events.loop(Phaser.Timer.SECOND * timeParam, spawnEnemy, this, enemyGroup);

		return enemyGroup;
	}

	function update(enemyGroup) {
		enemyGroup.forEach(function(enemy) {
			PhaserGame.physics.arcade.moveToXY(enemy, 300, 300, 50);
		})
	}

	function spawnEnemy(enemyGroup) {
		
		var width = PhaserGame.width;
		var height = PhaserGame.height;
		var x = PhaserGame.rnd.integerInRange(0, width);
		var y = PhaserGame.rnd.integerInRange(0, height);
		var randSide = PhaserGame.rnd.integerInRange(1,4);
		if (randSide == 1) {
			y = 0;
		} else if (randSide == 2) {
			y = height;
		} else if (randSide == 3) {
			x = 0;
		} else if (randSide == 4) {
			x = width;
		}

        var enemy = enemyGroup.create(x, y, 'enemy');
        enemy.animations.add('flop', [0,1]);
        enemy.animations.play('flop', 5, true);
	}

	function destroySpawnEvent() {
		PhaserGame.time.events.remove(spawnEvent);
	}

	function debug(enemies) {
	    PhaserGame.debug.body(enemies);
	    PhaserGame.debug.bodyInfo(enemies, 32, 150);
	}

	return {
		init: init,
		update: update,
		debug: debug,
		destroySpawnEvent: destroySpawnEvent
	}
}();