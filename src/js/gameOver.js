GameOver = function () {
	
	function init(timer) {
		PhaserGame.stage.backgroundColor = '#000000';

		var textStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

	    gameOverText = PhaserGame.add.text(Main.screenWidth/2, Main.screenHeight/6, "You Suck", textStyle);
		gameOverText.anchor.setTo(0.5, 0);

		timeText = PhaserGame.add.text(Main.screenWidth/2, Main.screenHeight/4, "Time: " + timer, textStyle);
		timeText.anchor.setTo(0.5, 0);

		timeText = PhaserGame.add.text(Main.screenWidth/2, Main.screenHeight/2, "Press [Enter] to Go To Menu", textStyle);
		timeText.anchor.setTo(0.5, 0);


		Controller.enterKey.onUp.add(function() {
			destroyAll();
			Main.state = State.MENU;
			Menu.init();
		})


		function destroyAll() {
			title.destroy();
			Controller.enterKey.onUp.removeAll();
		}
	}

	return {
		init: init
	}

}();