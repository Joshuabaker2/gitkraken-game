/**
 * Created by josh on 2016-04-07.
 */

import Collidable from 'objects/Collidable';

class Food extends Collidable {

    constructor(game) {
        super(game, 'bubble', 0.005);
    }

    update () {
        // gets called automatically by World.update()
        this.floatAround();
    }

    floatAround () {
        if (!this.body) return;
        this.body.acceleration.x = Math.floor(Math.random() * (101) - 50);
        this.body.acceleration.y = Math.floor(Math.random() * (101) - 50);
    }

}


export default Food;