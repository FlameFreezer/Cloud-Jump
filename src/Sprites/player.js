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
        this.anims.create({
            key: "jump",
            showOnStart: true,
            frames: [
                {key: "characters", frame: "tile_0005.png"}
            ]
        });
        this.anims.create({
            key: "idle",
            showOnStart: true,
            frames: [
                {key: "characters", frame: "tile_0004.png"} 
            ]
        });
        this.ACCELERATION = 400;
        this.MAX_SPEED = 130;
        this.TURN_SPEED = 2 * this.ACCELERATION;
        this.FRICTION = this.ACCELERATION;
        this.DRAG = 50;
        this.JUMP_SPEED = 325;
        this.UP_GRAVITY = 700;
        this.DOWN_GRAVITY = 1200;
        this.COLLISION_X_MARGIN = 2;
        this.COLLISION_Y_MARGIN = 15;
        this.TERMINAL_SPEED = 700;
        this.JUMP_RELEASE_SPEED = 100;

        this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.body.setMaxVelocityX(this.MAX_SPEED);
        this.body.setMaxVelocityY(this.TERMINAL_SPEED);
        this.body.setSize(this.width * this.scaleX - this.COLLISION_X_MARGIN * 2, this.height * this.scaleY - this.COLLISION_Y_MARGIN, true);
        this.body.setOffset(this.COLLISION_X_MARGIN, this.COLLISION_Y_MARGIN);

        this.playingWalk = false;

        this.walkingVFX = scene.add.particles(0, 0, "kenney-particles", {
            frame: "smoke_04.png",
            scale: {start: 0.03, end: 0.05},
            maxAliveParticles: 1,
            lifespan: 300,
            gravityY: -200,
            alpha: {start: 1.0, end: 0.8},
            rotate: {min: 0, max: 360}
        });
        this.walkingVFX.stop();

    }

    update(delta) {
        let isOnFloor = this.body.blocked.down; 
        // Horizontal input polling
        let input = 0;
        if(this.dKey.isDown) {
            input += 1;
        }
        if(this.aKey.isDown) {
            input -= 1;
        }

        // Apply horizontal acceleration
        if(input == 0) {
            this.body.setAccelerationX(0);
            if(isOnFloor) {
                this.body.setDragX(this.FRICTION);
            }
            else {
                this.body.setDragX(this.DRAG);
            }
        }
        else {
            let accel = this.ACCELERATION;
            if(Math.sign(input) != Math.sign(this.body.velocity.x) && isOnFloor) {
                accel = this.TURN_SPEED;
            }
            this.body.setAccelerationX(input * accel);
        }
        
        // Check for jumping
        if(Phaser.Input.Keyboard.JustDown(this.spaceKey) && isOnFloor) {
            this.body.velocity.y -= this.JUMP_SPEED;
        }
        if(Phaser.Input.Keyboard.JustUp(this.spaceKey) && this.body.velocity.y < -this.JUMP_RELEASE_SPEED) {
            this.body.velocity.y = -this.JUMP_RELEASE_SPEED;
        }

        // Flip player sprite based on input
        if(input > 0) {
            this.flipX = true;
        }
        else if(input < 0) {
            this.flipX = false;
        }

        // Up and Down gravity
        if(this.body.velocity.y < 0) {
            this.body.setGravityY(this.UP_GRAVITY);
        }
        else {
            this.body.setGravityY(this.DOWN_GRAVITY);
        }

        // Animations
        if(!isOnFloor) {
            this.play("jump");
            this.playingWalk = false;
            this.walkingVFX.stop();
        }
        else if(this.body.velocity.x != 0) {
            if(!this.playingWalk) {
                this.play("walk");
                this.playingWalk = true;
                this.walkingVFX.startFollow(this, -5 * Math.sign(this.body.velocity.x), this.displayHeight / 2 - 5, false);
                this.walkingVFX.start();
            }
        }
        else {
            this.play("idle");
            this.playingWalk = false;
            this.walkingVFX.stop();
        }
    }
    pause() {
        this.stop();
        this.body.setAccelerationX(0);
        this.body.setDragX(0);
        this.body.setVelocityX(0);
        this.body.setGravityY(0);
    }
}