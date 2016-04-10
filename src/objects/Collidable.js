/**
 * Created by josh on 2016-04-07.
 */

class Fish extends Phaser.Sprite {

    constructor(game, sprite, size, maxSizeModifier, x, y) {
        super(game, x || game.world.randomX, y || game.world.randomY, sprite);
        this.maxSizeModifier = maxSizeModifier;
        this.size = size + this.sizeModifier();

        this.scale.setTo(this.size, this.size);
        this.anchor.setTo(0.5,0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
    }



    respawn (x = this.game.world.randomX, y = this.game.world.randomY, timeout = 5000, max, min) {
        const savedBody = this.body;
        const newSize = this.size + this.sizeModifier(max, min);
        this.body = null;
        this.visible = false;

        setTimeout(() => {
            this.scale.setTo(newSize, newSize);
            this.body = savedBody;
            this.body.x = x;
            this.body.y = y;
            this.body.acceleration.x = 0;
            this.body.acceleration.y = 0;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.visible = true;
        }, timeout);
    }

    sizeModifier(max = this.maxSizeModifier, min = 0) {
        return Math.floor(Math.random() * (max - min) + min)/1000;
    }

}


export default Fish;