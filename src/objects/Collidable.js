/**
 * Created by josh on 2016-04-07.
 */

class Fish extends Phaser.Sprite {

    constructor(game, sprite, size, maxSizeModifier, x, y) {
        super(game, x || game.world.randomX, y || game.world.randomY, sprite);
        this.maxSizeModifier = maxSizeModifier;
        this.size = size + this.sizeModifier();

        this.respawning = false;
        
        this.scale.setTo(this.size, this.size);
        this.anchor.setTo(0.5,0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
    }



    respawn (x = this.game.world.randomX, y = this.game.world.randomY, timeout = 5000) {
        if (this.respawning) return;
        this.respawning = true;
        
        const savedBody = this.body;
        this.body = null;
        this.visible = false;

        savedBody.x = x;
        savedBody.y = y;
        savedBody.acceleration.x = 0;
        savedBody.acceleration.y = 0;
        savedBody.velocity.x = 0;
        savedBody.velocity.y = 0;

        setTimeout(() => {
            this.body = savedBody;
            this.visible = true;
            this.respawning = false;
        }, timeout);
    }

    sizeModifier(max = this.maxSizeModifier, min = 0) {
        return Math.floor(Math.random() * (max - min) + min)/1000;
    }

}


export default Fish;