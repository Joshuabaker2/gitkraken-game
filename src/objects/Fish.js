/**
 * Created by josh on 2016-04-07.
 */

import Collidable from 'objects/Collidable';
    
class Fish extends Collidable {

    constructor(game) {
        const x = getSpawnLocation(game);
        super(game, 'roundfish', 0.0225, 30, x, null);
        
        this.goingLeft = x !== 0;
        this.respawning = false;
        this.body.velocity.x = this.getVelocity();

    }

    update () {
        // gets called automatically by World.update()
        this.chooseDirection();
    }
    
    chooseDirection() {
        if (!this.body) return;
        if (this.body.velocity.x > 0) {
            this.scale.x = this.size;
        } else {
            this.scale.x = -this.size;
        }
    }


    respawn (x = this.game.world.randomX, y = this.game.world.randomY, timeout = 5000, max, min) {
        if (this.respawning) return;
        this.respawning = true;
        this.visible = false;

        const savedBody = this.body;
        const newSize = this.size + this.sizeModifier(max, min);

        x = getSpawnLocation(this.game);

        this.goingLeft = x !== 0;

        setTimeout(() => {
            this.scale.setTo(newSize, newSize);
            this.body = savedBody;
            this.body.x = x;
            this.body.y = y;
            this.body.acceleration.x = 0;
            this.body.acceleration.y = 0;
            this.body.velocity.x = this.getVelocity();
            this.body.velocity.y = 0;
            this.visible = true;
            this.respawning = false;
        }, timeout);
    }

    getVelocity () {
        return this.goingLeft ? Math.floor(Math.random() * (150) - 200) : Math.floor(Math.random() * (150) + 50);
    }


}

const getSpawnLocation = (game) => {
    const xSpawnChoices = [0, game.world.width];
    return xSpawnChoices[Math.floor(Math.random()*xSpawnChoices.length)];
};


export default Fish;