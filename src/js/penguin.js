Penguin = function() {
    var penguinSpeed = 200;

    function init() {
        var penguin = PhaserGame.add.sprite(300, 300, 'penguin');
        var walk = penguin.animations.add('walk')
        penguin.scale.setTo(.35,.35);
        PhaserGame.physics.enable(penguin, Phaser.Physics.ARCADE);
        penguin.body.collideWorldBounds = true;

        return penguin;
    }

    function update(penguin) {
        if (upKey.isDown)
        {
            penguin.body.velocity.y = -penguinSpeed;
        }
        else if (downKey.isDown)
        {
            penguin.body.velocity.y = penguinSpeed;
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

        penguin.animations.play('walk', 6, true)
        
    }

    function debug(penguin) {
        // PhaserGame.debug.body(penguin);

     //    PhaserGame.debug.bodyInfo(penguin, 32, 32);
    }

    return {
        init: init,
        update: update,
        debug: debug
    }
}();