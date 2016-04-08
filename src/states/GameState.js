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
		// let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		// text.anchor.set(0.5);
	}

	update() {
		// player.handleKeyboard();
//    _handleCollisions();
// 	player.handleMomentum();
//    handleKeyboard();
	}

}

export default GameState;
