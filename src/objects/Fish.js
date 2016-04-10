/**
 * Created by josh on 2016-04-07.
 */

import Collidable from 'objects/Collidable';
    
class Fish extends Collidable {

    constructor(game) {
        super(game, 'roundfish', 0.0225);
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
        this.body.acceleration.x = Math.floor(Math.random() * (501) - 250);
        this.body.acceleration.y = Math.floor(Math.random() * (501) - 250);
    }

}


export default Fish;