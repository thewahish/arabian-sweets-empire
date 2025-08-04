import Phaser from 'phaser';
import gameState, { businessData, managerData } from '../systems/GameState';
import events from '../systems/EventEmitter';

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

export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        this.balanceText = this.add.text(20, 20, `Balance: $0.00`, {
            fontSize: '32px',
            fill: '#ffd700',
            fontStyle: 'bold'
        });

        this.createManagerButton();
        this.createManagerPanel();

        events.on('gameStateChanged', this.updateUI, this);
        this.updateUI();
    }

    updateUI() {
        this.balanceText.setText(`Balance: $${formatNumber(gameState.balance)}`);
        if (this.managerPanel && this.managerPanel.visible) {
            this.updateManagerPanel();
        }
    }

    createManagerButton() {
        const managerButton = this.add.text(this.scale.width - 20, 20, '💼 Managers', {
            fontSize: '24px', fill: '#FFF', backgroundColor: '#00000080', padding: { x: 10, y: 5 }
        }).setOrigin(1, 0).setInteractive({ useHandCursor: true });

        managerButton.on('pointerdown', () => {
            this.managerPanel.setVisible(!this.managerPanel.visible);
            if (this.managerPanel.visible) {
                this.updateManagerPanel();
            }
        });
    }

    createManagerPanel() {
        this.managerPanel = this.add.container(this.scale.width / 2, this.scale.height / 2).setVisible(false);
        const panelWidth = this.scale.width * 0.9;
        const panelHeight = this.scale.height * 0.8;

        const background = this.add.graphics();
        background.fillStyle(0x1a1a1a, 0.95);
        background.lineStyle(2, 0xffd700);
        background.fillRect(-panelWidth / 2, -panelHeight / 2, panelWidth, panelHeight);
        background.strokeRect(-panelWidth / 2, -panelHeight / 2, panelWidth, panelHeight);
        this.managerPanel.add(background);

        const title = this.add.text(0, -panelHeight / 2 + 30, 'Hire a Family Member', { fontSize: '28px', fill: '#ffd700' }).setOrigin(0.5);
        this.managerPanel.add(title);
        
        // --- Scrolling Logic ---
        this.managerListContainer = this.add.container(0, -panelHeight / 2 + 80);
        this.managerPanel.add(this.managerListContainer);
        
        const maskShape = this.make.graphics();
        maskShape.fillStyle(0xffffff);
        maskShape.beginPath();
        maskShape.fillRect(this.managerPanel.x - panelWidth / 2, this.managerPanel.y - panelHeight / 2 + 60, panelWidth, panelHeight - 80);
        const mask = maskShape.createGeometryMask();
        this.managerListContainer.setMask(mask);
        
        const scrollZone = this.add.zone(0, 0, panelWidth, panelHeight).setOrigin(0.5).setInteractive();
        scrollZone.on('pointermove', (pointer) => {
            if (pointer.isDown) {
                this.managerListContainer.y += pointer.velocity.y / 10;
                const listHeight = Object.keys(managerData).length * 65;
                const minY = -panelHeight/2 + 80;
                this.managerListContainer.y = Phaser.Math.Clamp(this.managerListContainer.y, minY - listHeight + panelHeight - 100, minY);
            }
        });
        this.managerPanel.add(scrollZone);
    }

    updateManagerPanel() {
        this.managerListContainer.removeAll(true);
        const panelWidth = this.scale.width * 0.9;
        let yPos = 0;

        Object.keys(managerData).forEach(id => {
            const manager = managerData[id];
            const business = businessData[id];
            const hasManager = gameState.businesses[id].hasManager;
            const canAfford = gameState.balance.gte(manager.cost);

            const managerRow = this.add.container(0, yPos);

            const nameText = this.add.text(-panelWidth * 0.45, 0, `${manager.name}\nRuns the ${business.name}`, { fontSize: '18px', fill: '#FFF', lineSpacing: 4 }).setOrigin(0, 0.5);
            managerRow.add(nameText);
            
            const hireButtonContainer = this.add.container(panelWidth * 0.35, 0);

            if (hasManager) {
                const hiredText = this.add.text(0, 0, 'HIRED', { fontSize: '20px', fill: '#00ff00', fontStyle: 'bold' }).setOrigin(0.5);
                hireButtonContainer.add(hiredText);
            } else {
                const hireButton = this.add.graphics();
                hireButton.fillStyle(canAfford ? 0x008000 : 0x808080, 1); // Green or Gray
                hireButton.fillRoundedRect(-50, -25, 100, 50, 10);
                hireButtonContainer.add(hireButton);

                const hireText = this.add.text(0, -10, 'HIRE', { fontSize: '20px', fill: '#FFF' }).setOrigin(0.5);
                const costText = this.add.text(0, 10, `$${formatNumber(manager.cost)}`, { fontSize: '14px', fill: '#FFF' }).setOrigin(0.5);
                hireButtonContainer.add([hireText, costText]);

                if (canAfford) {
                    const hireZone = this.add.zone(-50, -25, 100, 50).setOrigin(0).setInteractive({ useHandCursor: true });
                    hireZone.on('pointerdown', () => gameState.buyManager(id));
                    hireButtonContainer.add(hireZone);
                }
            }
            managerRow.add(hireButtonContainer);
            this.managerListContainer.add(managerRow);
            yPos += 65;
        });
    }
}