/**
 * Created by josh on 2016-04-07.
 */

class Fish extends Phaser.Sprite {

    constructor(game) {
        const size = 0.3;
        super(game, Math.abs(game.world.randomX - size/2), Math.abs(game.world.randomY/2 - size), 'fish');
        this.size = size;
        this.objscale = 0.1;

        this.scale.setTo(this.objscale, this.objscale);
        this.anchor.setTo(0.5,0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);

       // this.animations.add('left', [0], 10, true);
       // this.animations.add('right', [1], 10, true);

    }

    update () {
        // gets called automatically by World.update()
        this.swimAround();
        this.chooseDirection();
    }

    chooseDirection() {
        if (this.body.velocity.x > 0) {
            this.scale.x = this.objscale;
            // this.animations.play('right');
        } else {
            this.scale.x = -this.objscale;
            // this.animations.play('left');
        }
    }

    swimAround () {
        this.body.acceleration.x = Math.floor(Math.random() * (501) - 250);
        // this.body.acceleration.y = Math.floor(Math.random() * (501) - 250);
    }

    respawn () {
        this.body.x = Math.abs(this.game.world.randomX - this.size/2);
        this.body.y = Math.abs(this.game.world.randomY - this.size/2);
        this.body.acceleration.x = 0;
        this.body.acceleration.y = 0;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

}


export default Fish;