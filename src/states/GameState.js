import Player from 'objects/Player';
import WindowManager from 'managers/WindowManager';
import CollisionManager from 'managers/CollisionManager';
import Food from 'objects/Food';

class GameState extends Phaser.State {

	preload() {
		this.game.stage.backgroundColor = "#f5f5f5";
		this.game.load.image('kraken', './assets/kraken.png');
		this.game.load.image('bubble', './assets/bubble.png');
		new WindowManager(this.game, "100%", "100%");
		this.collisionManager = new CollisionManager(this.game);
	}

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY };
		this.player = new Player(this.game, center.x, center.y);
		this.food = new Food(this.game, 0.005);
		this.game.add.existing(this.food);
		this.game.add.existing(this.player);
		this.collisionManager.setPlayer(this.player);
		this.collisionManager.addCollidable(this.food);
	}

	update() {
		this.collisionManager.update();
	}

}

export default GameState;
