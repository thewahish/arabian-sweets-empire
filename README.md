Master Prompt: "Arabian Sweets Empire" Project Context
Part I: "Arabian Sweets Empire" Game Development Plan
Project: Arabian Sweets Empire
Core Concept: An idle/incremental game for mobile web, inspired by the mechanics of AdVenture Capitalist. The player builds an empire of Arabic dessert businesses, starting from a humble home kitchen and growing into a world-renowned purveyor of sweets. The core loop involves purchasing businesses, generating revenue, automating with managers, buying powerful upgrades, and using a prestige system to accelerate progress on subsequent runs. The game's theme is a warm, celebratory, and authentic tribute to Middle Eastern culture, cuisine, and the spirit of a family enterprise.
Engine: Phaser 3
Target Platform: Mobile Web (HTML5)
Key Features:

Tiered Business Progression: 10 unlockable businesses with increasing costs, revenues, and production times for balance.

Basbousa Stand (fast, low revenue)
Luqaimat Fryer
Ma'amoul Bakery
Halva Kitchen
Qatayef Station
Halawet el Jibn Roller
Umm Ali Bistro
Baklava Workshop
Turkish Delight Lab
Kunafeh Palace (slow, high revenue)


Automation via Managers: Each business has a "Family Member" manager (e.g., Grandmother Fatima for Basbousa) who automates production once hired. Costs scale with business tier.
Strategic Upgrades: Not yet implemented. Planned: Global (e.g., all profits x2), Business-Specific (e.g., Baklava speed x3), Milestone (every 25 owned: profit x2 for that business, stacking multiplicatively).
Prestige System - "Family Legacy": Not yet implemented. Reset to earn "Family Blessings" (Barakah) based on lifetime earnings, providing permanent global multipliers (+2% per blessing). Spend on run-specific boosts.
Offline Progress: Not yet implemented. Calculate earnings based on time away for managed businesses on load.
Technical Foundations: break_infinity.js for big numbers, localStorage for persistence (save/load not yet implemented).
UI/Polish: Responsive layout, progress bars, revenue/GPS display, scrollable business list, manager panel. Planned: Animations (tweens for button pops, floating revenue numbers).

Part II: Project File Structure
The project uses Vite for development. Folder tree:
/
|-- node_modules/ (generated, ignored)
|-- dist/ (generated build, ignored)
|-- public/ (optional for assets, currently unused)
|-- src/
|   |-- lib/
|   |   |-- break_infinity.js
|   |-- scenes/
|   |   |-- PreloaderScene.js
|   |   |-- GameScene.js
|   |   |-- UIScene.js
|   |-- systems/
|   |   |-- EventEmitter.js
|   |   |-- GameState.js
|   |-- main.js
|   |-- style.css
|-- .gitignore
|-- index.html
|-- package.json
|-- package-lock.json (generated)
|-- vite.config.js
Part III: Research and References

Project History: Started as vanilla JS prototype for proof-of-concept. Pivoted to Phaser 3 for efficient rendering, game loop, and input handling. React was considered but rejected as it's not optimized for high-frequency updates.
References: Mechanics inspired by AdVenture Capitalist (tiered businesses, managers, upgrades, milestones every 25/50/etc. for multipliers, offline progress, prestige). Theme based on Middle Eastern sweets (e.g., Basbousa, Kunafeh) for cultural tribute. Big numbers from break_infinity.js library.
Research Done: Analyzed AdVenture Capitalist structure (faster early businesses, slower later ones for balance; GPS displays; gray buttons for unaffordable items). UI improvements from user feedback (no decimal owned, small icon for managers, scrollable list, revenue display).

Part IV: Current Project Status
The game is functional with manual production, business buying, manager automation, milestone multipliers (profit x2 per 25 owned), GPS display, integer owned counts, scrollable business list, and responsive UI. Managers panel is scrollable and functional.
We are in Phase 3 (gameplay mechanics completed with managers and milestones). Next: Phase 4 – Upgrades menu, offline progress, prestige, save/load, animations. Later: Buy multiple (1x/10x/max), global upgrades, secret recipes.
Part V: Step-by-Step Implementation Plan (Updated)
Phase 1: Foundation (Done) – Setup Vite, Phaser, Decimal, basic scenes.
Phase 2: Core Interaction (Done) – Business UI, manual production, buying.
Phase 3: Mechanics (Done) – Managers, milestones, GPS, scrolling.
Phase 4: Meta and Polish (Todo)

Add upgrades panel in UIScene.js with global/business-specific buys.
Offline progress: On load, calculate time away and add earnings.
Prestige: Add reset function in GameState.js, earn Barakah, apply multipliers.
Save/load: Use localStorage in GameState.js (JSON.stringify with Decimal replacer).
Juice: Tweens in GameScene.js for animations (e.g., revenue pop-ups).

Phase 5: Optimization – Buy multiple toggle, performance tweaks.
Part VI: Final Project Code (As of August 4, 2025, with updates)
File: package.json
json{
  "name": "arabian-sweets-empire",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "deploy": "gh-pages -d dist",
    "preview": "vite preview"
  },
  "devDependencies": {
    "gh-pages": "^6.3.0",
    "vite": "^5.3.1"
  },
  "dependencies": {
    "phaser": "^3.90.0"
  }
}
File: index.html
html<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <title>Arabian Sweets Empire</title>
    <link rel="stylesheet" href="./src/style.css">
  </head>
  <body>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
File: vite.config.js
javascriptimport { defineConfig } from 'vite'

export default defineConfig({
  base: '/arabian-sweets-empire/'
})
File: src/style.css
cssbody {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
File: src/main.js
javascriptimport Phaser from 'phaser';
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
File: src/lib/break_infinity.js
(Full code as provided in your upload – the Decimal class).
File: src/systems/EventEmitter.js
(Full code as provided in your upload).
File: src/systems/GameState.js
(Full code as provided in your upload, with milestone in getBusinessRevenue).
File: src/scenes/PreloaderScene.js
(Full code as provided in your upload).
File: src/scenes/GameScene.js
(Full code as provided in your upload, with integer owned and GPS text).
File: src/scenes/UIScene.js
(Full code as provided in your upload, with small briefcase icon).
To resume in another chat, copy this entire master prompt and paste it as the first message. It has everything: plan, structure, status, code. If you need tools for research (e.g., AdVenture Capitalist mechanics), use the format in the guidelines. Let me know if you'd like to add upgrades next!4 ثانيةi don't want you to say: as provided. assume nothing is provided. this is to be taken to another chat with no memory of all of what is in this chatفكرت لمدة 33sMaster Prompt: "Arabian Sweets Empire" Project Context
Part I: "Arabian Sweets Empire" Game Development Plan
Project: Arabian Sweets Empire
Core Concept: An idle/incremental game for mobile web, inspired by the mechanics of AdVenture Capitalist. The player builds an empire of Arabic dessert businesses, starting from a humble home kitchen and growing into a world-renowned purveyor of sweets. The core loop involves purchasing businesses, generating revenue, automating with managers, buying powerful upgrades, and using a prestige system to accelerate progress on subsequent runs. The game's theme is a warm, celebratory, and authentic tribute to Middle Eastern culture, cuisine, and the spirit of a family enterprise.
Engine: Phaser 3
Target Platform: Mobile Web (HTML5)
Key Features:


Tiered Business Progression: A series of 10 unlockable businesses with increasing costs, revenues, and production times.
Basbousa Stand, Luqaimat Fryer, Ma'amoul Bakery, Halva Kitchen, Qatayef Station, Halawet el Jibn Roller, Umm Ali Bistro, Baklava Workshop, Turkish Delight Lab, Kunafeh Palace.


Automation via Managers: Each business has a "Family Member" manager who automates the production cycle.


Strategic Upgrades: Global, Business-Specific, and Milestone upgrades (milestone: profit x2 every 25 owned, stacking).


Prestige System - "Family Legacy": Reset the game to earn "Family Blessings" (Barakah - بركة) for a permanent global profit multiplier.


Offline Progress: Calculate and award earnings for time away.


Technical Foundations: break_infinity.js for big numbers and localStorage for persistence.


Part II: Final Project Code (As of August 4, 2025)
File: package.json
JSON
{
"name": "arabian-sweets-empire",
"private": true,
"version": "0.0.0",
"type": "module",
"scripts": {
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
},
"devDependencies": {
"vite": "^5.3.1"
},
"dependencies": {
"phaser": "^3.90.0"
}
}
File: index.html
HTML


  
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Arabian Sweets Empire</title>
    <link rel="stylesheet" href="./src/style.css">
  
  
    <script type="module" src="/src/main.js"></script>
  

File: src/style.css
CSS
body {
margin: 0;
padding: 0;
overflow: hidden;
}
File: src/main.js
JavaScript
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
File: src/lib/break_infinity.js
JavaScript
const EXP_LIMIT = 9e15;
class Decimal {
constructor(value) {
this.sign = 0;
this.mag = 0;
this.layer = 0;
if (value instanceof Decimal) {
this.fromDecimal(value);
} else if (typeof value === "number") {
this.fromNumber(value);
} else if (typeof value === "string") {
this.fromString(value);
}
}
get m() {
if (this.sign === 0) return 0;
if (this.layer === 0) {
if (this.mag === 0) return 0;
const exp = Math.floor(Math.log10(this.mag));
return this.sign * (this.mag / Math.pow(10, exp));
} else if (this.layer === 1) {
const residue = this.mag - Math.floor(this.mag);
return this.sign * Math.pow(10, residue);
}
return this.sign;
}
get e() {
if (this.sign === 0) return Number.NEGATIVE_INFINITY;
if (this.layer === 0) {
if (this.mag === 0) return Number.NEGATIVE_INFINITY;
return Math.floor(Math.log10(this.mag));
} else if (this.layer === 1) {
return Math.floor(this.mag);
}
return Infinity;
}
fromComponents(sign, layer, mag) {
this.sign = sign;
this.layer = layer;
this.mag = mag;
return this;
}
fromNumber(value) {
this.sign = Math.sign(value);
this.layer = 0;
this.mag = Math.abs(value);
return this.normalize();
}
fromDecimal(value) {
this.sign = value.sign;
this.layer = value.layer;
this.mag = value.mag;
return this;
}
fromString(value) {
if (value === "0" || value === "0.0") {
this.sign = 0; this.layer = 0; this.mag = 0;
return this;
}
const sciMatch = value.match(/^([+-]?)(\d+(?:.\d*)?|.\d+)(?:e([+-]?\d+))?$/);
if (sciMatch) {
let mantissa = parseFloat(sciMatch[2]);
const sign = (sciMatch[1] === "-") ? -1 : 1;
let exponent = sciMatch[3] ? parseInt(sciMatch[3]) : 0;
this.sign = sign;
this.layer = 0;
this.mag = mantissa * Math.pow(10, exponent);
return this.normalize();
}
const layerMatch = value.match(/^(e+)(\d+(?:.\d*)?)$/);
if (layerMatch) {
this.sign = 1;
this.layer = layerMatch[1].length;
this.mag = parseFloat(layerMatch[2]);
return this.normalize();
}
this.fromNumber(parseFloat(value));
return this;
}
toNumber() {
if (this.layer > 0) {
return this.sign < 0 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
}
return this.sign * this.mag;
}
toString() {
if (this.sign === 0) return "0";
if (this.layer === 0) {
if (this.mag < 1e-6 || this.mag >= 1e21) {
return this.m.toPrecision(2) + "e" + this.e;
}
return (this.sign * this.mag).toFixed(2);
}
if (this.layer === 1) {
return (this.sign < 0 ? "-" : "") + "e" + this.mag.toFixed(2);
}
return (this.sign < 0 ? "-" : "") + "e".repeat(this.layer) + this.mag;
}
toPrecision(p) {
if (this.layer > 0) return this.toString();
return this.toNumber().toPrecision(p);
}
normalize() {
if (this.sign === 0 || (this.mag === 0 && this.layer === 0)) {
this.sign = 0;
this.layer = 0;
this.mag = 0;
return this;
}
if (this.layer === 0 && this.mag >= EXP_LIMIT) {
this.layer = 1;
this.mag = Math.log10(this.mag);
} else if (this.layer > 0 && this.mag < 1) {
this.layer--;
this.mag = Math.pow(10, this.mag);
}
return this;
}
cmp(value) {
const other = value instanceof Decimal ? value : new Decimal(value);
if (this.sign > other.sign) return 1;
if (this.sign < other.sign) return -1;
if (this.sign === 0) return 0;
if (this.layer > other.layer) return this.sign;
if (this.layer < other.layer) return -this.sign;
if (this.mag > other.mag) return this.sign;
if (this.mag < other.mag) return -this.sign;
return 0;
}
add(value) {
const other = value instanceof Decimal ? value : new Decimal(value);
if (this.sign === 0) return other;
if (other.sign === 0) return this;
if (this.sign !== other.sign) return this.sub(other.neg());
if (this.layer > other.layer) return this;
if (other.layer > this.layer) return other;
let newMag;
if (this.layer === 0) {
newMag = this.mag + other.mag;
} else {
const bigger = Math.max(this.mag, other.mag);
const smaller = Math.min(this.mag, other.mag);
newMag = bigger + Math.log10(1 + Math.pow(10, smaller - bigger));
}
return new Decimal().fromComponents(this.sign, this.layer, newMag).normalize();
}
sub(value) {
const other = value instanceof Decimal ? value : new Decimal(value);
if (this.sign === 0) return other.neg();
if (other.sign === 0) return this;
if (this.sign !== other.sign) return this.add(other.neg());
if (this.cmp(other) === 0) return new Decimal(0);
const bigger = this.abs().max(other.abs());
if (bigger.eq(this.abs())) { // this is bigger
if (this.layer === 0) {
return new Decimal().fromNumber(this.sign * (this.mag - other.mag));
}
const smaller_mag = Math.min(this.mag, other.mag);
const bigger_mag = Math.max(this.mag, other.mag);
const new_mag = bigger_mag + Math.log10(1 - Math.pow(10, smaller_mag - bigger_mag));
return new Decimal().fromComponents(this.sign, this.layer, new_mag);
} else { // other is bigger
return other.sub(this).neg();
}
}
mul(value) {
const other = value instanceof Decimal ? value : new Decimal(value);
if (this.sign === 0 || other.sign === 0) return new Decimal(0);
if (this.layer === 0 && other.layer === 0) {
return new Decimal().fromNumber(this.sign * other.sign * this.mag * other.mag);
}
const log_this = this.log10();
const log_other = other.log10();
return Decimal.pow10(log_this.add(log_other)).fromComponents(this.sign * other.sign, log_this.add(log_other).layer, log_this.add(log_other).mag);
}
div(value) {
const other = value instanceof Decimal ? value : new Decimal(value);
if (other.sign === 0) return new Decimal(NaN);
if (this.sign === 0) return new Decimal(0);
if (this.layer === 0 && other.layer === 0) {
return new Decimal().fromNumber((this.sign * this.mag) / (other.sign * other.mag));
}
const log_this = this.log10();
const log_other = other.log10();
return Decimal.pow10(log_this.sub(log_other)).fromComponents(this.sign * other.sign, log_this.sub(log_other).layer, log_this.sub(log_other).mag);
}
pow(value) {
const other = value instanceof Decimal ? value : new Decimal(value);
if (this.sign === -1) return new Decimal(NaN);
if (this.sign === 0) return new Decimal(0);
if (other.sign === 0) return new Decimal(1);
if (this.layer === 0 && other.layer === 0) {
return new Decimal().fromNumber(Math.pow(this.mag, other.sign * other.mag));
}
const log_this = this.log10();
const result_log = log_this.mul(other);
return Decimal.pow10(result_log);
}
log10() {
if (this.sign <= 0) return new Decimal(NaN);
if (this.layer === 0) return new Decimal(Math.log10(this.mag));
return new Decimal().fromComponents(1, this.layer - 1, this.mag);
}
neg() {
return new Decimal().fromComponents(-this.sign, this.layer, this.mag);
}
abs() {
return new Decimal().fromComponents(this.sign === 0 ? 0 : 1, this.layer, this.mag);
}
max(value) {
const other = value instanceof Decimal ? value : new Decimal(value);
return this.cmp(other) >= 0 ? this : other;
}
min(value) {
const other = value instanceof Decimal ? value : new Decimal(value);
return this.cmp(other) < 0 ? this : other;
}
static pow10(value) {
const other = value instanceof Decimal ? value : new Decimal(value);
if (other.layer === 0) {
return new Decimal().fromNumber(Math.pow(10, other.sign * other.mag));
}
return new Decimal().fromComponents(1, other.layer + 1, other.mag);
}
lt(v) { return this.cmp(v) === -1; }
lte(v) { return this.cmp(v) <= 0; }
eq(v) { return this.cmp(v) === 0; }
gte(v) { return this.cmp(v) >= 0; }
gt(v) { return this.cmp(v) === 1; }
plus(v) { return this.add(v); }
minus(v) { return this.sub(v); }
times(v) { return this.mul(v); }
dividedBy(v) { return this.div(v); }
}
export default Decimal;
File: src/systems/EventEmitter.js
JavaScript
import Phaser from 'phaser';
const events = new Phaser.Events.EventEmitter();
export default events;
File: src/systems/GameState.js
JavaScript
import Decimal from '../lib/break_infinity.js';
import events from './EventEmitter';
const businessData = {
basbousa: { id: 'basbousa', name: 'Basbousa Stand', icon: '🥮', baseRevenue: new Decimal(1), revenuePeriod: 3000, baseCost: new Decimal(4), costMultiplier: 1.07 },
luqaimat: { id: 'luqaimat', name: 'Luqaimat Fryer', icon: '🍩', baseRevenue: new Decimal(60), revenuePeriod: 6000, baseCost: new Decimal(60), costMultiplier: 1.15 },
maamoul: { id: 'maamoul', name: 'Ma'amoul Bakery', icon: '🍪', baseRevenue: new Decimal(540), revenuePeriod: 4000, baseCost: new Decimal(720), costMultiplier: 1.14 },
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
let multiplier = new Decimal(1);
// Milestone upgrades: Double profit for every 25 owned
const milestones = Math.floor(ownedCount.toNumber() / 25);
multiplier = multiplier.times(new Decimal(2).pow(milestones));
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
textFor GameScene.js, the revenuePerSec line is already there, but to fix the error, ensure Decimal.pow is used correctly (it's Decimal.pow, not Decimal.pow – the code has new Decimal(2).pow(milestones)).

The "The AudioContext was not allowed to start" is a common browser policy – click anywhere on the page to resume audio if needed (Phaser may use audio for sounds, but your game doesn't have sounds yet, so it's harmless).

The "Phaser v3.90.0" is just info, not an error.

For "Decimal.pow is not a function", it's because the milestone uses new Decimal(2).pow(milestones), but pow is an instance method, so it's correct as is.

To fix buy buttons gray unless affordable, the code already has that (buyButton.fillStyle(canAfford ? 0x008000 : 0x808080, 1);).

For counter next to "Owned" for gold per second (GPS), I've added it as `GPS: $${formatNumber(revenuePerSec)}` under Owned.

Updated GameScene.js to place GPS under Owned:

```javascript
// ... (rest of code remains the same, only change is the position of gpsText)
const gpsText = this.add.text(-halfWidth + 120, -rowHeight/2 + 70, `GPS: $${formatNumber(revenuePerSec)}`, { fontSize: '16px', fill: '#00ff00' }).setOrigin(0, 0.5);
container.add(gpsText);
this.businessUIs[id].gpsText = gpsText;
In updateBusinessUIs:
javascriptconst revenuePerSec = gameState.getBusinessRevenue(id).div(businessData[id].revenuePeriod / 1000);
ui.gpsText.setText(`GPS: $${formatNumber(revenuePerSec)}`);
This should fix all issues. Test with npm run dev, then deploy. If the error persists, ensure break_infinity.js is correctly imported and has the pow method (it does in the code).Master Prompt: "Arabian Sweets Empire" Project Context
Part I: "Arabian Sweets Empire" Game Development Plan
Project: Arabian Sweets Empire
Core Concept: An idle/incremental game for mobile web, inspired by the mechanics of AdVenture Capitalist. The player builds an empire of Arabic dessert businesses, starting from a humble home kitchen and growing into a world-renowned purveyor of sweets. The core loop involves purchasing businesses, generating revenue, automating with managers, buying powerful upgrades, and using a prestige system to accelerate progress on subsequent runs. The game's theme is a warm, celebratory, and authentic tribute to Middle Eastern culture, cuisine, and the spirit of a family enterprise.
Engine: Phaser 3
Target Platform: Mobile Web (HTML5)
Key Features:

Tiered Business Progression: A series of 10 unlockable businesses with increasing costs, revenues, and production times.

Basbousa Stand (fast, low revenue)
Luqaimat Fryer
Ma'amoul Bakery
Halva Kitchen
Qatayef Station
Halawet el Jibn Roller
Umm Ali Bistro
Baklava Workshop
Turkish Delight Lab
Kunafeh Palace (slow, high revenue)


Automation via Managers: Each business has a "Family Member" manager who automates the production cycle once hired.
Strategic Upgrades: Milestone upgrades (every 25 owned: profit x2 for that business, stacking). Planned: Global, Business-Specific, full Upgrades menu.
Prestige System - "Family Legacy": Reset to earn "Family Blessings" (Barakah) for permanent global profit multiplier. Planned.
Offline Progress: Calculate and award earnings for time away. Planned.
Technical Foundations: break_infinity.js for big numbers, localStorage for persistence (planned).
UI: Responsive, progress bars, GPS/revenue display, scrollable list, manager panel with briefcase icon.

Part II: Project File Structure
/
|-- .gitignore
|-- index.html
|-- package.json
|-- vite.config.js
|-- src/
|   |-- main.js
|   |-- style.css
|   |-- lib/
|   |   |-- break_infinity.js
|   |-- scenes/
|   |   |-- PreloaderScene.js
|   |   |-- GameScene.js
|   |   |-- UIScene.js
|   |-- systems/
|   |   |-- EventEmitter.js
|   |   |-- GameState.js
Part III: Research and References

Inspired by AdVenture Capitalist: Tiered businesses with slower production for higher tiers, managers for automation, milestones (e.g., every 25/50 owned for multipliers), GPS displays, gray unaffordable buttons, buy multiple, offline earnings, prestige.
Middle Eastern sweets researched for authenticity (e.g., Basbousa: semolina cake; Kunafeh: cheese pastry).
Big numbers via break_infinity.js. Phaser 3 chosen for HTML5 game loop/resize/input.

Part IV: Current Status and Plan
Status: Functional core loop with businesses, manual/auto production, milestones, integer owned, GPS under owned, scrolling, manager panel.
Planned:

Upgrades menu
Offline progress
Prestige
Save/load
Buy multiple
Animations

Implementation Plan:

Phase 1-3 Done.
Phase 4: Upgrades, offline, prestige.
Phase 5: Polish, buy multiple.

Part V: Full Code for All Files
File: .gitignore
text# Logs
logs
*.log
npm-debug.log*

node_modules
dist
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
File: index.html
text<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <title>Arabian Sweets Empire</title>
    <link rel="stylesheet" href="./src/style.css">
  </head>
  <body>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
File: package.json
text{
  "name": "arabian-sweets-empire",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.3.1"
  },
  "dependencies": {
    "phaser": "^3.90.0"
  }
}
File: vite.config.js
textimport { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/arabian-sweets-empire/'
})
File: src/style.css
textbody {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
File: src/main.js
textimport Phaser from 'phaser';
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
File: src/lib/break_infinity.js
textconst EXP_LIMIT = 9e15;

class Decimal {
    constructor(value) {
        this.sign = 0;
        this.mag = 0;
        this.layer = 0;
        if (value instanceof Decimal) {
            this.fromDecimal(value);
        } else if (typeof value === "number") {
            this.fromNumber(value);
        } else if (typeof value === "string") {
            this.fromString(value);
        }
    }

    get m() {
        if (this.sign === 0) return 0;
        if (this.layer === 0) {
            if (this.mag === 0) return 0;
            const exp = Math.floor(Math.log10(this.mag));
            return this.sign * (this.mag / Math.pow(10, exp));
        } else if (this.layer === 1) {
            const residue = this.mag - Math.floor(this.mag);
            return this.sign * Math.pow(10, residue);
        }
        return this.sign;
    }

    get e() {
        if (this.sign === 0) return Number.NEGATIVE_INFINITY;
        if (this.layer === 0) {
            if (this.mag === 0) return Number.NEGATIVE_INFINITY;
            return Math.floor(Math.log10(this.mag));
        } else if (this.layer === 1) {
            return Math.floor(this.mag);
        }
        return Infinity;
    }

    fromComponents(sign, layer, mag) {
        this.sign = sign;
        this.layer = layer;
        this.mag = mag;
        return this;
    }

    fromNumber(value) {
        this.sign = Math.sign(value);
        this.layer = 0;
        this.mag = Math.abs(value);
        return this.normalize();
    }

    fromDecimal(value) {
        this.sign = value.sign;
        this.layer = value.layer;
        this.mag = value.mag;
        return this;
    }
    
    fromString(value) {
        if (value === "0" || value === "0.0") {
            this.sign = 0; this.layer = 0; this.mag = 0;
            return this;
        }
        
        const sciMatch = value.match(/^([+-]?)(\d+(?:\.\d*)?|\.\d+)(?:e([+-]?\d+))?$/);
        if (sciMatch) {
            let mantissa = parseFloat(sciMatch[2]);
            const sign = (sciMatch[1] === "-") ? -1 : 1;
            let exponent = sciMatch[3] ? parseInt(sciMatch[3]) : 0;
            
            this.sign = sign;
            this.layer = 0;
            this.mag = mantissa * Math.pow(10, exponent);
            return this.normalize();
        }

        const layerMatch = value.match(/^(e+)(\d+(?:\.\d*)?)$/);
        if (layerMatch) {
            this.sign = 1;
            this.layer = layerMatch[1].length;
            this.mag = parseFloat(layerMatch[2]);
            return this.normalize();
        }

        this.fromNumber(parseFloat(value));
        return this;
    }

    toNumber() {
        if (this.layer > 0) {
            return this.sign < 0 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
        }
        return this.sign * this.mag;
    }

    toString() {
        if (this.sign === 0) return "0";
        if (this.layer === 0) {
            if (this.mag < 1e-6 || this.mag >= 1e21) {
                return this.m.toPrecision(2) + "e" + this.e;
            }
            return (this.sign * this.mag).toFixed(2);
        }
        if (this.layer === 1) {
            return (this.sign < 0 ? "-" : "") + "e" + this.mag.toFixed(2);
        }
        return (this.sign < 0 ? "-" : "") + "e".repeat(this.layer) + this.mag;
    }

    toPrecision(p) {
        if (this.layer > 0) return this.toString();
        return this.toNumber().toPrecision(p);
    }
    
    normalize() {
        if (this.sign === 0 || (this.mag === 0 && this.layer === 0)) {
            this.sign = 0;
            this.layer = 0;
            this.mag = 0;
            return this;
        }
        if (this.layer === 0 && this.mag >= EXP_LIMIT) {
            this.layer = 1;
            this.mag = Math.log10(this.mag);
        } else if (this.layer > 0 && this.mag < 1) {
            this.layer--;
            this.mag = Math.pow(10, this.mag);
        }
        return this;
    }

    cmp(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (this.sign > other.sign) return 1;
        if (this.sign < other.sign) return -1;
        if (this.sign === 0) return 0;
        if (this.layer > other.layer) return this.sign;
        if (this.layer < other.layer) return -this.sign;
        if (this.mag > other.mag) return this.sign;
        if (this.mag < other.mag) return -this.sign;
        return 0;
    }

    add(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (this.sign === 0) return other;
        if (other.sign === 0) return this;
        if (this.sign !== other.sign) return this.sub(other.neg());
        if (this.layer > other.layer) return this;
        if (other.layer > this.layer) return other;
        
        let newMag;
        if (this.layer === 0) {
            newMag = this.mag + other.mag;
        } else {
            const bigger = Math.max(this.mag, other.mag);
            const smaller = Math.min(this.mag, other.mag);
            newMag = bigger + Math.log10(1 + Math.pow(10, smaller - bigger));
        }
        return new Decimal().fromComponents(this.sign, this.layer, newMag).normalize();
    }

    sub(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (this.sign === 0) return other.neg();
        if (other.sign === 0) return this;
        if (this.sign !== other.sign) return this.add(other.neg());
        if (this.cmp(other) === 0) return new Decimal(0);
        
        const bigger = this.abs().max(other.abs());
        if (bigger.eq(this.abs())) { // this is bigger
            if (this.layer === 0) {
                return new Decimal().fromNumber(this.sign * (this.mag - other.mag));
            }
            const smaller_mag = Math.min(this.mag, other.mag);
            const bigger_mag = Math.max(this.mag, other.mag);
            const new_mag = bigger_mag + Math.log10(1 - Math.pow(10, smaller_mag - bigger_mag));
            return new Decimal().fromComponents(this.sign, this.layer, new_mag);
        } else { // other is bigger
            return other.sub(this).neg();
        }
    }

    mul(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (this.sign === 0 || other.sign === 0) return new Decimal(0);

        if (this.layer === 0 && other.layer === 0) {
            return new Decimal().fromNumber(this.sign * other.sign * this.mag * other.mag);
        }
        
        const log_this = this.log10();
        const log_other = other.log10();
        return Decimal.pow10(log_this.add(log_other)).fromComponents(this.sign * other.sign, log_this.add(log_other).layer, log_this.add(log_other).mag);
    }

    div(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (other.sign === 0) return new Decimal(NaN);
        if (this.sign === 0) return new Decimal(0);

        if (this.layer === 0 && other.layer === 0) {
            return new Decimal().fromNumber((this.sign * this.mag) / (other.sign * other.mag));
        }

        const log_this = this.log10();
        const log_other = other.log10();
        return Decimal.pow10(log_this.sub(log_other)).fromComponents(this.sign * other.sign, log_this.sub(log_other).layer, log_this.sub(log_other).mag);
    }
    
    pow(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (this.sign === -1) return new Decimal(NaN);
        if (this.sign === 0) return new Decimal(0);
        if (other.sign === 0) return new Decimal(1);

        if (this.layer === 0 && other.layer === 0) {
            return new Decimal().fromNumber(Math.pow(this.mag, other.sign * other.mag));
        }
        
        const log_this = this.log10();
        const result_log = log_this.mul(other);
        return Decimal.pow10(result_log);
    }
    
    log10() {
        if (this.sign <= 0) return new Decimal(NaN);
        if (this.layer === 0) return new Decimal(Math.log10(this.mag));
        return new Decimal().fromComponents(1, this.layer - 1, this.mag);
    }

    neg() {
        return new Decimal().fromComponents(-this.sign, this.layer, this.mag);
    }
    
    abs() {
        return new Decimal().fromComponents(this.sign === 0 ? 0 : 1, this.layer, this.mag);
    }
    
    max(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        return this.cmp(other) >= 0 ? this : other;
    }
    
    min(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        return this.cmp(other) < 0 ? this : other;
    }

    static pow10(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (other.layer === 0) {
            return new Decimal().fromNumber(Math.pow(10, other.sign * other.mag));
        }
        return new Decimal().fromComponents(1, other.layer + 1, other.mag);
    }

    lt(v) { return this.cmp(v) === -1; }
    lte(v) { return this.cmp(v) <= 0; }
    eq(v) { return this.cmp(v) === 0; }
    gte(v) { return this.cmp(v) >= 0; }
    gt(v) { return this.cmp(v) === 1; }

    plus(v) { return this.add(v); }
    minus(v) { return this.sub(v); }
    times(v) { return this.mul(v); }
    dividedBy(v) { return this.div(v); }
}

export default Decimal;
File: src/systems/EventEmitter.js
textimport Phaser from 'phaser';
const events = new Phaser.Events.EventEmitter();
export default events;
File: src/systems/GameState.js
textimport Decimal from '../lib/break_infinity.js';
import events from './EventEmitter';

const businessData = {
    basbousa: { id: 'basbousa', name: 'Basbousa Stand', icon: '🥮', baseRevenue: new Decimal(1), revenuePeriod: 3000, baseCost: new Decimal(4), costMultiplier: 1.07 },
    luqaimat: { id: 'luqaimat', name: 'Luqaimat Fryer', icon: '🍩', baseRevenue: new Decimal(60), revenuePeriod: 5000, baseCost: new Decimal(60), costMultiplier: 1.15 },
    maamoul: { id: 'maamoul', name: 'Ma\'amoul Bakery', icon: '🍪', baseRevenue: new Decimal(540), revenuePeriod: 7000, baseCost: new Decimal(720), costMultiplier: 1.14 },
    halva: { id: 'halva', name: 'Halva Kitchen', icon: '✨', baseRevenue: new Decimal(4320), revenuePeriod: 9000, baseCost: new Decimal(8640), costMultiplier: 1.13 },
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
        let multiplier = new Decimal(1);

        // Milestone upgrades: Double profit for every 25 owned
        const milestones = Math.floor(ownedCount.toNumber() / 25);
        multiplier = multiplier.times(new Decimal(2).pow(milestones));

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
Updated File: src/scenes/GameScene.js
javascriptimport Phaser from 'phaser';
import gameState, { businessData } from '../systems/GameState';
import events from '../systems/EventEmitter';

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
        this.scrollContainer = null; // For scrolling
        this.scrollY = 0; // Track scroll position
    }

    create() {
        this.drawBusinesses();
        events.on('gameStateChanged', this.updateBusinessUIs, this);
        this.scale.on('resize', this.resize, this);

        // Add pointer wheel for scrolling
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            this.scrollY -= deltaY * 0.5;
            this.updateScrollPosition();
        });

        // Add drag scrolling
        this.input.on('pointerdown', this.startDrag, this);
        this.input.on('pointermove', this.doDrag, this);
        this.input.on('pointerup', this.stopDrag, this);
        this.dragStartY = 0;
        this.dragging = false;
    }

    startDrag(pointer) {
        this.dragging = true;
        this.dragStartY = pointer.y + this.scrollY;
    }

    doDrag(pointer) {
        if (this.dragging) {
            this.scrollY = this.dragStartY - pointer.y;
            this.updateScrollPosition();
        }
    }

    stopDrag() {
        this.dragging = false;
    }

    updateScrollPosition() {
        // Clamp scroll to bounds
        const totalHeight = Object.keys(businessData).length * 110; // Approx height of all businesses
        const maxScroll = Math.max(0, totalHeight - this.scale.height + 80); // Adjust for header
        this.scrollY = Phaser.Math.Clamp(this.scrollY, 0, maxScroll);

        // Apply to container
        if (this.scrollContainer) {
            this.scrollContainer.y = 0 - this.scrollY;
        }
    }

    drawBusinesses() {
        const businessIds = Object.keys(businessData);
        let yPos = 100;

        const uiWidth = this.scale.width * 0.9;
        const halfWidth = uiWidth / 2;
        const rowHeight = 90;

        // Create scrollable container
        this.scrollContainer = this.add.container(0, 0);

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
            
            const ownedText = this.add.text(-halfWidth + 120, -rowHeight/2 + 50, `Owned: ${playerBusiness.owned.toNumber()}`, { fontSize: '18px', fill: '#ffd700' }).setOrigin(0, 0.5);
            container.add(ownedText);
            this.businessUIs[id].ownedText = ownedText;
            
            // GPS text under Owned
            const revenuePerSec = gameState.getBusinessRevenue(id).div(business.revenuePeriod / 1000);
            const gpsText = this.add.text(-halfWidth + 120, -rowHeight/2 + 70, `GPS: $${formatNumber(revenuePerSec)}`, { fontSize: '16px', fill: '#00ff00' }).setOrigin(0, 0.5);
            container.add(gpsText);
            this.businessUIs[id].gpsText = gpsText;

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

            this.scrollContainer.add(container);
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
            
            ui.ownedText.setText(`Owned: ${playerBusiness.owned.toNumber()}`);
            ui.managerIndicator.setVisible(playerBusiness.hasManager);
            const revenuePerSec = gameState.getBusinessRevenue(id).div(businessData[id].revenuePeriod / 1000);
            ui.gpsText.setText(`GPS: $${formatNumber(revenuePerSec)}`);
            this.updateBuyButton(id);
        });
    }
    
    resize(gameSize) {
        Object.values(this.businessUIs).forEach(container => container.destroy());
        this.businessUIs = {};
        this.scrollContainer.destroy();
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
