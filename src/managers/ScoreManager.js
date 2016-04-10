/**
 * Created by josh on 2016-04-09.
 */

class ScoreManager {

    constructor(game) {
        this.text = game.add.text(game.world.x + 25, game.world.y + 25, "Score: 0", {font: "20px Arial", fill: "#000000"});
        this.game = game;
        this.score = 0;
    }

    addScore(score) {
        this.score += Math.round(score * 1000);
        this.text.setText(`Score: ${this.score}`);
    }

    gameOver() {
        this.game.add.text(this.game.world.centerX - 200,
            this.game.world.centerY - 200,
            `Game Over \n Score: ${this.score}`,
            { align: "center",
                // boundsAlignV: "middle",
                font: "60px Arial",
                fill: "#000000"});

        this.game.add.text(this.game.world.centerX - 250,
            this.game.world.centerY,
            `Press Spacebar to Restart`,
            { align: "center",
                // boundsAlignV: "middle",
                font: "40px Arial",
                fill: "#000000"});
    }

}

export default ScoreManager;