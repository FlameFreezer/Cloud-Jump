function TileToPixel(tilecoord) {
    return tilecoord * tileDimension;
}
class Level extends Phaser.Scene {
    constructor() {
        super("level");
    }
    preload() {

    }
    create() {
        this.map = this.add.tilemap("offworld", tileDimension, tileDimension, mapWidth, mapHeight);

        this.tileset = this.map.addTilesetImage("tilemap_packed", "tilemap_tiles");

        this.spriteLayer = this.map.createLayer("Sprites", this.tileset, 0, 0);
        this.foregroundLayer = this.map.createLayer("Foreground", this.tileset, 0, 0);
        this.backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0);

        this.spriteLayer.setCollisionByProperty({
            collides: true
        });

        this.cameras.main.setBounds(0, 0, TileToPixel(mapWidth), TileToPixel(mapHeight));
        //this.cameras.main.setScroll(0, TileToPixel(221));
        this.cameras.main.setZoom(1.8);

        this.player = new Player(this, 300, 200);
    }
    update(time, delta) {
        this.player.update(delta);
    }
}