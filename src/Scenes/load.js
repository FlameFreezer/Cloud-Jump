class Load extends Phaser.Scene {
    constructor() {
        super("load");
    }

    preload() {
        this.load.setPath("./Assets");

        //Load tilemaps
        this.load.atlas("characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        this.load.image("tilemap_tiles", "tilemap_packed.png");
        this.load.tilemapTiledJSON("offworld", "offworld.tmj");

        //Load particles
        this.load.multiatlas("kenney-particles", "kenney-particles.json");

        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        //Load font
        this.load.setPath("./Assets/daydream_3");
        this.load.bitmapFont("daydream_3", "daydream_3_0.png", "daydream_3.fnt");

    }

    create() {
        this.scene.start("level");
    }
}