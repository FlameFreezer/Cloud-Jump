class UI extends Phaser.Scene {
    constructor() {
        super("ui", true);
    }
    preload() {
        //Load font
        this.load.setPath("./Assets/daydream_3");
        this.load.bitmapFont("daydream_3", "daydream_3_0.png", "daydream_3.fnt");
    }
    create() {
        this.endLevelTxt = this.add.bitmapText(canvasW / 2, canvasH / 2, "daydream_3", "Horay! You WIN!\n\nPress enter to play again", 14)
            .setOrigin(0.5)
            .setBlendMode(Phaser.BlendModes.ADD);
        this.endLevelTxt.maxWidth = 150;

        this.endLevelTxt.visible = false;

        this.coinTxt = this.add.bitmapText(canvasW - 50, 25, "daydream_3", "0 coins", 18)
            .setOrigin(0.5)
            .setBlendMode(Phaser.BlendModes.ADD);
        
        this.registry.events.on('changedata', this.updateText, this);
    }
    update(time, delta) {
    }
    updateText(parent, key, data) {
        if(key == 'coin count') {
            this.coinTxt.setText(`${data} coins`);
        }
        else if(key == 'level over') {
            this.endLevelTxt.visible = data;
        }
    }
}