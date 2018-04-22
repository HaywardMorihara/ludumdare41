Snowballs = function() {
    var snowballSpeed = 400;

    function init(player, direction) {
        var snowball = PhaserGame.add.sprite(player.body.x, player.body.y, 'snowball');
        snowball.scale.setTo(.5,.5);
        PhaserGame.physics.enable(snowball, Phaser.Physics.ARCADE);

        //snowball.direction = direction;
        snowball.speed = 400;
        if (direction == DirectionEnum.UP) {
            snowball.body.velocity.y = -snowballSpeed;
        } else if (direction == DirectionEnum.DOWN) {
            snowball.body.velocity.y = snowballSpeed;
        } else if (direction == DirectionEnum.LEFT) {
            snowball.body.velocity.x = -snowballSpeed;
        } else if (direction == DirectionEnum.RIGHT) {
            snowball.body.velocity.x = snowballSpeed;
        }
        return snowball;
    }

    function update() {
      
    }

    function debug(snowball) {
        // PhaserGame.debug.body(penguin);

     //    PhaserGame.debug.bodyInfo(penguin, 32, 32);
    }

    return {
        init: init,
        update: update,
        debug: debug
    }
}();