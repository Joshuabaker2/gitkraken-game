/**
 * Created by josh on 2016-04-09.
 */

class WindowManager extends Phaser.ScaleManager {

    constructor(game, width, height) {
        super(game, width, height);
        this.manageWindow();
    }

    manageWindow() {
        this.game.input.maxPointers = 1;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.setResizeCallback(this.adjust, this);
        this.adjust();

    }

    adjust() {
        this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
    }

}

export default WindowManager;