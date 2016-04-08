// import RainbowText from 'objects/RainbowText';
import Player from 'objects/Player';

class GameState extends Phaser.State {

	preload() {
		this.game.load.image('kraken', './assets/kraken.png');
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
