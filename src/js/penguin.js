Penguin = function() {
    var penguinSpeed = 200;

    function init() {
        var penguin = PhaserGame.add.sprite(300, 300, 'penguin');
        var penguin_back_walk = penguin.animations.add('penguin_back_walk', [0,1,2,3]);
        var penguin_front_walk = penguin.animations.add('penguin_front_walk', [4,5,6,7]);
        var penguin_side_walk = penguin.animations.add('penguin_side_walk', [8,9,10,11]);

        this.direction = "front";
        this.x_direction = "left";

        penguin.scale.setTo(.35,.35);
        penguin.anchor.setTo(.5,.5);
        PhaserGame.physics.enable(penguin, Phaser.Physics.ARCADE);
        penguin.body.collideWorldBounds = true;

        return penguin;
    }

    function update(penguin) {
        if (Controller.upKey.isDown)
        {
            penguin.body.velocity.y = -penguinSpeed;
            penguin.animations.play('penguin_back_walk', 6, true);
            this.direction = "down";
        }
        else if (Controller.downKey.isDown)
        {
            penguin.body.velocity.y = penguinSpeed;
            penguin.animations.play('penguin_front_walk', 6, true);
            this.direction = "up";
        } else 
        {
            penguin.body.velocity.y = 0;
        }

        if (Controller.leftKey.isDown)
        {
            if(this.x_direction == "right")
            {
                penguin.scale.x *= -1;
            }
            penguin.body.velocity.x = -penguinSpeed;
            penguin.animations.play('penguin_side_walk', 6, true);
            this.x_direction = "left";
            this.direction = this.x_direction;
        }
        else if (Controller.rightKey.isDown)
        {
            if(this.x_direction == "left")
            {
                penguin.scale.x *= -1;
            }
            penguin.body.velocity.x = penguinSpeed; 
            penguin.animations.play('penguin_side_walk', 6, true);
            this.x_direction = "right";
            this.direction = this.x_direction;
        } else 
        {
            penguin.body.velocity.x = 0;
        }
        
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