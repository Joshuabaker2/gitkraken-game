/**
 * Created by josh on 2016-04-09.
 */
import ScoreManager from 'managers/ScoreManager';

class CollisionManager extends Phaser.Physics.Arcade {

    constructor(game) {
        super(game);
        this.collidables = [];
        this.scoreManager = new ScoreManager(game);
        this.gameOver = false;
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    }

    setPlayer (player) {
        this.player = player;
    }

    addCollidable (collidable) {
        this.collidables.push(collidable);
    }

    update() {
        if (this.gameOver && this.spaceKey.isDown) {
            this.game.state.restart();
        }
        this.collidables.forEach((collidable) => {
            this.game.physics.arcade.collide(this.player, collidable, this.playerCollision, null, this);
        });
    }
    
    playerCollision(player, collidable) {
        if (player.size < collidable.size) {
            player.visible = false;
            player.body = false;
            this.scoreManager.gameOver();
            this.gameOver = true;
            return;
        }
        this.scoreManager.addScore(collidable.size);
        player.growBy(collidable.size);
        collidable.respawn(null, null, 1500, player.size, player.size/2);
    }

}

export default CollisionManager;