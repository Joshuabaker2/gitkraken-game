/**
 * Created by josh on 2016-04-07.
 */

import Collidable from 'objects/Collidable';
    
class Fish extends Collidable {

    constructor(game) {
        const edge = 0;
        const x = getSpawnLocation(game, edge);
        super(game, 'roundfish', 0.0225, 30, x, undefined);

        this.edge = edge;
        this.goingLeft = x !== this.edge;
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

        this.sizeModifier(max, min, (modifiedSize) => {
            this.size += modifiedSize;
            this.scale.setTo(this.size, this.size);
        });

        x = getSpawnLocation(this.game, this.edge);
        this.goingLeft = x !== this.edge;

        savedBody.acceleration.x = 0;
        savedBody.acceleration.y = 0;
        savedBody.velocity.x = this.getVelocity();
        savedBody.velocity.y = 0;
        
        setTimeout(() => {
            this.body = savedBody;
            this.body.x = x;
            this.body.y = y;
            this.visible = true;
            this.respawning = false;
        }, timeout);
    }

    getVelocity () {
        return this.goingLeft ? Math.floor(Math.random() * (150) - 200) : Math.floor(Math.random() * (150) + 50);
    }


}

const getSpawnLocation = (game, edge) => {
    const xSpawnChoices = [edge, game.world.width - edge];
    return xSpawnChoices[Math.floor(Math.random()*xSpawnChoices.length)];
};


export default Fish;