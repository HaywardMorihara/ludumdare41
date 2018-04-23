Menu = function() {

	var cursor;
	var cursorSelection;
	var gcControllerHeldTime = 0;

	var title;
	var titleBackground;

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

	var debugController = false;
	var debugControllerText = [];

	function init() {
		PhaserGame.stage.backgroundColor = '#000000';
		titleBackground = PhaserGame.add.sprite(0, 0, 'titleBackground');

		var textStyle = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };

		//Title
	    title = PhaserGame.add.text(Main.screenWidth/2, Main.screenHeight/6, "Peng'n Bang", textStyle);
		title.anchor.setTo(0.5, 0);
		title.stroke = '#fff';
    	title.strokeThickness = 6;

	    //Player Selection
	    onePlayer = PhaserGame.add.text(Main.screenWidth/2, Main.screenHeight/2, "One Player", textStyle);
	    onePlayer.anchor.setTo(0.5, 0);
	    onePlayer.stroke = '#fff';
    	onePlayer.strokeThickness = 6;

	    twoPlayers = PhaserGame.add.text(Main.screenWidth/2, (Main.screenHeight/16) * 9, "Two Players", textStyle);
	    twoPlayers.anchor.setTo(0.5, 0);
	    twoPlayers.stroke = '#fff';
    	twoPlayers.strokeThickness = 6;

	    threePlayers = PhaserGame.add.text(Main.screenWidth/2, (Main.screenHeight/16) * 10, "Three Players", textStyle);
	    threePlayers.anchor.setTo(0.5, 0);
	    threePlayers.stroke = '#fff';
    	threePlayers.strokeThickness = 6;

	    fourPlayers = PhaserGame.add.text(Main.screenWidth/2, (Main.screenHeight/16) * 11, "Four Players", textStyle);
	    fourPlayers.anchor.setTo(0.5, 0);
	    fourPlayers.stroke = '#fff';
    	fourPlayers.strokeThickness = 6;

	    //Cursor
	    cursor = PhaserGame.add.sprite(onePlayer.x - onePlayer.width, onePlayer.y, 'penguin-black');
	    cursor.scale.setTo(.2,.2);
	    cursor.animations.add('walk', [9,10,11,12]);
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
			Game.init(cursorSelection + 1);
		});

		if (debugController) {
			var debugControllerTextStyle = { font: "bold 8px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
			for (var i = 0; i < 50; i++) {
				debugControllerText.push(PhaserGame.add.text(0,i*10,"input: "+i,debugControllerTextStyle));
	    	}
	    	for (var i = 50; i < 100; i++) {
				debugControllerText.push(PhaserGame.add.text(100,(i-50)*10,"input: "+i,debugControllerTextStyle));
	    	}
		}
		Audio.init();
	}

	function updateCursorLocation() {
		Audio.playFx("cursor");
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
		if (Controller.gamePads.connected) {
            var buttonA = Controller.gamePads.getButton(GamePads[1].A);
            buttonA.onDown.add(function() {
            	console.log("fdfd");
				destroyAll();
				Main.state = State.GAME;
				Game.init(cursorSelection + 1);
			});
        }

		cursor.animations.play('walk', 10, true);

		if (Controller.gamePads.axis(GamePads[1].UD) > 0.7) {
			gcControllerHeldTime = gcControllerHeldTime + 1;
			if (cursorSelection < CursorSelection.FOUR_PLAYERS && gcControllerHeldTime > 5) {
				cursorSelection = cursorSelection + 1;
				updateCursorLocation();
				gcControllerHeldTime = 0;
			}
		}

		if (Controller.gamePads.axis(GamePads[1].UD) < -0.7) {
			gcControllerHeldTime = gcControllerHeldTime + 1;
			if (cursorSelection > CursorSelection.ONE_PLAYER && gcControllerHeldTime > 5) {
				cursorSelection = cursorSelection - 1;
				updateCursorLocation();
				gcControllerHeldTime = 0;
			}
		}

		if (debugController) {
			debug();
		}
	}

	function destroyAll() {
		cursor.destroy();
		title.destroy();
		onePlayer.destroy();
		twoPlayers.destroy();
		threePlayers.destroy();
		fourPlayers.destroy();
		titleBackground.destroy();

		Controller.upKey.onUp.removeAll();
		Controller.downKey.onUp.removeAll();
		Controller.enterKey.onUp.removeAll();
		if (Controller.gamePads.connected) {
            var buttonA = Controller.gamePads.getButton(GamePads[1].A);
            buttonA.onDown.removeAll();
        }
	}

	function debug() {
		for (var i = 0; i < debugControllerText.length; i++) {
    		debugControllerText[i].setText("input: "+i+" is "+Controller.gamePads.isDown(i) + " or " + Controller.gamePads.axis(i));
    	}
	}

	return {
		init: init,
		update: update
	}
}();