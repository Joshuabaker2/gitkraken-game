/**
 * Created by josh on 2016-04-09.
 */

class ScoreManager {

    constructor(game) {
        this.text = game.add.text(game.world.x + 25, game.world.y + 25, "Score: 0", {font: "20px Arial", fill: "#000000"});
        this.score = 0;
    }

    addScore(score) {
        this.score += Math.round(score * 1000);
        this.text.setText(`Score: ${this.score}`);
    }

}

export default ScoreManager;