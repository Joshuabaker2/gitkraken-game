/**
 * Created by josh on 2016-04-07.
 */

import Collidable from 'objects/Collidable';
    
class Jellyfish extends Collidable {

    constructor(game) {
        const edge = 0;
        const y = getSpawnLocation(game, edge);
        super(game, 'jellyfish', 0.0225, 30, undefined, y);

        this.edge = edge;
        this.goingUp = y !== this.edge;
        this.respawning = false;
        this.body.velocity.y = this.getVelocity();

    }

    update () {
        // gets called automatically by World.update()
        this.chooseDirection();
    }
    
    chooseDirection() {
        if (this.goingUp) {
            this.scale.y = this.size;
        } else {
            this.scale.y = -this.size;
        }
    }


    respawn (x = this.game.world.randomX, y = this.game.world.randomY, timeout = 350, max, min) {
        if (this.respawning) return;
        this.respawning = true;
        this.visible = false;

        const savedBody = this.body;

        y = getSpawnLocation(this.game, this.edge);

        this.goingUp = y !== this.edge;
        const newSize = this.size + this.sizeModifier(max, min);
        this.scale.setTo(newSize, newSize);

        savedBody.acceleration.x = 0;
        savedBody.acceleration.y = 0;
        savedBody.velocity.y = 0;
        savedBody.velocity.y = this.getVelocity();

        setTimeout(() => {
            savedBody.x = x;
            savedBody.y = y;
            this.body = savedBody;
            this.visible = true;
            this.respawning = false;
        }, timeout);
    }


    getVelocity () {
        return this.goingUp ? Math.floor(Math.random() * (100) - 150) : Math.floor(Math.random() * (100) + 50);
    }


}

const getSpawnLocation = (game, edge) => {
    const ySpawnChoices = [edge, game.world.height - edge];
    return ySpawnChoices[Math.floor(Math.random()*ySpawnChoices.length)];
};


export default Jellyfish;