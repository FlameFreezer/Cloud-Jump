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

        this.coins = this.map.createFromObjects("Coins", {
            name: "coin",
            key: "tilemap_sheet",
            frame: 151
        });
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
        this.coinGroup = this.add.group(this.coins);
        this.coinCount = 0;
        this.coinParticle = this.add.particles(0, 0, "kenney-particles", {
            frame: "flare_01.png",
            scale: 0.1,
            speed: 50,
            lifespan: 250,
            frequency: 0,
            quantity: 5
        });
        this.coinParticle.stop();
        this.registry.set('coin count', this.coinCount);
        this.physics.add.collider(this.player.body, this.spriteLayer);

        this.physics.add.overlap(this.player, this.coinGroup, (obj1, obj2) => {
            this.coinParticle.x = obj2.x;
            this.coinParticle.y = obj2.y;
            this.coinParticle.explode();
            obj2.destroy();
            this.coinCount++;
            this.registry.set('coin count', this.coinCount);
        })

        //this magic number stops the camera from scrolling too far down
        this.cameras.main.setBounds(0, 0, TileToPixel(mapWidth), TileToPixel(mapHeight) - 1800);
        this.cameras.main.setZoom(1.8);
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.startFollow(this.player.body, true, 0.25, 0.25);


        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.levelOver = false;
        this.registry.set('level over', false);

        this.ui = this.scene.launch("ui");
    }
    update(time, delta) {
        if(!this.levelOver) {
            this.player.update(delta);
            //Level end condition - land on the UFO runway
            //250
            if(this.player.y <= TileToPixel(122) && this.player.body.blocked.down) {
                this.levelOver = true;
                this.registry.set('level over', true);
                this.player.pause();
            }
        }
        else {
            if(this.enterKey.isDown) {
                this.registry.set('level over', false);
                this.scene.start("level");
            }
        }
    }
}