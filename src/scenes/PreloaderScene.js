import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('PreloaderScene');
    }

    preload() {
        console.log('PreloaderScene: preload');
    }

    create() {
        console.log('PreloaderScene: create');
        this.scene.start('GameScene');
        this.scene.launch('UIScene');
    }
}