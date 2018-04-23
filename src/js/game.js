Game = function() {

    //movable PhaserGame objects
    var players;
    var enemies;


    //static PhaserGame objects
    var nestGroup;
    var egg;
    var nest;
    var iglooGroup;

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
        iglooGroup = IglooGroup.init();

        Snowballs.init();

        players = Players.init(numberOfPlayers);

        enemies = Enemies.init();

        PhaserGame.world.bringToTop(Snowballs.snowballGroup);
        
        //start audio
        Audio.init();
        Audio.playFx("music");    }

    function update() {
        Players.update(players);

        Enemies.update(enemies);

        Snowballs.update(enemies);


        PhaserGame.physics.arcade.collide(players, enemies);
        PhaserGame.physics.arcade.collide(players);
        PhaserGame.physics.arcade.overlap(enemies, nestGroup, loseLife, null, this);


        if (lives <= 0) {
            lose();
        }

        if (Mating.mated(players, iglooGroup)) {
            livesText.text = 'lives: ' + ++lives;
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
        Players.destroyAll(players);
        enemies.destroy();
        nestGroup.destroy();
        livesText.destroy();
        iglooGroup.destroy();
        Snowballs.snowballGroup.destroy();

        Enemies.destroySpawnEvent();
        Audio.stopFx("music");
    }


    return {
        init: init,
        update: update,
        debug: debug
    }
        
}();

