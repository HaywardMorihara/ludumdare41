Players = function() {
    var playerSpeed = 200;
    

    function init(numberOfPlayers) {
        var playerGroup = PhaserGame.add.group();
        playerGroup.enableBody = true;
        PhaserGame.physics.enable(playerGroup, Phaser.Physics.ARCADE);

        for (i = 0; i < numberOfPlayers; i++) {
            if (i == 0) {
                var player = playerGroup.create(i*300, 300, 'penguin-black');
            } else if (i == 1) {
                var player = playerGroup.create(i*300, 300, 'penguin-orange');
            } else if (i == 2) {
                var player = playerGroup.create(i*300, 300, 'penguin-blue');
            } else {
                var player = playerGroup.create(i*300, 300, 'penguin-pink');
            }
            
            player.playerNumber = i + 1;

            var player_back_walk = player.animations.add('player_back_walk', [2,3,4,5]);
            var player_front_walk = player.animations.add('player_front_walk', [9,10,11,12]);
            var player_side_walk = player.animations.add('player_side_walk', [16,17,18,19]);

            player.body.collideWorldBounds = true;

            player.direction = DirectionEnum.DOWN;
            player.x_direction = DirectionEnum.LEFT;

            player.scale.setTo(.35,.35);
            player.anchor.setTo(.5,.5);

            player.snowBallProgress = 0;
            player.snowballAmmo = [];

            player.ammoText = PhaserGame.add.text(player.x, player.y-75, player.snowballAmmo.length, {font: "32px Arial", fill: "#000000", backgroundColor: "#FFFFFF"});

            addButtons(player);
        }
        Audio.init();
        return playerGroup;
    }

    function update(playerGroup) {
        playerGroup.forEach(function(player) {
            if (Controller.upKey.isDown || Controller.gamePads.axis(GamePads[player.playerNumber].UD) < -0.3)
            {
                player.body.velocity.y = -playerSpeed;
                player.animations.play('player_back_walk', 20, true);
                player.direction = DirectionEnum.UP;
            }
            else if (Controller.downKey.isDown || Controller.gamePads.axis(GamePads[player.playerNumber].UD) > 0.3)
            {
                player.body.velocity.y = playerSpeed;
                player.animations.play('player_front_walk', 20, true);
                player.direction = DirectionEnum.DOWN;
            } else 
            {
                player.body.velocity.y = 0;
            }

            if (Controller.leftKey.isDown|| Controller.gamePads.axis(GamePads[player.playerNumber].LR) < -0.3)
            {
                if(player.x_direction == DirectionEnum.RIGHT)
                {
                    player.scale.x *= -1;
                }
                player.body.velocity.x = -playerSpeed;
                player.animations.play('player_side_walk', 20, true);
                player.x_direction = DirectionEnum.LEFT;
                player.direction = player.x_direction;
            }
            else if (Controller.rightKey.isDown || Controller.gamePads.axis(GamePads[player.playerNumber].LR) > 0.3)
            {
                if(player.x_direction == DirectionEnum.LEFT)
                {
                    player.scale.x *= -1;
                }
                player.body.velocity.x = playerSpeed; 
                player.animations.play('player_side_walk', 20, true);
                player.x_direction = DirectionEnum.RIGHT;
                player.direction = player.x_direction;
            } else 
            {
                player.body.velocity.x = 0;
            }

            if (player.body.velocity.x == 0 && player.body.velocity.y == 0) {
                player.animations.stop(null, true);
            }

            //Update Snowballs being held
            for (var i = 0; i < player.snowballAmmo.length; i++) {
                player.snowballAmmo[i].x = player.x;
                player.snowballAmmo[i].y = player.y;
            }

            //Update Snowball ammo text location
            player.ammoText.x = player.x;
            player.ammoText.y = player.y-75;

        })
    }

    function addButtons(player) {
        //Snowball Throwing
        if (Controller.gamePads.connected) {
            var buttonB = Controller.gamePads.getButton(GamePads[player.playerNumber].B);
            buttonB.onUp.add(function(){ return buildSnowball(player); }, this);

            var buttonA = Controller.gamePads.getButton(GamePads[player.playerNumber].A);
            buttonA.onUp.add(function(){
                if (player.snowballAmmo.length != 0){
                    Snowballs.throwSnowball(player, player.direction);
                    Audio.playFx();
                    updateAmmoText(player);
                }
            });
        }
        Controller.bKey.onUp.add(function(){ return buildSnowball(player); });
        Controller.spaceKey.onUp.add(function(){ 
            if (player.snowballAmmo.length != 0){
                    Snowballs.throwSnowball(player, player.direction);
                    Audio.playFx();
                    updateAmmoText(player);
                } });
    }

    function buildSnowball(player) {
        if(player.snowballAmmo.length < 10) {
            player.snowBallProgress = player.snowBallProgress + 10;
            if (player.snowBallProgress >= 50) {
                player.snowBallProgress = 0;
                Snowballs.createSnowball(player);
                updateAmmoText(player);
            }
        }
    }

    function updateAmmoText(player) {
        player.ammoText.setText(player.snowballAmmo.length);
    }

    function debug(player) {
        // PhaserGame.debug.body(player);

     //    PhaserGame.debug.bodyInfo(player, 32, 32);
    }

    return {
        init: init,
        update: update,
        debug: debug
    }
}();