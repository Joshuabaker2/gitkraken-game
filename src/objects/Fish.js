/**
 * Created by josh on 2016-04-07.
 */

import Collidable from 'objects/Collidable';
    
class Fish extends Collidable {

    constructor(game) {
        const sizeModifier =  Math.floor(Math.random() * (21) - 3)/1000;
        super(game, 'roundfish', 0.0225 + sizeModifier);
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

        if (this.body.velocity.x > 150) {
            this.body.acceleration.x -= 5;
        } else if (this.body.velocity.x < -150) {
            this.body.acceleration.x += 5;
        }

        if (this.body.velocity.y > 150) {
            this.body.acceleration.y -= 5;
        } else if (this.body.velocity.y < -150) {
            this.body.acceleration.y += 5;
        }

        this.body.acceleration.x += Math.floor(Math.random() * (7) - 3);
        this.body.acceleration.y += Math.floor(Math.random() * (7) - 3);
    }

}


export default Fish;