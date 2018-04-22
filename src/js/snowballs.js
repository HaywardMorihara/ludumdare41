Snowballs = function() {
    var snowballSpeed = 400;

    function init() {
        var snowballGroup = PhaserGame.add.group();
        snowballGroup.enableBody = true;
        PhaserGame.physics.enable(snowballGroup, Phaser.Physics.ARCADE);
        return snowballGroup;
    }

    function throwSnowball(player, direction, snowballGroup) { 
        var snowball = snowballGroup.create(player.body.x, player.body.y, 'snowball');
        snowball.scale.setTo(.5,.5);

        if (direction == DirectionEnum.UP) {
            snowball.body.velocity.y = -snowballSpeed;
        } else if (direction == DirectionEnum.DOWN) {
            snowball.body.velocity.y = snowballSpeed;
        } else if (direction == DirectionEnum.LEFT) {
            snowball.body.velocity.x = -snowballSpeed;
        } else if (direction == DirectionEnum.RIGHT) {
            snowball.body.velocity.x = snowballSpeed;
        }
    }

    function update() {
      
    }

    function debug(snowball) {
        // PhaserGame.debug.body(penguin);

     //    PhaserGame.debug.bodyInfo(penguin, 32, 32);
    }

    return {
        init: init,
        throwSnowball: throwSnowball,
        update: update,
        debug: debug
    }
}();