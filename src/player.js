/**
 * Created by josh on 07/04/16.
 */
"use strict";

var Player = class Player {
    constructor(x_location, y_location) {
        this.player = game.add.sprite(game.world.width/2, game.world.height/2, 'kraken');
        this.player.scale.setTo(0.01, 0.01);

        //  We need to enable physics on the this.player
        game.physics.arcade.enable(this.player);

        //  Player physics properties.
        this.player.body.collideWorldBounds = true;

        //  TODO: Our two animations, walking left and right.
//    player.animations.add('left', [0, 1, 2, 3], 10, true);
//    player.animations.add('right', [5, 6, 7, 8], 10, true);
    }

    const handleMomentum = () => {
        if (player.body.velocity.x > 0) {
            player.body.velocity.x -= 2;
        } else if (player.body.velocity.x < 0) {
            player.body.velocity.x += 2;
        }

        if (player.body.velocity.y > 0) {
            player.body.velocity.y -= 2;
        } else if (player.body.velocity.y < 0) {
            player.body.velocity.y += 2;
        }
    };

    const handleKeyboard = () => {
        const cursors = game.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            player.body.velocity.x -= 4;
    //        player.animations.play('left');
        } else if (cursors.right.isDown) {
            player.body.velocity.x += 4;
    //        player.animations.play('right');
        }

        if (cursors.up.isDown) {
            player.body.velocity.y -= 4;
        } else if (cursors.down.isDown) {
            player.body.velocity.y += 4;
        }
    };

    exports = {
        
        handleKeyboard: handleKeyboard,
        handleMomentum: handleMomentum
    };

};
