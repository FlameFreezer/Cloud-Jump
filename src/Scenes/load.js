class Load extends Phaser.Scene {
    constructor() {
        super("load");
    }

    preload() {
        this.load.setPath("./Assets");

        this.load.image("tilemap_tiles", "tilemap_packed.png");
        this.load.tilemapTiledJSON("offworld", "offworld.tmj");
    }

    create() {
        this.scene.start("level");
    }
}