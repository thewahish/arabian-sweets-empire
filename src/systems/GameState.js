import Decimal from '../lib/break_infinity.js';
import events from './EventEmitter';

const businessData = {
    basbousa: { id: 'basbousa', name: 'Basbousa Stand', icon: '🥮', baseRevenue: new Decimal(1), revenuePeriod: 3000, baseCost: new Decimal(4), costMultiplier: 1.07 },
    luqaimat: { id: 'luqaimat', name: 'Luqaimat Fryer', icon: '🍩', baseRevenue: new Decimal(60), revenuePeriod: 6000, baseCost: new Decimal(60), costMultiplier: 1.15 },
    maamoul: { id: 'maamoul', name: 'Ma\'amoul Bakery', icon: '🍪', baseRevenue: new Decimal(540), revenuePeriod: 4000, baseCost: new Decimal(720), costMultiplier: 1.14 },
    halva: { id: 'halva', name: 'Halva Kitchen', icon: '✨', baseRevenue: new Decimal(4320), revenuePeriod: 8000, baseCost: new Decimal(8640), costMultiplier: 1.13 },
    qatayef: { id: 'qatayef', name: 'Qatayef Station', icon: '🥞', baseRevenue: new Decimal(51840), revenuePeriod: 12000, baseCost: new Decimal(103680), costMultiplier: 1.12 },
    halawet: { id: 'halawet', name: 'Halawet el Jibn Roller', icon: '🧀', baseRevenue: new Decimal(622080), revenuePeriod: 15000, baseCost: new Decimal(1244160), costMultiplier: 1.11 },
    ummali: { id: 'ummali', name: 'Umm Ali Bistro', icon: '🍮', baseRevenue: new Decimal(7464960), revenuePeriod: 20000, baseCost: new Decimal(14929920), costMultiplier: 1.10 },
    baklava: { id: 'baklava', name: 'Baklava Workshop', icon: '🍯', baseRevenue: new Decimal(89579520), revenuePeriod: 25000, baseCost: new Decimal(179159040), costMultiplier: 1.09 },
    turkishdelight: { id: 'turkishdelight', name: 'Turkish Delight Lab', icon: '🍬', baseRevenue: new Decimal(1074954240), revenuePeriod: 30000, baseCost: new Decimal(2149908480), costMultiplier: 1.08 },
    kunafeh: { id: 'kunafeh', name: 'Kunafeh Palace', icon: '🍰', baseRevenue: new Decimal(12899450880), revenuePeriod: 45000, baseCost: new Decimal(25798901760), costMultiplier: 1.07 }
};

const managerData = {
    basbousa: { name: 'Grandmother Fatima', cost: new Decimal(1000) },
    luqaimat: { name: 'Uncle Ahmed', cost: new Decimal(15000) },
    maamoul: { name: 'Auntie Layla', cost: new Decimal(100000) },
    halva: { name: 'Cousin Omar', cost: new Decimal(500000) },
    qatayef: { name: 'Sister Samira', cost: new Decimal(1.2e6) },
    halawet: { name: 'Brother Khalid', cost: new Decimal(1e7) },
    ummali: { name: 'Niece Jamila', cost: new Decimal(1.11e8) },
    baklava: { name: 'Nephew Tariq', cost: new Decimal(1.33e9) },
    turkishdelight: { name: 'Grandfather Yusuf', cost: new Decimal(1.6e10) },
    kunafeh: { name: 'The Master Chef', cost: new Decimal(2e11) }
};

class GameState {
    constructor() {
        this.balance = new Decimal(10);
        this.businesses = {};

        for (const id in businessData) {
            this.businesses[id] = {
                id: id,
                owned: new Decimal(0),
                producing: false,
                progress: 0,
                hasManager: false
            };
        }
        this.businesses.basbousa.owned = new Decimal(1);
    }

    getBusinessCost(businessId) {
        const businessInfo = businessData[businessId];
        const ownedCount = this.businesses[businessId].owned.toNumber();
        const multiplier = new Decimal(businessInfo.costMultiplier).pow(ownedCount);
        return businessInfo.baseCost.times(multiplier);
    }

    getBusinessRevenue(businessId) {
        const businessInfo = businessData[businessId];
        const ownedCount = this.businesses[businessId].owned;
        const multiplier = new Decimal(1);
        return businessInfo.baseRevenue.times(ownedCount).times(multiplier);
    }

    buyBusiness(businessId) {
        const cost = this.getBusinessCost(businessId);
        if (this.balance.gte(cost)) {
            this.balance = this.balance.minus(cost);
            this.businesses[businessId].owned = this.businesses[businessId].owned.plus(1);
            events.emit('gameStateChanged');
        }
    }

    buyManager(businessId) {
        if (!this.businesses[businessId].hasManager) {
            const cost = managerData[businessId].cost;
            if (this.balance.gte(cost)) {
                this.balance = this.balance.minus(cost);
                this.businesses[businessId].hasManager = true;
                events.emit('gameStateChanged');
            }
        }
    }

    startProduction(businessId) {
        const business = this.businesses[businessId];
        if (business.owned.gt(0) && !business.producing) {
            business.producing = true;
        }
    }

    collectRevenue(businessId) {
        const business = this.businesses[businessId];
        const revenue = this.getBusinessRevenue(businessId);
        this.balance = this.balance.add(revenue);
        
        business.producing = false;
        business.progress = 0;
        
        events.emit('gameStateChanged');
    }

    save() { console.log("Saving game..."); }
    load() { console.log("Loading game..."); }
}

const gameState = new GameState();
export default gameState;
export { businessData, managerData };