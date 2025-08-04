import Phaser from 'phaser';
import gameState, { businessData } from '../systems/GameState';
import events from '../systems/EventEmitter'; // Corrected path

// --- Helper function for number formatting ---
const numberFormat = [
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "q" },
    { value: 1e18, symbol: "Q" }
];

function formatNumber(dec) {
    if (dec.lt(1000)) {
        return dec.toString();
    }
    const item = numberFormat.slice().reverse().find(item => dec.gte(item.value));
    if (item) {
        return (dec.div(item.value)).toPrecision(3) + item.symbol;
    }
    return dec.toPrecision(3);
}
// --- End Helper Function ---

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.businessUIs = {};
    }

    create() {
        this.drawBusinesses();
        events.on('gameStateChanged', this.updateBusinessUIs, this);
        this.scale.on('resize', this.resize, this);
    }

    drawBusinesses() {
        const businessIds = Object.keys(businessData);
        let yPos = 100;

        const uiWidth = this.scale.width * 0.9;
        const halfWidth = uiWidth / 2;
        const rowHeight = 90;

        businessIds.forEach(id => {
            const business = businessData[id];
            const playerBusiness = gameState.businesses[id];
            const container = this.add.container(this.scale.width / 2, yPos);
            this.businessUIs[id] = container;

            // --- Main Background ---
            const background = this.add.graphics();
            background.fillStyle(0x000000, 0.5);
            background.fillRoundedRect(-halfWidth, -rowHeight / 2, uiWidth, rowHeight, 15);
            container.add(background);

            // --- Dedicated Progress Bar Background ---
            const pBarY = rowHeight / 2 - 20;
            const pBarWidth = uiWidth - 140;
            const pBarBackground = this.add.graphics();
            pBarBackground.fillStyle(0x000000, 0.8);
            pBarBackground.fillRoundedRect(-halfWidth + 120, pBarY, pBarWidth, 15, 8);
            container.add(pBarBackground);
            
            // --- Progress Bar Fill ---
            const progressBar = this.add.graphics();
            container.add(progressBar);
            this.businessUIs[id].progressBar = progressBar;
            this.businessUIs[id].progressBar.pBarY = pBarY;
            this.businessUIs[id].progressBar.pBarWidth = pBarWidth;
            this.businessUIs[id].progressBar.pBarX = -halfWidth + 120;


            // --- Clickable Icon ---
            const iconBG = this.add.graphics();
            iconBG.fillStyle(0x333333);
            iconBG.fillCircle(-halfWidth + 60, 0, 40);
            container.add(iconBG);
            const icon = this.add.text(-halfWidth + 60, 0, business.icon, { fontSize: '50px' }).setOrigin(0.5);
            icon.setInteractive({ useHandCursor: true });
            icon.on('pointerdown', () => gameState.startProduction(id));
            container.add(icon);

            // --- Text Fields ---
            const nameText = this.add.text(-halfWidth + 120, -rowHeight/2 + 25, business.name, { fontSize: '20px', fill: '#FFF' }).setOrigin(0, 0.5);
            container.add(nameText);
            
            const ownedText = this.add.text(-halfWidth + 120, -rowHeight/2 + 50, `Owned: ${playerBusiness.owned.toString()}`, { fontSize: '18px', fill: '#ffd700' }).setOrigin(0, 0.5);
            container.add(ownedText);
            this.businessUIs[id].ownedText = ownedText;
            
            const managerIndicator = this.add.text(nameText.x + nameText.width + 10, nameText.y, '⭐', { fontSize: '20px' }).setOrigin(0, 0.5).setVisible(playerBusiness.hasManager);
            container.add(managerIndicator);
            this.businessUIs[id].managerIndicator = managerIndicator;

            // --- Buy Button ---
            const buyButtonWidth = 80;
            const buyButtonHeight = 50;
            const buyButtonX = halfWidth - buyButtonWidth - 10;
            const buyButtonContainer = this.add.container(buyButtonX, 0);
            container.add(buyButtonContainer);
            this.businessUIs[id].buyButtonContainer = buyButtonContainer;

            this.updateBuyButton(id); // Initial draw of the buy button

            yPos += 110;
        });
    }

    updateBuyButton(id) {
        const ui = this.businessUIs[id];
        if (!ui || !ui.active) return;
        
        ui.buyButtonContainer.removeAll(true);
        
        const cost = gameState.getBusinessCost(id);
        const canAfford = gameState.balance.gte(cost);

        const buyButtonWidth = 80;
        const buyButtonHeight = 50;

        const buyButton = this.add.graphics();
        buyButton.fillStyle(canAfford ? 0x008000 : 0x808080, 1);
        buyButton.fillRoundedRect(0, -buyButtonHeight/2, buyButtonWidth, buyButtonHeight, 10);
        ui.buyButtonContainer.add(buyButton);
        
        const buyText = this.add.text(buyButtonWidth/2, -5, 'BUY', { fontSize: '20px', fill: '#FFF' }).setOrigin(0.5);
        const costText = this.add.text(buyButtonWidth/2, 15, `$${formatNumber(cost)}`, { fontSize: '14px', fill: '#FFF' }).setOrigin(0.5);
        ui.buyButtonContainer.add([buyText, costText]);
        ui.costText = costText;

        if (canAfford) {
            const buyButtonInteractive = this.add.zone(0, -buyButtonHeight/2, buyButtonWidth, buyButtonHeight).setOrigin(0,0).setInteractive({ useHandCursor: true });
            buyButtonInteractive.on('pointerdown', () => gameState.buyBusiness(id));
            ui.buyButtonContainer.add(buyButtonInteractive);
        }
    }

    updateBusinessUIs() {
        Object.keys(this.businessUIs).forEach(id => {
            const ui = this.businessUIs[id];
            if (!ui || !ui.active) return;
            const playerBusiness = gameState.businesses[id];
            
            ui.ownedText.setText(`Owned: ${playerBusiness.owned.toString()}`);
            ui.managerIndicator.setVisible(playerBusiness.hasManager);
            this.updateBuyButton(id);
        });
    }
    
    resize(gameSize) {
        Object.values(this.businessUIs).forEach(container => container.destroy());
        this.businessUIs = {};
        this.drawBusinesses();
    }

    update(time, delta) {
        const businessIds = Object.keys(gameState.businesses);

        businessIds.forEach(id => {
            const businessState = gameState.businesses[id];
            
            if (businessState.hasManager && !businessState.producing) {
                gameState.startProduction(id);
            }

            if (businessState.producing) {
                businessState.progress += delta;
                const businessInfo = businessData[id];
                const progressPercent = Math.min(1, businessState.progress / businessInfo.revenuePeriod);
                
                const ui = this.businessUIs[id];
                if (ui && ui.progressBar && ui.progressBar.active) {
                    const pBar = ui.progressBar;
                    pBar.clear();
                    pBar.fillStyle(0x00ff00, 1);
                    pBar.fillRoundedRect(pBar.pBarX, pBar.pBarY, pBar.pBarWidth * progressPercent, 15, 8);
                }

                if (businessState.progress >= businessInfo.revenuePeriod) {
                    gameState.collectRevenue(id);
                    if (ui && ui.progressBar && ui.progressBar.active) {
                        ui.progressBar.clear();
                    }
                }
            }
        });
    }
}