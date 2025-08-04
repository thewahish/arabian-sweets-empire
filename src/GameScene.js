import Phaser from 'phaser';
import gameState, { businessData } from '../systems/GameState';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.businessUIs = {}; // To hold references to the UI containers
    }

    create() {
        console.log('GameScene: create');
        this.drawBusinesses();

        // Listen for gameState changes to redraw
        this.game.events.on('gameStateChanged', this.updateBusinessUIs, this);
    }

    drawBusinesses() {
        const businessIds = Object.keys(businessData);
        let yPos = 100; // Starting Y position for the first business

        businessIds.forEach(id => {
            const business = businessData[id];
            const playerBusiness = gameState.businesses[id];

            // Create a container for each business UI
            const container = this.add.container(this.scale.width / 2, yPos);
            this.businessUIs[id] = container;

            // Background for the business row
            const background = this.add.graphics();
            background.fillStyle(0x000000, 0.5);
            background.fillRoundedRect(-200, -45, 400, 90, 15);
            container.add(background);
            
            // Business Icon
            const icon = this.add.text(-180, 0, business.icon, { fontSize: '50px' }).setOrigin(0, 0.5);
            container.add(icon);

            // Business Name
            const nameText = this.add.text(-120, -25, business.name, { fontSize: '20px', fill: '#FFF' }).setOrigin(0, 0.5);
            container.add(nameText);
            
            // Owned Count Text
            const ownedText = this.add.text(-120, 15, `Owned: ${playerBusiness.owned.toString()}`, { fontSize: '18px', fill: '#ffd700' }).setOrigin(0, 0.5);
            container.add(ownedText);
            this.businessUIs[id].ownedText = ownedText; // Save reference to update it later

            // Buy Button
            const buyButton = this.add.graphics();
            buyButton.fillStyle(0x008000, 1);
            buyButton.fillRoundedRect(100, -25, 80, 50, 10);
            container.add(buyButton);
            
            const buyButtonInteractive = this.add.zone(100, -25, 80, 50).setOrigin(0).setInteractive();
            
            const buyText = this.add.text(140, 0, 'BUY', { fontSize: '20px', fill: '#FFF' }).setOrigin(0.5);
            container.add(buyText);

            // Cost Text
            const cost = gameState.getBusinessCost(id);
            const costText = this.add.text(140, 35, `$${cost.toPrecision(3)}`, { fontSize: '14px', fill: '#FFF' }).setOrigin(0.5);
            container.add(costText);
            this.businessUIs[id].costText = costText; // Save reference to update it later

            buyButtonInteractive.on('pointerdown', () => {
                console.log(`Clicked buy for ${id}`);
                gameState.buyBusiness(id);
                // After buying, we will emit an event from GameState to update the UI
            });
            container.add(buyButtonInteractive);

            yPos += 110; // Increment Y position for the next business
        });
    }

    updateBusinessUIs() {
        // This function will be called when our gameState changes
        console.log("Updating all business UIs based on new game state...");
        Object.keys(this.businessUIs).forEach(id => {
            const container = this.businessUIs[id];
            const playerBusiness = gameState.businesses[id];
            const newCost = gameState.getBusinessCost(id);

            // Update the text fields
            container.ownedText.setText(`Owned: ${playerBusiness.owned.toString()}`);
            container.costText.setText(`$${newCost.toPrecision(3)}`);
        });
    }

    update(time, delta) {
        // Main game loop
    }
}