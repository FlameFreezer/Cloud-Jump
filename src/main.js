"use strict"

const canvasW = 800;
const canvasH = 600;
// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade"
    },
    width: canvasW,
    height: canvasH,
    scene: [Level]
}

const game = new Phaser.Game(config);