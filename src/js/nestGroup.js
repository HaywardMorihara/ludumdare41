NestGroup = function() {

	var nestGroup;
	var nest;
	var egg1;
	var egg2;

	function init(lives) {
		this.nestGroup = PhaserGame.add.group();
	    this.nestGroup.enableBody = true;
	    this.nest = this.nestGroup.create(Main.screenWidth/2, Main.screenHeight/2, 'nest');
	    this.nest.anchor.setTo(0.5, 0);
	    this.egg1 = this.nestGroup.create(Main.screenWidth/2 - 5, Main.screenHeight/2 - 10, 'egg');
	    this.egg1.anchor.setTo(0.5, 0);
	    this.egg2 = this.nestGroup.create(Main.screenWidth/2 + 5, Main.screenHeight/2 - 10, 'egg');
	    this.egg2.anchor.setTo(0.5, 0);
	    return this.nestGroup;
	}

	function destroyAll() {
		this.nestGroup.destroy();
	}

	return {
		init: init,
		destroyAll: destroyAll,
		nestGroup: nestGroup,
		nest: nest
	}
}();