/**
 * Created by josh on 2016-04-09.
 */

class WindowManager extends Phaser.ScaleManager {

    constructor(game, width, height) {
        super(game, width, height);
        this.manageWindow();
        this.sprites = [];
    }

    manageWindow() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.setResizeCallback(this.adjust, this);
    }
    
    update() {
        this.screenWrap();
    }

    adjust() {
        this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
    }
    
    addSprite (sprite) {
        this.sprites.push(sprite);        
    }

    screenWrap () {
        this.sprites.forEach((sprite) => {
            if (sprite.x < 0) {
                sprite.x = this.game.width;
            } else if (sprite.x > this.game.width) {
                sprite.x = 0;
            }

            if (sprite.y < 0) {
                sprite.y = this.game.height;
            } else if (sprite.y > this.game.height) {
                sprite.y = 0;
            }    
        });
    }

}

export default WindowManager;