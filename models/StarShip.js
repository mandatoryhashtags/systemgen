//this is the model for a starship.
//it is used to create a starship object
const mongoose = require('mongoose');

//let ship = '';

const StarShip = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    class: {
        type: String,
        required: false
    },
    sizeSelected: {
        type: Number,
        required: false
    },
    HitDice: {
        type: String,
        required: false
    },
    shieldRegen: {
        type: String,
        required: false
    },
    faction: {
        type: String,
        required: false
    },
    sp: {
        type: String,
        required: false
    },
    sizeModifier: {
        type: Number,
        required: false
    },
    crewIncrement: {
        type: Number,
        required: false
    },
    turn: {
        type: Number,
        required: false
    },
    speed: {
        type: Number,
        required: false
    },
    baseAC: {
        type: Number,
        required: false
    },
    maxDex: {
        type: Number,
        required: false
    },
    upgradeSlots: {
        type: Number,
        required: false
    },
    structualIntegrity: {
        type: Number,
        required: false
    },
    hullPoints: {
        type: Number,
        required: false
    },
    shieldPoints: {
        type: Number,
        required: false
    },
    hardpoints: {
        type: Number,
        required: false
    },
    maxWeapons: {
        type: Number,
        required: false
    },
    crew: {
        type: Number,
        required: false
    },
    cargo: {
        type: Number,
        required: false
    },
    fuel: {
        type: Number,
        required: false
    },
    jump: {
        type: Number,
        required: false
    },
    maneuver: {
        type: Number,
        required: false
    },
    power: {
        type: Number,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    cost: {
        type: Number,
        required: false
    },
    stations: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    armor: {
        type: String,
        required: false
    },
    computer: {
        type: String,
        required: false
    },
    navBonus: {
        type: String,
        required: false
    },
    sensors: {
        type: Array,
        required: false
    },
    shields: {
        type: Array,
        required: false
    },
    jumpDrive: {
        type: Array,
        required: false
    },
    upgrades: {
        type: Array,
        required: false
    },
    operationsPowerUsed: {
        type: Number,
        required: false
    },
    jumpPowerUsed: {
        type: Number,
        required: false
    },
    combatPowerUsed: {
        type: Number,
        required: false
    },
    upgradePowerUsed: {
        type: Number,
        required: false
    },
    strength: {
        type: Number,
        required: false
    },
    strMod: {
        type: Number,
        required: false,
        default: function() {
            return utilityGetAttributeModifier(this.strength);
        }
    },
    dexterity: {
        type: Number,
        required: false
    },
    dexMod: {
        type: Number,
        required: false,
        default: function() {
            return utilityGetAttributeModifier(this.dexterity);
        }
    },
    constitution: {
        type: Number,
        required: false
    },
    conMod: {
        type: Number,
        required: false,
        default: function() {
            return utilityGetAttributeModifier(this.constitution);
        }
    },
    intelligence: {
        type: Number,
        required: false
    },
    intMod: {
        type: Number,
        required: false,
        default: function() {
            return utilityGetAttributeModifier(this.intelligence);
        }
    },
    wisdom: {
        type: Number,
        required: false
    },
    wisMod: {
        type: Number,
        required: false,
        default: function() {
            return utilityGetAttributeModifier(this.wisdom);
        }
    },
    charisma: {
        type: Number,
        required: false
    },
    chaMod: {
        type: Number,
        required: false,
        default: function() {
            return utilityGetAttributeModifier(this.charisma);
        }
    },
    weapons: {
        type: Array,
        required: false
    },
    size: {
        type: Number,
        required: false,
        default: function() {
            return populateSizeDetails(this, this.sizeSelected);
        }
    },
});

/**
 * | Class               | Grid  | SizeMod | CrewInc | Turn | Base AC | MaxDex | Upgrades    | HD           | Cost  | SI  | Hardpoints | Max Weapons | Stations                                               |
 * | ------------------- | ----- | ------- | ------- | ---- | ------- | ------ | ----------- | ------------ | ----- | --- | ---------- | ----------- | ------------------------------------------------------ |
 * | *Drones*            | .5x.5 | 1       | 0       | 0    | 5       | 10     | 0           | 6 (2d5)      | 3k    | 2   | 1          | 1           | None                                                   |
 * | *Small*             | 1x1   | 2       | 1       | 1    | .       | 10     | -1+ConMod   | .            | .     | .   | .          | 1           | .                                                      |
 * | Light Starfighter   | .     | .       | .       | .    | 7       | .      | .           | 8 (2d6)      | 6.5k  | 2   | 1          | .           | 1 Pilot, 1 co-pilot                                    |
 * | Light Shuttle       | .     | .       | .       | .    | 6       | .      | .           | 8 (2d6)      | 5.5k  | 2   | 1          | .           | 1 pilot, 1 co-pilot                                    |
 * | *Medium*            | 1x1   | 3       | 5       | 2    | .       | 10     | 3+ConMod    | .            | .     | .   | .          | 2           | .                                                      |
 * | Shuttle             | .     | .       | .       | .    | 8       | .      | .           | 10 (2d8)     | 8.5k  | 2   | 1          | .           | 1 gunner & 1 pilot(single) or 1 pilot, 1 co-pilot      |
 * | Starfighter         | .     | .       | .       | .    | 10      | .      | .           | 10 (2d8)     | 10k   | 2   | 2          | .           | 1 pilot (single) or 1 pilot & 1 gunner                 |
 * | Interceptor         | .     | .       | .       | .    | 9       | .      | .           | 15 (3d8)     | 14.5k | 3   | 3          | .           | 1 pilot (single) or 1 pilot, 1 co-pilot & 2 gunner     |
 * | *Large*             | 2x2   | 4       | 100     | 3    | .       | 10     | 3+2*ConMod  | .            | .     | .   | .          | 4           | .                                                      |
 * | Corvette            | .     | .       | .       | .    | 9       | .      | .           | 30 (3d10)    | 18k   | 3   | 4          | .           | 1 pilot, 1 technician, 2 gunner, 1 optional            |
 * | Gunship             | .     | .       | .       | .    | 10      | .      | .           | 40 (4d10)    | 22k   | 4   | 6          | .           | 1 pilot, 1 techician, 4 gunner                         |
 * | Heavy Freighter     | .     | .       | .       | .    | 10      | .      | .           | 60 (6d10)    | 30k   | 6   | 6          | .           | 1 pilot, 1 technician, 2 gunner, 1 optional            |
 * | *Huge*              | 3x3   | 5       | 150     | 4    | .       | 3      | 6+3*ConMod  | .            | .     | .   | .          | 6           | .                                                      |
 * | Heavy Gunship       | .     | .       | .       | .    | 13      | .      | .           | 112 (16d12)  | 250k  | 16  | 20         | .           | 1 Captain, 1 pilot, 1 technician, 6 gunner, 1 optional |
 * | Heavy Frigate       | .     | .       | .       | .    | 13      | .      | .           | 119 (17d12)  | 240k  | 17  | 16         | .           | 1 Captain, 1 pilot, 1 technician, 4 gunner, 1 optional |
 * | Starcruiser         | .     | .       | .       | .    | 12      | .      | .           | 105 (15d12)  | 210k  | 15  | 16         | .           | 1 captain, 1 pilot, 1 technician, 4 gunner             |
 * | Trade Carrier       | .     | .       | .       | .    | 12      | .      | .           | 91 (13d12)   | 195k  | 13  | 14         | .           | 1 captain, 1 pilot, 1 technician, 3 gunner             |
 * | *Gargantuan*        | 4x4   | 6       | 250     | 5    | .       | 2      | 10+4*ConMod | .            | .     | .   | .          | 8           | .                                                      |
 * | Battle Cruiser      | .     | .       | .       | .    | 15      | .      | .           | 198 (18d20)  | 670k  | 17  | 28         | .           | 1 captain, 1 pilot, 2 technician, 6 gunner, 1 optional |
 * | Star Carrier        | .     | .       | .       | .    | 16      | .      | .           | 176 (16d20)  | 630k  | 18  | 14         | .           | 1 captain, 1 pilot, 4 technician, 4 gunner, 1 optional |
 * | Heavy Trade Carrier | .     | .       | .       | .    | 15      | .      | .           | 187 (17d20)  | 625k  | 16  | 20         | .           | 1 captain, 1 pilot, 2 technician, 4 gunner, 1 optional |
 * | *Titanic*           | 5x5   | 7       | 500     | 6    | .       | 0      | 15+5*ConMod | .            | .     | .   | .          | 10          | .                                                      |
 * | City Ship           | .     | .       | .       | .    | 22      | .      | .           | 600 (10d100) | 1.8m  | 20  | 40         | .           | 1 captain, 2 pilot, 2 technician, 6 gunner, 2 optional |
 * | Star Port           | .     | .       | .       | .    | 23      | .      | .           | 720 (12d100) | 2.25m | 24  | 48         | .           | 1 captain, 2 technician, 8 gunner, 2 optional          |
 */
function populateSizeDetails(ship, sizeSelected) {
    //ship = incomingShip;
    ship.size = sizeSelected;
    // there are 7 sizes of ship hulls
    // 1. Drone
    if (sizeSelected === 1) {
        ship.sizeModifier = 1;
        ship.crewIncrement = 0;
        ship.turn = 0;
        ship.baseAC = 5;
        ship.maxDex = 10;
        ship.upgradeSlots = 0;
        ship.structualIntegrity = 2;
        ship.HitDice = '2d5';
        ship.hardpoints = 1;
        ship.maxWeapons = 1;
        ship.stations = [];
    }
    
    // 2. Small
    if (sizeSelected === 2) {
        ship.sizeModifier = 2;
        ship.crewIncrement = 1;
        ship.turn = 1;
        ship.baseAC = 0;
        ship.maxDex = 10;
        ship.upgradeSlots = getUpgradeSlots(ship, sizeSelected);
        ship.structualIntegrity = 0;
        ship.HitDice = '';
        ship.hardpoints = 0;
        ship.maxWeapons = 1;
        ship.stations = [];
    }
    // 3. Medium
    if (sizeSelected === 3) {
        ship.sizeModifier = 3;
        ship.crewIncrement = 5;
        ship.turn = 2;
        ship.baseAC = 0;
        ship.maxDex = 10;
        ship.upgradeSlots = getUpgradeSlots(ship, sizeSelected);
        ship.structualIntegrity = 0;
        ship.HitDice = '';
        ship.hardpoints = 0;
        ship.maxWeapons = 2;
        ship.stations = [];
    }
    // 4. Large
    if (sizeSelected === 4) {
        ship.sizeModifier = 4;
        ship.crewIncrement = 100;
        ship.turn = 3;
        ship.baseAC = 0;
        ship.maxDex = 10;
        ship.upgradeSlots = getUpgradeSlots(ship, sizeSelected);
        ship.structualIntegrity = 0;
        ship.HitDice = '';
        ship.hardpoints = 0;
        ship.maxWeapons = 4;
        ship.stations = [];
    }
    // 5. Huge
    if (sizeSelected === 5) {
        ship.sizeModifier = 5;
        ship.crewIncrement = 150;
        ship.turn = 4;
        ship.baseAC = 0;
        ship.maxDex = 3;
        ship.upgradeSlots = getUpgradeSlots(ship, sizeSelected);
        ship.structualIntegrity = 0;
        ship.HitDice = '';
        ship.hardpoints = 0;
        ship.maxWeapons = 6;
        ship.stations = [];
    }
    // 6. Gargantuan
    if (sizeSelected === 6) {
        ship.sizeModifier = 6;
        ship.crewIncrement = 250;
        ship.turn = 5;
        ship.baseAC = 0;
        ship.maxDex = 2;
        ship.upgradeSlots = getUpgradeSlots(ship, sizeSelected);
        ship.structualIntegrity = 0;
        ship.HitDice = '';
        ship.hardpoints = 0;
        ship.maxWeapons = 8;
        ship.stations = [];
    }
    // 7. Titanic
    if (sizeSelected === 7) {
        ship.sizeModifier = 7;
        ship.crewIncrement = 500;
        ship.turn = 6;
        ship.baseAC = 0;
        ship.maxDex = 0;
        ship.upgradeSlots = getUpgradeSlots(ship, sizeSelected);
        ship.structualIntegrity = 0;
        ship.HitDice = '';
        ship.hardpoints = 0;
        ship.maxWeapons = 10;
        ship.stations = [];
    }
    return sizeSelected;
}

function getUpgradeSlots(ship, sizeSelected) {
    let upgradeSlots = 0;
    if(sizeSelected === 1) {
        return upgradeSlots;
    }

    if(sizeSelected === 2) {
        upgradeSlots = -2 + ship.conMod;
        if (upgradeSlots < 0) {
            upgradeSlots = 0;
        }
        return upgradeSlots;
    }

    if(sizeSelected === 3) {
        upgradeSlots = 3 + ship.conMod;
        if (upgradeSlots < 0) {
            upgradeSlots = 0;
        }
        return upgradeSlots;
    }

    if(sizeSelected === 4) {
        upgradeSlots = 3 + 2 * ship.conMod;
        if (upgradeSlots < 0) {
            upgradeSlots = 0;
        }
        return upgradeSlots;
    }

    if(sizeSelected === 5) {
        upgradeSlots = 6 + 3 * ship.conMod;
        if (upgradeSlots < 0) {
            upgradeSlots = 0;
        }
        return upgradeSlots;
    }

    if(sizeSelected === 6) {
        upgradeSlots = 10 + 4 * ship.conMod;
        if (upgradeSlots < 0) {
            upgradeSlots = 0;
        }
        return upgradeSlots;
    }

    if(sizeSelected === 7) {
        upgradeSlots = 15 + 5 * ship.conMod;
        if (upgradeSlots < 0) {
            upgradeSlots = 0;
        }
        return upgradeSlots;
    }

    if (upgradeSlots <= 0) {
        //we should never get here
        console.log('ERROR: getUpgradeSlots() did not reach a value sizeSelected: ' + sizeSelected + ' upgradeSlots: ' + upgradeSlots);
        return 0;
    }
}

/**
 * | index | Power Core           | Min Size | Max Size | Output | Reliability | TL   | SP   |
 * | ----- | :------------------- | :------- | :------- | :----- | :---------- | :--- | :--- |
 * |   1   | SyndiCorp I          | -        | D        | 50     | 1           | 12   | 4    |
 * |   2   | SyndiCorp II         | -        | D        | 70     | 1+          | 13   | 6    |
 * |   3   | SyndiCorp III        | -        | D        | 80     | 2           | 14   | 8    |
 * |   4   | Daelin Corp. I       | -        | S        | 75     | 2           | 12   | 7    |
 * |   5   | LCI Inc. T-1         | -        | S        | 90     | 2           | 13   | 9    |
 * |   6   | LCI Inc. T-2         | -        | S        | 120    | 2           | 14   | 12   |
 * |   7   | LCI Inc. T-3         | -        | S        | 140    | 2+          | 14   | 14   |
 * |   8   | LCI Inc. T-4         | -        | M        | 100    | 2           | 12   | 10   |
 * |   9   | Daelin Corp. II      | -        | M        | 130    | 3           | 13   | 13   |
 * |   10  | LCI Inc. T-4.5       | -        | M        | 150    | 3           | 14   | 15   |
 * |   11  | LCI Inc. T-5         | -        | M        | 175    | 3           | 14   | 17   |
 * |   12  | LCI Inc. T-5.5       | -        | M        | 200    | 3+          | 14   | 20   |
 * |   13  | Daelin Corp. III     | S        | L        | 150    | 3           | 13   | 15   |
 * |   14  | Daelin Corp. Maximum | S        | L        | 200    | 3           | 14   | 20   |
 * |   15  | LCI Inc. T-6         | S        | L        | 250    | 3+          | 14   | 25   |
 * |   16  | LCI Inc. T-7         | S        | L        | 300    | 4           | 14   | 30   |
 * |   17  | SyndiCorp IV         | M        | H        | 150    | 4           | 14   | 15   |
 * |   18  | SyndiCorp V          | M        | H        | 200    | 4           | 14   | 20   |
 * |   19  | SyndiCorp VI         | M        | H        | 300    | 4+          | 14   | 30   |
 * |   20  | Drake Ind. A         | L        | G        | 300    | 4           | 14   | 30   |
 * |   21  | Drake Ind. B         | L        | G        | 400    | 4           | 14   | 40   |
 * |   22  | Drake Ind.T          | H        | T        | 500    | 4           | 14   | 50   |
 * @param {*} ship 
 * @param {*} powerCore 
 */
function populatePowerCore(ship, powerCore) {

}


// ---- utility functions ----
/**
 * Takes the given attribute from 3-30 and returns the given modifier
 * @param {number} attribute 
 * @returns {number}
 */
function utilityGetAttributeModifier(attribute) {
    return Math.floor((attribute - 10) / 2);
}

module.exports = mongoose.model('StarShip', StarShip);