import Phaser from 'phaser';
import PreloaderScene from './scenes/PreloaderScene';
import GameScene from './scenes/GameScene';
import UIScene from './scenes/UIScene';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [PreloaderScene, GameScene, UIScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#2d1810'
};

const game = new Phaser.Game(config);