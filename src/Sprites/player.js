const SMALL_DELTA = 0.01;
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
        this.ACCELERATION = 400;
        this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.body.setMaxVelocityX(140);
    }

    update(delta) {
        // Horizontal input polling
        var input = 0;
        if(this.dKey.isDown) {
            input += 1;
        }
        if(this.aKey.isDown) {
            input -= 1;
        }
        // Apply horizontal acceleration
        if(input == 0) {
            this.body.setAccelerationX(0);
            this.body.setDragX(this.ACCELERATION);
        }
        else {
            this.body.setAccelerationX(input * this.ACCELERATION);
        }
        
        // Check for jumping
        if(Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.body.blocked.down) {
            this.body.velocity.y -= 400;
        }

        // Flip player sprite based on velocity
        if(this.body.velocity.x - SMALL_DELTA > 0) {
            this.flipX = true;
        }
        else if(this.body.velocity.x + SMALL_DELTA < 0) {
            this.flipX = false;
        }

        // Handle walk animation
        if(this.body.velocity.x != 0 && !this.anims.isPlaying) {
            this.play("walk");
        }
        else {
            this.stopAfterRepeat(0);
        }
    }
}