Game = function() {

    //movable PhaserGame objects
    var penguin;
    var enemy;

    //static PhaserGame objects
    var nestGroup;
    var egg;
    var nest;

    //stats
    var lives;
    var livesText;

    //By not having them declared here, they're global.....WILL REFACTOR THIS
    // var upKey;
    // var downKey;
    // var leftKey;
    // var rightKey;

    function init() {
        PhaserGame.stage.backgroundColor = '#fcfcff';
        PhaserGame.physics.startSystem(Phaser.Physics.ARCADE);

        //initialize stats
        lives = 3;
        livesText = PhaserGame.add.text(16, 16, 'lives: ' + lives, { fontSize: '32px', fill: '#000' });

        //initialize static PhaserGame objects
        nestGroup = NestGroup.init(lives);

        //initialize players
        penguin = Penguin.init();
        enemy = Enemy.init();

        upKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    }

    function update() {
        Penguin.update(penguin);

        Enemy.update(enemy);

        PhaserGame.physics.arcade.collide(penguin, enemy);
        PhaserGame.physics.arcade.overlap(enemy, nestGroup, loseLife, null, this);
    }



    function debug() {
        Penguin.debug(PhaserGame, penguin);

        Enemy.debug(PhaserGame, enemy);
    }

    function loseLife(enemy, nestGroup) {
        enemy.kill();
        livesText.text = 'lives: ' + --lives;
    }

    return {
        init: init,
        update: update,
        debug: debug
    }
}();

