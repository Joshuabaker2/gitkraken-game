/**
 * Created by josh on 2016-04-09.
 */
import ScoreManager from 'managers/ScoreManager';

class CollisionManager extends Phaser.Physics.Arcade {

    constructor(game) {
        super(game);
        this.collidables = [];
        this.scoreManager = new ScoreManager(game, Phaser);
    }

    setPlayer (player) {
        this.player = player;
    }

    addCollidable (collidable) {
        this.collidables.push(collidable);
    }

    update() {
        this.scoreManager.update();
        this.collidables.forEach((collidable) => {
            this.game.physics.arcade.collide(this.player, collidable, this.playerCollision, null, this);
        });
    }
    
    playerCollision(player, collidable) {
        if (player.size < collidable.size) {
            player.visible = false;
            player.body = false;
            this.scoreManager.gameOver();
            return;
        }
        this.scoreManager.addScore(collidable.size);
        player.growBy(collidable.size);
        collidable.respawn(null, null, 1500, player.size, player.size/2);
    }

}

export default CollisionManager;