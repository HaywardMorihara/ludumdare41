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
            player.hasSnowball = false;

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

            if (Controller.spaceKey.isDown || Controller.gamePads.isDown(GamePads[player.playerNumber].A)){
                if (player.hasSnowball){
                    Snowballs.throwSnowball(player, player.direction);
                    player.hasSnowball = false;
                    Audio.playFx();
                }
            }

            //Update Snowball being held
            if (player.snowball != null) {
                player.snowball.x = player.x;
                player.snowball.y = player.y;
            }

        })
    }

    function addButtons(player) {
        //Snowball Throwing
        var buttonB = Controller.gamePads.getButton(GamePads[player.playerNumber].B);
        buttonB.onUp.add(function(){ return buildSnowball(player); }, this);
        Controller.bKey.onUp.add(function(){ return buildSnowball(player); });
    }

    function buildSnowball(player) {
        if(!player.hasSnowball) {
            player.snowBallProgress = player.snowBallProgress + 10;
            if (player.snowBallProgress >= 50) {
                player.snowBallProgress = 0;
                player.hasSnowball = true;
                Snowballs.createSnowball(player);
            }
        }
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