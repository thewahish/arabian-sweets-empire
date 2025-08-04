import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('PreloaderScene');
    }

    preload() {}

    create() {
        this.scene.start('GameScene');
        this.scene.launch('UIScene');
    }
}