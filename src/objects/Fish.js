/**
 * Created by josh on 2016-04-07.
 */

import Collidable from 'objects/Collidable';
    
class Fish extends Collidable {

    constructor(game) {
        super(game, 'roundfish', 0.0225, 30);
        
        this.maxAcceleration = Math.random() * (150 - 74) + 74;
        this.maxVelocity = Math.random() * (80 - 40) + 40;
        this.goingLeft = this.maxAcceleration % 2 === 1;

    }

    update () {
        // gets called automatically by World.update()
        this.swimAround();
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

}


export default Fish;