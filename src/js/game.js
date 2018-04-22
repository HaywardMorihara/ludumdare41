Game = function() {

    //movable PhaserGame objects
    var players;
    var enemies;


    //static PhaserGame objects
    var nestGroup;
    var egg;
    var nest;

    //stats
    var lives;
    var livesText;

    function init(numberOfPlayers) {
        PhaserGame.stage.backgroundColor = '#fcfcff';
        PhaserGame.physics.startSystem(Phaser.Physics.ARCADE);

        //initialize stats
        lives = 3;
        livesText = PhaserGame.add.text(16, 16, 'lives: ' + lives, { fontSize: '32px', fill: '#000' });

        //initialize static PhaserGame objects
        nestGroup = NestGroup.init(lives);

        players = Players.init(numberOfPlayers);

        enemies = Enemies.init();
    }

    function update() {
        Players.update(players);

        Enemies.update(enemies);


        PhaserGame.physics.arcade.collide(players, enemies);
        PhaserGame.physics.arcade.collide(players);
        PhaserGame.physics.arcade.overlap(enemies, nestGroup, loseLife, null, this);
    }

    function debug() {

        //players.debug(PhaserGame, player);

        Enemies.debug(PhaserGame, enemies);
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

