import GameState from 'states/GameState';

class Game extends Phaser.Game {

	constructor() {
		super("100%", "100%", Phaser.AUTO, 'content', undefined);
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');
	}

}

new Game();
