import Player from 'objects/Player';
import WindowManager from 'managers/WindowManager';
import CollisionManager from 'managers/CollisionManager';
import Food from 'objects/Food';
import Fish from 'objects/Fish';
import Jellyfish from 'objects/Jellyfish';

class GameState extends Phaser.State {

	preload() {
		this.game.stage.backgroundColor = "#f5f5f5";
		this.loadAssets();
		this.windowManager = new WindowManager(this.game, "100%", "100%");
	}

	create() {
		this.collisionManager = new CollisionManager(this.game);
		this.generateFood();
		this.generateFish();
		this.generateJellyfish();
		this.generatePlayer();
	}

	update() {
		this.collisionManager.update();
		this.windowManager.update();
	}

	loadAssets() {
		this.game.load.image('kraken', './assets/kraken.png');
		this.game.load.image('bubble', './assets/bubble.png');
		this.game.load.image('roundfish', './assets/roundfish.png');
		this.game.load.image('jellyfish', './assets/talljelly.png');
	}

	generateFood() {
		for (let i = 0; i < 10; i++ ) {
			const food = new Food(this.game);
			this.game.add.existing(food);
			this.collisionManager.addCollidable(food);
			this.windowManager.addSprite(food);
		}
	}

	generateFish() {
		for (let i = 0; i < 8; i++ ) {
			const fish = new Fish(this.game);
			this.game.add.existing(fish);
			this.collisionManager.addCollidable(fish);
			this.windowManager.addRespawnSprite(fish);
		}
	}

	generateJellyfish() {
		for (let i = 0; i < 5; i++ ) {
			const jellyfish = new Jellyfish(this.game);
			this.game.add.existing(jellyfish);
			this.collisionManager.addCollidable(jellyfish);
			this.windowManager.addRespawnSprite(jellyfish);
		}
	}

	generatePlayer() {
		this.player = new Player(this.game, this.game.world.centerX, this.game.world.centerY);
		this.game.add.existing(this.player);
		this.collisionManager.setPlayer(this.player);
		this.windowManager.addSprite(this.player);
	}

}

export default GameState;
