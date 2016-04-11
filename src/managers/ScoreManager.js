/**
 * Created by josh on 2016-04-09.
 */


class ScoreManager  {

    constructor(game) {
        this.text = game.add.text(game.world.x + 25, game.world.y + 25, "Score: 0", {font: "20px Arial", fill: "#ffffff"});
        this.game = game;
        this.score = 0;
        this.isGameOver = false;
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    
    update () {
        if (this.isGameOver && this.spaceKey.isDown) {
            this.game.state.restart();
        }
    }

    addScore(score) {
        this.score += Math.round(score * 1000);
        this.text.setText(`Score: ${this.score}`);
        
        this.checkIfWon();
    }
    
    checkIfWon() {
        if (this.score > 3500) {
            this.isGameOver = true;
            this.game.add.text(this.game.world.centerX - 200,
                this.game.world.centerY - 200,
                `Congratulations! You've eaten to the size of a galaxy!`,
                { align: "center",
                    font: "60px Arial",
                    fill: "#ffffff"});
        }
    }

    gameOver() {
        this.isGameOver = true;
        this.game.add.text(this.game.world.centerX - 200,
            this.game.world.centerY - 200,
            `Game Over \n Score: ${this.score}`,
            { align: "center",
                font: "60px Arial",
                fill: "#ffffff"});

        this.game.add.text(this.game.world.centerX - 250,
            this.game.world.centerY,
            `Press Spacebar to Restart`,
            { align: "center",
                font: "40px Arial",
                fill: "#ffffff"});
    }

}

export default ScoreManager;