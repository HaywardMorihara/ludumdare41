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
            

            var player_back_walk = player.animations.add('player_back_walk', [0,1,2,3]);
            var player_front_walk = player.animations.add('player_front_walk', [4,5,6,7]);
            var player_side_walk = player.animations.add('player_side_walk', [8,9,10,11]);

            player.body.collideWorldBounds = true;

            player.direction = "front";
            player.x_direction = "left";

            player.scale.setTo(.35,.35);
            player.anchor.setTo(.5,.5);
        }

        return playerGroup;
    }

    function update(playerGroup) {
        playerGroup.forEach(function(player) {
            if (Controller.upKey.isDown)
            {
                player.body.velocity.y = -playerSpeed;
                player.animations.play('player_back_walk', 6, true);
                player.direction = DirectionEnum.UP;
            }
            else if (Controller.downKey.isDown)
            {
                player.body.velocity.y = playerSpeed;
                player.animations.play('player_front_walk', 6, true);
                player.direction = DirectionEnum.DOWN;
            } else 
            {
                player.body.velocity.y = 0;
            }

            if (Controller.leftKey.isDown)
            {
                if(player.x_direction == "right")
                {
                    player.scale.x *= -1;
                }
                player.body.velocity.x = -playerSpeed;
                player.animations.play('player_side_walk', 6, true);
                player.x_direction = "left";
                player.direction = DirectionEnum.LEFT;
            }
            else if (Controller.rightKey.isDown)
            {
                if(this.x_direction == "left")
                {
                    player.scale.x *= -1;
                }
                player.body.velocity.x = playerSpeed; 
                player.animations.play('player_side_walk', 6, true);
                player.x_direction = "right";
                player.direction = DirectionEnum.RIGHT;
            } else 
            {
                player.body.velocity.x = 0;
            }

            if (Controller.spaceKey.isDown){
                var snowball = Snowballs.init(player, player.direction);
            }
        })
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