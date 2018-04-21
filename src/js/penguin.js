function initializePenguin(game) {
	var penguin = game.add.sprite(300, 300, 'penguin');
	game.physics.enable(penguin, Phaser.Physics.ARCADE);
	penguin.body.collideWorldBounds = true;
	return penguin;
}

function updatePenguin(penguin) {
	var penguinSpeed = 200;

            if (upKey.isDown)
            {
                penguin.body.veloctiy.y = -penguinSpeed;
            }
            else if (downKey.isDown)
            {
                penguin.body.veloctiy.y = penguinSpeed;
            } else 
            {
                penguin.body.velocity.y = 0;
            }

            if (leftKey.isDown)
            {
                penguin.body.velocity.x = -penguinSpeed;
            }
            else if (rightKey.isDown)
            {
                penguin.body.velocity.x = penguinSpeed; 
            } else 
            {
                penguin.body.velocity.x = 0;
            }
	
}

function debugPenguin(game, penguin) {
	game.debug.body(penguin);

    game.debug.bodyInfo(penguin, 32, 32);
}