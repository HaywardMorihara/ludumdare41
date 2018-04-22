Game = function() {

    //movable PhaserGame objects
    var penguin;
    var enemy;
    var snowball;

    //static PhaserGame objects
    var nestGroup;
    var egg;
    var nest;

    //stats
    var lives;
    var livesText;

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
    }

    function update() {
        Penguin.update(penguin);

        Enemy.update(enemy);

        PhaserGame.physics.arcade.collide(penguin, enemy);
        PhaserGame.physics.arcade.collide(snowball, enemy);
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

