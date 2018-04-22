Menu = function() {

	var cursor;
	var cursorSelection;

	var title;

	var onePlayer; 
	var twoPlayers;
	var threePlayers;
	var fourPlayers;

	CursorSelection = {
	  ONE_PLAYER: 0,
	  TWO_PLAYERS: 1,
	  THREE_PLAYERS: 2,
	  FOUR_PLAYERS: 3
	};

	function init() {
		var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

		//Title
	    title = PhaserGame.add.text(Main.screenWidth/2, Main.screenHeight/6, "Penguin Defense", style);
		title.anchor.setTo(0.5, 0);

	    //Player Selection
	    onePlayer = PhaserGame.add.text(Main.screenWidth/2, Main.screenHeight/2, "One Player", style);
	    onePlayer.anchor.setTo(0.5, 0);

	    twoPlayers = PhaserGame.add.text(Main.screenWidth/2, (Main.screenHeight/16) * 9, "Two Players", style);
	    twoPlayers.anchor.setTo(0.5, 0);

	    threePlayers = PhaserGame.add.text(Main.screenWidth/2, (Main.screenHeight/16) * 10, "Three Players", style);
	    threePlayers.anchor.setTo(0.5, 0);

	    fourPlayers = PhaserGame.add.text(Main.screenWidth/2, (Main.screenHeight/16) * 11, "Four Players", style);
	    fourPlayers.anchor.setTo(0.5, 0);

	    //Cursor
	    cursor = PhaserGame.add.sprite(onePlayer.x - onePlayer.width, onePlayer.y, 'penguin');
	    cursor.scale.setTo(.2,.2);
	    cursor.animations.add('walk');
	    cursorSelection = CursorSelection.ONE_PLAYER;

	    //Controls
	    Controller.upKey.onUp.add(function() {
			if (cursorSelection > CursorSelection.ONE_PLAYER) {
				cursorSelection = cursorSelection - 1;
				updateCursorLocation();
			}
		});
		Controller.downKey.onUp.add(function() {
			if (cursorSelection < CursorSelection.FOUR_PLAYERS) {
				cursorSelection = cursorSelection + 1;
				updateCursorLocation();
			}
		});
		Controller.enterKey.onUp.add(function() {
			destroyAll();
			Main.state = State.GAME;
			Game.init();
		})
	}

	function updateCursorLocation() {
		if (cursorSelection == CursorSelection.ONE_PLAYER) {
			cursor.y = onePlayer.y;
		} else if (cursorSelection == CursorSelection.TWO_PLAYERS) {
			cursor.y = twoPlayers.y;
		} else if (cursorSelection == CursorSelection.THREE_PLAYERS) {
			cursor.y = threePlayers.y;
		} else if (cursorSelection == CursorSelection.FOUR_PLAYERS) {
			cursor.y = fourPlayers.y;
		}
	}

	function update() {
		cursor.animations.play('walk', 6, true);
	}

	function destroyAll() {
		cursor.destroy();
		title.destroy();
		onePlayer.destroy();
		twoPlayers.destroy();
		threePlayers.destroy();
		fourPlayers.destroy();
	}

	return {
		init: init,
		update: update
	}
}();