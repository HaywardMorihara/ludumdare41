Mating = function() {
    var mateable = true;
    function mated(players, iglooGroup) {
        var count = 0;
        players.forEach(function(player){
            if (!mateable) {
                player.alpha = 1;
                return true;
            } else {
                if (!PhaserGame.physics.arcade.overlap(player, iglooGroup, boom, null, this)) {
                    player.alpha = 1;
                } else {
                    count++;
                }
            }
        });
        if (count == 2) {
            mateable = false;
            iglooGroup.alpha = 0.2;
            PhaserGame.time.events.add(Phaser.Timer.SECOND * 4, spawnMatingSite, this);
            var hearts = PhaserGame.add.sprite(400, 0, 'hearts');
            hearts.animations.add('shootHearts', [0,1,2,3,4,5]);
            hearts.animations.play('shootHearts', 5, false, true);
            return true;

        }
        return false;
    }

    function boom(player, iglooGroup) {
        player.alpha = 0.1;
    }

    function spawnMatingSite() {
        iglooGroup.alpha = 1;
        mateable = true;
    }

    return {
        mated : mated
    }
}();