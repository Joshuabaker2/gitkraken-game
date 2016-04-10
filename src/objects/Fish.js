/**
 * Created by josh on 2016-04-07.
 */

class Fish extends Phaser.Sprite {

    constructor(game) {
        super(game, game.world.randomX/4, game.world.randomY/4, 'roundfish');
        this.size = 0.0225;

        this.scale.setTo(this.size, this.size);
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
            this.scale.x = this.size;
        } else {
            this.scale.x = -this.size;
        }
    }

    swimAround () {
        this.body.acceleration.x = Math.floor(Math.random() * (501) - 250);
        this.body.acceleration.y = Math.floor(Math.random() * (501) - 250);
    }

    respawn () {
        this.body.x = this.game.world.randomX;
        this.body.y = this.game.world.randomY;
        this.body.acceleration.x = 0;
        this.body.acceleration.y = 0;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

}


export default Fish;