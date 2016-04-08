/**
 * Created by josh on 2016-04-07.
 */

class Player extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y, 'kraken');
        this.scale.setTo(0.01, 0.01);
        this.cursors = game.input.keyboard.createCursorKeys();


        //  We need to enable physics on the player
        game.physics.arcade.enable(this);

        //  Player physics properties.
        // this.body.collideWorldBounds = true;

        //  TODO: Our two animations, walking left and right.
//    player.animations.add('left', [0, 1, 2, 3], 10, true);
//    player.animations.add('right', [5, 6, 7, 8], 10, true);
    }

    update () {
        // gets called automatically by World.update()
        this.handleMomentum();
        this.handleKeyboard();
    }

    handleMomentum () {
        if (this.body.velocity.x > 0) {
            this.body.velocity.x -= 2;
        } else if (this.body.velocity.x < 0) {
            this.body.velocity.x += 2;
        }

        if (this.body.velocity.y > 0) {
            this.body.velocity.y -= 2;
        } else if (this.body.velocity.y < 0) {
            this.body.velocity.y += 2;
        }
    }

    handleKeyboard () {

        if (this.cursors.left.isDown) {
            this.body.velocity.x -= 4;
            // this.animations.play('left');
        } else if (this.cursors.right.isDown) {
            this.body.velocity.x += 4;
            // this.animations.play('right');
        }

        if (this.cursors.up.isDown) {
            this.body.velocity.y -= 4;
        } else if (this.cursors.down.isDown) {
            this.body.velocity.y += 4;
        }
    }


}


export default Player;