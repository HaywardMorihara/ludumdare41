Game = function() {

    //movable PhaserGame objects
    var players;
    var enemies;
    var snowballs;


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

        snowballs = Snowballs.init();

        players = Players.init(numberOfPlayers, snowballs);

        enemies = Enemies.init();
    }

    function update() {
        Players.update(players, snowballs);

        Enemies.update(enemies);


        PhaserGame.physics.arcade.collide(players, enemies);
        PhaserGame.physics.arcade.collide(players);
        PhaserGame.physics.arcade.overlap(enemies, nestGroup, loseLife, null, this);

        if (lives <= 0) {
            lose();
        }
    }

    function debug() {

        //players.debug(PhaserGame, player);

        Enemies.debug(PhaserGame, enemies);
    }

    function loseLife(enemy, nestGroup) {
        enemy.kill();
        livesText.text = 'lives: ' + --lives;
    }

    function lose() {
        Main.state = State.MENU;
        Menu.init();
        destroyAll();
    }

    function destroyAll() {
        players.destroy();
        enemies.destroy();
        nestGroup.destroy();
        livesText.destroy();

        Enemies.destroySpawnEvent();
    }

    return {
        init: init,
        update: update,
        debug: debug
    }
}();

