Snowballs = function() {

    var snowBallGroup;

    var snowballSpeed = 400;

    function init() {
        this.snowballGroup = PhaserGame.add.group();
        this.snowballGroup.enableBody = true;
        PhaserGame.physics.enable(this.snowballGroup, Phaser.Physics.ARCADE);
        return this.snowballGroup;
    }

    function createSnowball(player) {
        player.snowball = this.snowballGroup.create(player.x, player.y, 'snowball');
        player.snowball.scale.setTo(.5,.5);

        player.snowballAmmo.push(player.snowball);


    }

    function throwSnowball(player, direction) { 
        player.snowball = player.snowballAmmo.pop();
        
        if (direction == DirectionEnum.UP) {
            player.snowball.body.velocity.y = -snowballSpeed;
        } else if (direction == DirectionEnum.DOWN) {
            player.snowball.body.velocity.y = snowballSpeed;
        } else if (direction == DirectionEnum.LEFT) {
            player.snowball.body.velocity.x = -snowballSpeed;
        } else if (direction == DirectionEnum.RIGHT) {
            player.snowball.body.velocity.x = snowballSpeed;
        }
        else {
            player.snowball.body.velocity.y = -snowballSpeed;
        }

        player.snowball = null;
    }


    function update(enemyGroup) {
        PhaserGame.physics.arcade.overlap(this.snowballGroup, enemyGroup, collisionHandler, null, this);
    }

    function collisionHandler(snowball, enemy) {
        snowball.kill();
        enemy.animations.add('flop', [0]);
        enemy.animations.play('flop', 5, false, true);

    }

    function debug(snowball) {
        // PhaserGame.debug.body(penguin);

     //    PhaserGame.debug.bodyInfo(penguin, 32, 32);
    }

    return {
        snowballGroup: snowBallGroup,
        init: init,
        createSnowball: createSnowball,
        throwSnowball: throwSnowball,
        update: update,
        debug: debug
    }
}();