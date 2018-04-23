Audio = function() {

	var cursor;
	var music;
	var snowball;
	var seal;

	function init() {
		cursor = new Phaser.Sound(PhaserGame, 'cursor', 0.25, false);
		music = new Phaser.Sound(PhaserGame, 'music', 0.1, true);
		snowball = new Phaser.Sound(PhaserGame, 'snowball', 0.25, false);
		seal = new Phaser.Sound(PhaserGame, 'seal', 0.25, false);
	}

	function playFx(key) {
		switch (key) {
			case "cursor":
				cursor.play();
				break;
			case "music":
				music.play();
				break;
			case "snowball":
				snowball.play();
				break;
			case "seal":
				seal.play();
				break;
		}
    }

    function stopFx(key) {
    	switch (key) {
    		case "music":
    			music.destroy();
    			break;
    	}
    }
	
	return {
		snowball: snowball,
		init: init,
		playFx: playFx,
		stopFx: stopFx
	}
}();