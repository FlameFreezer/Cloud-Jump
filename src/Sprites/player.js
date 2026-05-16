class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "characters", "tile_0004.png");
        this.body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
        scene.physics.world.add(this.body);
        scene.add.existing(this);

        this.anims.create({
            key: "walk",
            frameRate: 8,
            repeat: -1,
            showOnStart: true,
            frames: [
                {key: "characters", frame: "tile_0005.png"},
                {key: "characters", frame: "tile_0004.png"} 
            ]
        });
        this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        this.dKey.on("down", (event) => {
            this.play("walk");
        });
        this.dKey.on("up", (event) => {
            this.stopAfterRepeat(0);
        })
        this.aKey.on("down", (event) => {
            this.play("walk");
        });
        this.aKey.on("up", (event) => {
            this.stopAfterRepeat(0);
        });
    }

    update(delta) {
    }
}