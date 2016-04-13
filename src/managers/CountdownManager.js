/**
 * Created by josh on 2016-04-09.
 */


class CountdownManager  {

    constructor(game) {
        this.game = game;

        this.text3 = game.add.text(this.game.world.centerX,
                                    this.game.world.centerY,
                                    "3",
                                    { align: "center",
                                        font: "60px Arial",
                                        fill: "#ffffff"});
        this.text2 = game.add.text(this.game.world.centerX,
                                    this.game.world.centerY,
                                    "2",
                                    { align: "center",
                                        font: "60px Arial",
                                        fill: "#ffffff"});
        this.text1 = game.add.text(this.game.world.centerX,
                                    this.game.world.centerY,
                                    "1",
                                    { align: "center",
                                        font: "60px Arial",
                                        fill: "#ffffff"});
        this.textgo = game.add.text(this.game.world.centerX,
                                    this.game.world.centerY,
                                    "Go!",
                                    { align: "center",
                                        font: "60px Arial",
                                        fill: "#ffffff"});
        
        this.text3.visible = false;
        this.text2.visible = false;
        this.text1.visible = false;
        this.textgo.visible = false;

    }
    
    start() {
        setTimeout(() => {
            this.textgo.visible = false;
        }, 4000);

        setTimeout(() => {
            this.text1.visible = false;
            this.textgo.visible = true;
        }, 3000);

        setTimeout(() => {
            this.text2.visible = false;
            this.text1.visible = true;
        }, 2000);

        setTimeout(() => {
            this.text3.visible = false;
            this.text2.visible = true;
        }, 1000);
        
        this.text3.visible = true;
    }
    
    
    

}

export default CountdownManager;