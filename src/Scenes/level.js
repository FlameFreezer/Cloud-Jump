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

        this.player = new Player(this, TileToPixel(this.PLAYER_SPAWN_POS.x), TileToPixel(this.PLAYER_SPAWN_POS.y));

        //this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player.body, this.spriteLayer);

        //idk this magic number stops the camera from scrolling too far down
        this.cameras.main.setBounds(0, 0, TileToPixel(mapWidth), TileToPixel(mapHeight) - 1800);
        this.cameras.main.setZoom(1.8);
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.startFollow(this.player.body, true, 0.25, 0.25);


    }
    update(time, delta) {
        this.player.update(delta);
    }
}