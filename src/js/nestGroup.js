NestGroup = function() {
	function init(lives) {
		nestGroup = PhaserGame.add.group();
	    nestGroup.enableBody = true;
	    nest = nestGroup.create(300, 300, 'nest');
	    egg = nestGroup.create(305, 290, 'egg');
	    egg = nestGroup.create(320, 290, 'egg');
	    return nestGroup;
	}

	return {
		init: init
	}
}();