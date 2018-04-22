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
        if (Controller.upKey.isDown)
        {
            penguin.body.velocity.y = -penguinSpeed;
            penguin.direction = DirectionEnum.UP;
        }
        else if (Controller.downKey.isDown)
        {
            penguin.body.velocity.y = penguinSpeed;
            penguin.direction = DirectionEnum.DOWN;
        } else 
        {
            penguin.body.velocity.y = 0;
        }

        if (Controller.leftKey.isDown)
        {
            penguin.body.velocity.x = -penguinSpeed;
            penguin.direction = DirectionEnum.LEFT;
        }
        else if (Controller.rightKey.isDown)
        {
            penguin.body.velocity.x = penguinSpeed; 
            penguin.direction = DirectionEnum.RIGHT;
        } else 
        {
            penguin.body.velocity.x = 0;
        }

        if (Controller.spaceKey.isDown){
            var snowball = Snowball.init(penguin, penguin.direction);
            //snowball.update();
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