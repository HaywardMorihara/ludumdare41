Controller = function() {
	
	var upKey;
	var downKey;
	var leftKey;
	var rightKey;

	function init() {
        this.upKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    }

	return {
		upKey: upKey,
		downKey: downKey,
		leftKey: leftKey,
		rightKey: rightKey,
		init: init
	}
}();