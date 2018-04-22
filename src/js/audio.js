Audio = function() {

	var stepSound;

	function init() {
		stepSound = PhaserGame.add.audio('step-sound');
		//PhaserGame.sound.setDecodedCallback([ stepSound ], start, this);
	}

	function playFx() {
        stepSound.play();
    }
	
	return {
		stepSound: stepSound,
		init: init,
		playFx: playFx,
	}
}();