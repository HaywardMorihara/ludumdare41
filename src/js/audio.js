Audio = function() {

	var music;
	var snowball;
	var step;

	function init() {
		music = new Phaser.Sound(PhaserGame, 'music', 0.1, true);
		snowball = new Phaser.Sound(PhaserGame, 'snowball', 1, false);
		step = new Phaser.Sound(PhaserGame, 'penguin-walk', 1, true);
	}

	function playFx(key) {
		switch (key) {
			case "music":
				music.play();
				break;
			case "snowball":
				snowball.play();
				break;
			case "step":
				step.play();
				break;
		}
    }

    function stopFx(key) {
    	switch (key) {
    		case "music":
    			music.destroy();
    			break;
    		case "step":
    			step.destroy();
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