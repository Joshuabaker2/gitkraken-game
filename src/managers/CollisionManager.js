/**
 * Created by josh on 2016-04-09.
 */

class CollisionManager extends Phaser.Physics.Arcade {

    constructor(game) {
        super(game);
        this.collidables = [];
    }

    setPlayer (player) {
        console.log("player added");
        this.player = player;
    }

    addCollidable (collidable) {
        console.log(collidable);
        this.collidables.push(collidable);
    }

    update() {
        this.collidables.forEach((collidable) => {
            this.game.physics.arcade.collide(this.player, collidable, this.playerCollision, null, this);
        });
    }
    
    playerCollision(player, collidable) {
        if (player.size < collidable.size) {
            console.log("Game over");
            return;
        }
        player.growBy(collidable.size);
        collidable.respawn();
    }

}

export default CollisionManager;