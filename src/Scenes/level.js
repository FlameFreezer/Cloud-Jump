function TileToPixel(tilecoord) {
    return tilecoord * tileDimension;
}
class Level extends Phaser.Scene {
    constructor() {
        super("level");
    }
    preload() {

    }
    init() {
        this.PLAYER_SPAWN_POS = {
            x: 15,
            y: 251
        };
    }
    create() {
        this.map = this.add.tilemap("offworld", tileDimension, tileDimension, mapWidth, mapHeight);

        this.tileset = this.map.addTilesetImage("tilemap_packed", "tilemap_tiles");

        this.spriteLayer = this.map.createLayer("Sprites", this.tileset, 0, 0);
        this.foregroundLayer = this.map.createLayer("Foreground", this.tileset, 0, 0);
        this.backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0);

        this.spriteLayer.setCollisionByProperty({
            Collides: true
        });

        this.coins = this.map.createFromObjects("Coins", {
            name: "coin",
            key: "tilemap_sheet",
            frame: 151
        });

        this.player = new Player(this, TileToPixel(this.PLAYER_SPAWN_POS.x), TileToPixel(this.PLAYER_SPAWN_POS.y));

        //this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player.body, this.spriteLayer);

        //this magic number stops the camera from scrolling too far down
        this.cameras.main.setBounds(0, 0, TileToPixel(mapWidth), TileToPixel(mapHeight) - 1800);
        this.cameras.main.setZoom(1.8);
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.startFollow(this.player.body, true, 0.25, 0.25);

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.levelOver = false;

        this.endLevelTxt = this.add.bitmapText(0, 0, "daydream_3", "Horay! You WIN!\n\nPress enter to play again", 14)
            .setOrigin(0.5)
            .setBlendMode(Phaser.BlendModes.ADD);
        this.endLevelTxt.maxWidth = 150;

        this.endLevelTxt.visible = false;
    }
    update(time, delta) {
        if(!this.levelOver) {
            this.player.update(delta);
            //Level end condition - land on the UFO runway
            if(this.player.y <= TileToPixel(122) && this.player.body.blocked.down) {
                this.levelOver = true;
                this.player.pause();
                let worldView = this.cameras.main.worldView;
                this.endLevelTxt.x = worldView.x + worldView.width / 2;
                this.endLevelTxt.y = worldView.y + worldView.height / 2;
                this.endLevelTxt.visible = true;
            }
        }
        else {
            if(this.enterKey.isDown) {
                this.endLevelTxt.visible = false;
                this.scene.start("level");
            }
        }
    }
}