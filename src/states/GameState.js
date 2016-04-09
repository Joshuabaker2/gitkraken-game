import Player from 'objects/Player';
import WindowManager from 'objects/WindowManager';

class GameState extends Phaser.State {

	preload() {
		this.game.load.image('kraken', './assets/kraken.png');
		new WindowManager(this.game, "100%", "100%");
	}

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY };
		let player = new Player(this.game, center.x, center.y);
		this.game.add.existing(player);
	}

	update() {

	}


}

export default GameState;
