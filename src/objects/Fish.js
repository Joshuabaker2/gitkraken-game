/**
 * Created by josh on 2016-04-07.
 */

import Collidable from 'objects/Collidable';
    
class Fish extends Collidable {

    constructor(game) {
        const xSpawnChoices = [game.world.x, game.world.width];
        const x = xSpawnChoices[Math.floor(Math.random()*xSpawnChoices.length)];
        super(game, 'roundfish', 0.0225, 30, x, null);
        
        // this.maxAcceleration = Math.random() * (150 - 74) + 74;
        // this.maxVelocity = Math.random() * (80 - 40) + 40;
        this.goingLeft = x !== 0;
        this.respawning = false;
        this.body.velocity.x = this.getVelocity();

    }

    update () {
        // gets called automatically by World.update()
        // this.swimAround();
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


    swimAround () {
        if (!this.body) return;

        if (this.body.acceleration.x > this.maxAcceleration || this.body.velocity.x > this.maxVelocity) {
            this.goingLeft = true;
        } else if (this.body.acceleration.x < -this.maxAcceleration || this.body.velocity.x < -this.maxVelocity) {
            this.goingLeft = false;
        }

        if (this.body.velocity.y > 50) {
            this.body.acceleration.y -= 5;
        } else if (this.body.velocity.y < -50) {
            this.body.acceleration.y += 5;
        }

        if (this.goingLeft === true) {
            this.body.acceleration.x -= 1;
        } else {
            this.body.acceleration.x += 1;
        }

        this.body.acceleration.y += Math.floor(Math.random() * (3) - 1);
    }

    respawn (x = this.game.world.randomX, y = this.game.world.randomY, timeout = 5000, max, min) {
        if (this.respawning) return;
        this.respawning = true;
        const savedBody = this.body;
        const newSize = this.size + this.sizeModifier(max, min);

        const xSpawnChoices = [this.game.world.x, this.game.world.width];
        x = xSpawnChoices[Math.floor(Math.random()*xSpawnChoices.length)];

        this.goingLeft = x !== 0;
        this.visible = false;

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


export default Fish;