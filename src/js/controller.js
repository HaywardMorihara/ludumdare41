Controller = function() {
	
	var upKey;
	var downKey;
	var leftKey;
	var rightKey;
	var spaceKey;

	function init() {
        this.upKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.spaceKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

	return {
		upKey: upKey,
		downKey: downKey,
		leftKey: leftKey,
		rightKey: rightKey,
		spaceKey: spaceKey,
		init: init
	}
}();