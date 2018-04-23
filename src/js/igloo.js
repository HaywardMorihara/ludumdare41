IglooGroup = function() {
	function init() {
		iglooGroup = PhaserGame.add.group();
	    iglooGroup.enableBody = true;
	    igloo = iglooGroup.create(NestGroup.nest.x, NestGroup.nest.y - 200, 'igloo');
	    igloo.anchor.setTo(0.5, 0);
	    igloo.body.immovable = true;
	    return iglooGroup;
	}

	return {
		init: init
	}
}();