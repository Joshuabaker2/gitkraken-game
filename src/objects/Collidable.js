/**
 * Created by josh on 2016-04-07.
 */

class Fish extends Phaser.Sprite {

    constructor(game, sprite, size, maxSizeModifier) {
        super(game, game.world.randomX, game.world.randomY, sprite);
        this.maxSizeModifier = maxSizeModifier;
        this.size = size + this.sizeModifier();

        this.scale.setTo(this.size, this.size);
        this.anchor.setTo(0.5,0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
    }



    respawn () {
        const savedBody = this.body;
        this.body = null;
        this.visible = false;

        setTimeout(() => {
            this.scale.setTo(this.size + this.sizeModifier(), this.size + this.sizeModifier());
            this.body = savedBody;
            this.body.x = this.game.world.randomX;
            this.body.y = this.game.world.randomY;
            this.body.acceleration.x = 0;
            this.body.acceleration.y = 0;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.visible = true;
        }, 5000);
    }

    sizeModifier() {
        return Math.floor(Math.random() * (this.maxSizeModifier))/1000;
    }

}


export default Fish;