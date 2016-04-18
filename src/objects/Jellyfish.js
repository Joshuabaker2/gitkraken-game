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
        if (!this.body) return;
        if (this.body.velocity.y > 0) {
            this.scale.y = -this.size;
        } else {
            this.scale.y = this.size;
        }
    }


    respawn (x, y, timeout = 350, max, min) {
        if (this.respawning) return;
        this.respawning = true;
        this.visible = false;

        const savedBody = this.body;

        getSpawnLocation(this.game, this.edge, (spawnLocation, spawn_x) => {
            this.goingUp = spawnLocation !== this.edge;
            this.sizeModifier(max, min, (modifiedSize) => {
                this.size += modifiedSize;
                this.scale.setTo(this.size, this.size);
            });

            savedBody.acceleration.x = 0;
            savedBody.acceleration.y = 0;
            savedBody.x = spawn_x;
            savedBody.y = spawnLocation;
            savedBody.velocity.x = 0;
            savedBody.velocity.y = 0;

            setTimeout(() => {
                this.body.velocity.y = this.getVelocity();
                this.body = savedBody;
                this.visible = true;
                this.respawning = false;
            }, timeout);
        });
    }


    getVelocity () {
        return this.goingUp ? Math.floor(Math.random() * (100) - 150) : Math.floor(Math.random() * (100) + 50);
    }


}

const getSpawnLocation = (game, edge, cb) => {
    const ySpawnChoices = [edge, game.world.height - edge];
    const ySpawnLocation = ySpawnChoices[Math.floor(Math.random()*ySpawnChoices.length)];
    const x = this.game.world.randomX;
    if (cb) {
        cb(ySpawnLocation, x);
    }
    return ySpawnLocation;
};


export default Jellyfish;