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
    var timer;
    var timerText;
    var timeEvent;

    function init(numberOfPlayers) {
        PhaserGame.stage.backgroundColor = '#fcfcff';
        PhaserGame.physics.startSystem(Phaser.Physics.ARCADE);
        timeEvent = PhaserGame.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

        //initialize stats
        lives = 3;
        timer = 0;
        livesText = PhaserGame.add.text(16, 16, 'lives: ' + lives, { fontSize: '32px', fill: '#000' });
        timerText = PhaserGame.add.text(16, 42, 'time: ' + timer, { fontSize: '32px', fill: '#000' });

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
        Main.state = State.GAMEOVER;
        GameOver.init(timer);
        destroyAll();
    }

    function destroyAll() {
        Players.destroyAll(players);
        enemies.destroy();
        nestGroup.destroy();
        livesText.destroy();
        timerText.destroy();
        iglooGroup.destroy();
        Snowballs.snowballGroup.destroy();

        Enemies.destroySpawnEvent();

        PhaserGame.time.events.remove(timeEvent);

        Audio.stopFx("music");
    }

    function updateCounter() {

        timer++;
        timerText.setText('time: ' + timer);
    }


    return {
        init: init,
        update: update,
        debug: debug,
    }
        
}();

