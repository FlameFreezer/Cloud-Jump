"use strict"

const tileDimension = 18;
const mapWidth = 32;
const mapHeight = 356;
const canvasW = 600;
const canvasH = 800;
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
    scene: [Load, Level]
}

const game = new Phaser.Game(config);