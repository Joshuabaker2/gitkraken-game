/**
 * Created by josh on 2016-04-07.
 */

import Collidable from 'objects/Collidable';
    
class Fish extends Collidable {

    constructor(game) {
        const sizeModifier =  Math.floor(Math.random() * (21) - 3)/1000;
        super(game, 'roundfish', 0.0225 + sizeModifier);
        this.goingLeft = sizeModifier % 2 === 1;
        this.maxVelocity = Math.floor(Math.random() * (84) - 45)
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

        if (this.body.velocity.x > this.maxVelocity) {
            this.goingLeft = true;
        } else if (this.body.velocity.x < -this.maxVelocity) {
            this.goingLeft = false;
        }

        if (this.body.velocity.y > 50) {
            this.body.acceleration.y -= 5;
        } else if (this.body.velocity.y < -50) {
            this.body.acceleration.y += 5;
        }

        if (this.goingLeft) {
            this.body.acceleration.x -= 1;
        } else {
            this.body.acceleration.x += 1;
        }

        this.body.acceleration.y += Math.floor(Math.random() * (3) - 1);
    }

}


export default Fish;