/**
 * Created by josh on 2016-04-07.
 */

class Player extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y, 'kraken');
        this.size = 0.02;
        this.scale.setTo(0.02, 0.02);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.anchor.setTo(0.5, 0.5);

        //  We need to enable physics on the player
        game.physics.enable(this, Phaser.Physics.ARCADE);

        //  Player physics properties.
        this.body.collideWorldBounds = true;

        //  TODO: Our two animations, walking left and right.
//    player.animations.add('left', [0, 1, 2, 3], 10, true);
//    player.animations.add('right', [5, 6, 7, 8], 10, true);
    }

    update () {
        // gets called automatically by World.update()
        this.handleKeyboard();
        this.handleMomentum();

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

        this.body.acceleration = 0;
    }

    handleKeyboard () {
        if (this.cursors.left.isDown) {
            this.body.angularVelocity = this.body.angularVelocity > -200 ? this.body.angularVelocity - 4 : this.body.angularVelocity;
        } else if (this.cursors.right.isDown) {
            this.body.angularVelocity = this.body.angularVelocity < 200 ? this.body.angularVelocity + 4 : this.body.angularVelocity;
        } else {
            this.body.angularVelocity = 0;
        }


        if (this.cursors.up.isDown) {
            const tempVelocity = this.game.physics.arcade.velocityFromAngle(this.angle + 90, 4);
            this.body.velocity.x += tempVelocity.x;
            this.body.velocity.y += tempVelocity.y;
        } else if (this.cursors.down.isDown) {
            const tempVelocity = this.game.physics.arcade.velocityFromAngle(this.angle + 90, 2);
            this.body.velocity.x -= tempVelocity.x;
            this.body.velocity.y -= tempVelocity.y;
        }
    }

    /**
     * Grow by the size of the sprite eaten
     * @param eaten
     */
    growBy (eaten) {
        this.size = this.size + eaten;
        this.scale.setTo(this.size, this.size);
    }
}


export default Player;