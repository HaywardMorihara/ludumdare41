IglooGroup = function() {
	function init() {
		iglooGroup = PhaserGame.add.group();
	    iglooGroup.enableBody = true;
	    igloo = iglooGroup.create(450, 150, 'igloo');
	    igloo.body.immovable = true;
	    return iglooGroup;
	}

	return {
		init: init
	}
}();