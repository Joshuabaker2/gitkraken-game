/**
 * Created by josh on 2016-04-07.
 */

import Collidable from 'objects/Collidable';

class Food extends Collidable {

    constructor(game) {
        const location = getSpawnLocation(game);
        super(game, 'bubble', 0.005, 0, location.x, location.y);

        this.movingHorizontally = Math.random() > 0.5;
        this.movingVertically = Math.random() > 0.5;

        this.goingLeft = location.x !== 0;
        this.goingUp = location.y !== 0;
    }

    update () {
        // gets called automatically by World.update()
        this.floatAround();
    }

    floatAround () {
        if (!this.body) return;

        if (this.movingHorizontally) {
            this.body.velocity.x = this.getVelocity(this.goingLeft);
        }

        if (this.movingVertically) {
            this.body.velocity.y = this.getVelocity(this.goingUp);
        }
    }

    respawn (x, y, timeout = 5000) {
        if (this.respawning) return;
        this.respawning = true;

        const savedBody = this.body;
        this.body = null;
        this.visible = false;

        getSpawnLocation(this.game, (spawnLocation) => {
            savedBody.x = spawnLocation.x;
            savedBody.y = spawnLocation.y;
            savedBody.acceleration.x = 0;
            savedBody.acceleration.y = 0;
            this.body = savedBody;

            setTimeout(() => {
                this.visible = true;
                this.respawning = false;
            }, timeout);    
        });
        
    }

    getVelocity (condition) {
        return condition ? Math.floor(Math.random() * (100) - 150) : Math.floor(Math.random() * (100) + 50);
    }

}

const getSpawnLocation = (game, cb) => {
    const xSpawnChoices = [0, game.world.width];
    const x = xSpawnChoices[Math.floor(Math.random()*xSpawnChoices.length)];
    const ySpawnChoices = [0, game.world.height];
    const y = ySpawnChoices[Math.floor(Math.random()*ySpawnChoices.length)];
    if (cb) {
        cb({x: x, y: y});
    }
    return {x: x, y: y};
};

export default Food;