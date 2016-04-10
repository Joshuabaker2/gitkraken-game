/**
 * Created by josh on 2016-04-07.
 */

class Food extends Phaser.Sprite {

    constructor(game) {
        const size = 0.0005;
        super(game, Math.abs(game.world.randomX - size/2), Math.abs(game.world.randomY/2 - size), 'bubble');
        this.size = size;
        this.scale.setTo(0.1, 0.1);
        game.physics.enable(this, Phaser.Physics.ARCADE);

    }

    update () {
        // gets called automatically by World.update()
        this.floatAround();
    }

    floatAround () {
        if (!this.body) return;
        this.body.acceleration.x = Math.floor(Math.random() * (101) - 50);
        this.body.acceleration.y = Math.floor(Math.random() * (101) - 50);
    }

    respawn () {
        const savedBody = this.body;
        this.body = null;
        this.visible = false;

        setTimeout(() => {
            this.body = savedBody;
            this.body.x = Math.abs(this.game.world.randomX - this.size/2);
            this.body.y = Math.abs(this.game.world.randomY - this.size/2);
            this.body.acceleration.x = 0;
            this.body.acceleration.y = 0;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.visible = true;
        }, 5000);

    }

}


export default Food;