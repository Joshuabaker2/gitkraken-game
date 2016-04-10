/**
 * Created by josh on 2016-04-07.
 */

class Food extends Phaser.Sprite {

    constructor(game, size) {
        super(game, Math.abs(game.world.randomX - size/2), Math.abs(game.world.randomY/2 - size), 'bubble');
        this.size = size;
        this.scale.setTo(0.1, 0.1);
        game.physics.enable(this, Phaser.Physics.ARCADE);

        //  Food physics properties.
        this.body.collideWorldBounds = true;

    }

    update () {
        // gets called automatically by World.update()
        this.floatAround();
    }

    floatAround () {
        this.body.acceleration.x = this.body.acceleration.x % 2 ? this.body.acceleration.x += 3 : this.body.acceleration.x -= 3;
        this.body.acceleration.y = this.body.acceleration.y % 2 ? this.body.acceleration.y += 3 : this.body.acceleration.y -= 3;
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


export default Food;