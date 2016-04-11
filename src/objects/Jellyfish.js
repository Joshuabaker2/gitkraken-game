/**
 * Created by josh on 2016-04-07.
 */

import Collidable from 'objects/Collidable';
    
class Jellyfish extends Collidable {

    constructor(game) {
        const y = getSpawnLocation(game);
        super(game, 'jellyfish', 0.0225, 30, null, y);
        
        this.goingUp = y !== 0;
        this.respawning = false;
        this.body.velocity.y = this.getVelocity();

    }

    update () {
        // gets called automatically by World.update()
        this.chooseDirection();
    }
    
    chooseDirection() {
        if (!this.body) return;
        if (this.body.velocity.y > 0) {
            this.scale.y = -this.size;
        } else {
            this.scale.y = this.size;
        }
    }


    respawn (x = this.game.world.randomX, y = this.game.world.randomY, timeout = 5000, max, min) {
        if (this.respawning) return;
        this.respawning = true;
        this.visible = false;

        const savedBody = this.body;
        const newSize = this.size + this.sizeModifier(max, min);

        y = getSpawnLocation(this.game);

        this.goingUp = y !== 0;

        setTimeout(() => {
            this.scale.setTo(newSize, newSize);
            this.body = savedBody;
            this.body.x = x;
            this.body.y = y;
            this.body.acceleration.x = 0;
            this.body.acceleration.y = 0;
            this.body.velocity.y = 0;
            this.body.velocity.y = this.getVelocity();
            this.visible = true;
            this.respawning = false;
        }, timeout);
    }



    getVelocity () {
        return this.goingUp ? Math.floor(Math.random() * (100) - 150) : Math.floor(Math.random() * (100) + 50);
    }


}

const getSpawnLocation = (game) => {
    const ySpawnChoices = [0, game.world.height];
    return ySpawnChoices[Math.floor(Math.random()*ySpawnChoices.length)];
};


export default Jellyfish;