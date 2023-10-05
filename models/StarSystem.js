const mongoose = require('mongoose');
let starType = '';
let starProgress = '';
let starClassification = '';
let starLuminosity = '';
let starBaseMass = 0;
let stellarMass = 0;
let zones = {};
let starName = '';

const starSystemSchema = new mongoose.Schema({
    gsp: {
        required: false,
        type: String,
    },
    domain: {
        required: false,
        type: String
    },
    sector: {
        required: false,
        type: String
    },
    subsector: {
        required: false, // this is the subsector name
        type: String,
        unique: false
    },
    column: {
        required: false,
        type: String
    },
    row: {
        required: false,
        type: String
    },
    name: {
        required: false,
        type: String,
        default: function() {
            starName = generateRandomStarName(4,7);
            return starName;
        }
    },
    numberOfStars: {
        required: false,
        type: Number,
        default: function() {
            return rollNumberOfStars(1, 100);
        }
    },
    primaryStarType: {
        required: false,
        type: String,
        default: function() {
            return getPrimaryStar(1, 100).toString();
        }
    },
    baseMass: {
        required: false,
        type: String,
        default: function() {
            return getBaseMass(1, 10).toString();
        }
    },
    starProgress: {
        required: false,
        type: String,
        default: function() {
            return getStarProgress().toString();
        }
    },
    starLuminosity: {
        required: false,
        type: String,
        default: function() {
            return getLuminosity(1,100).toString();
        }
    },
    starClassification: {
        required: false,
        type: String,
        default: function() {
            return getStarClassification().toString();
        }
    },
    starMass: {
        required: false,
        type: String,
        default: function() {
            return getFinalMass().toString();
        }
    },
    zoneNear: {
        required: false,
        type: String,
        default: function() {
            return getZoneObject('near').toString();
        }
    },
    zoneInner: {
        required: false,
        type: String,
        default: function() {
            return getZoneObject('inner').toString();
        }
    },
    zoneHabitable: {
        required: false,
        type: String,
        default: function() {
            return getZoneObject('habitable').toString();
        }
    },
    zoneOuter1: {
        required: false,
        type: String,
        default: function() {
            return getZoneObject('outer1').toString();
        }
    },
    zoneOuter2: {
        required: false,
        type: String,
        default: function() {
            return getZoneObject('outer2').toString();
        }
    },
    zoneOuter3: {
        required: false,
        type: String,
        default: function() {
            return getZoneObject('outer3').toString();
        }
    },
    zoneFar1: {
        required: false,
        type: String,
        default: function() {
            return getZoneObject('far1').toString();
        }
    },
    zoneFar2: {
        required: false,
        type: String,
        default: function() {
            return getZoneObject('far2').toString();
        }
    },
    zoneFar3: {
        required: false,
        type: String,
        default: function() {
            return getZoneObject('far3').toString();
        }
    },
    zoneFar4: {
        required: false,
        type: String,
        default: function() {
            return getZoneObject('far4').toString();
        }
    },
    zones: {
        required: false,
        type: Object,
        default: function() {
            return getZones(stellarMass, starProgress);
        }
    }


});

function nameGen(type = '', index = false, habitable = false, dominateLifeForm = '', rings = false, zone = '') {
    let name = '';
    let suffix = '';
    let prefix = '';
    let prefixNumber = rollADice(1,9); //used if uninhabited and uninhabitable

    if (zone == "near") {
        suffix = "I";
    }else if (zone == "inner") {
        suffix = "II";
    }else if (zone == "habitable") {
        suffix = "III";
    }else if (zone == "outer1") {
        suffix = "IV";
    }else if (zone == "outer2") {
        suffix = "V";
    }else if (zone == "outer3") {
        suffix = "VI";
    }else if (zone == "far1") {
        suffix = "VII";
    }else if (zone == "far2") {
        suffix = "VIII";
    }else if (zone == "far3") {
        suffix = "IX";
    }else if (zone == "far4") {
        suffix = "X";
    }
    

    if (habitable) {
        if(type == 'Dwarf Planet' || type == 'Terrestrial Planet' || type == 'Moon') {
            name = generateRandomStarName(4,7, prefix);
            name = name + ' (' + starName + ' ' + suffix + ')';
        }
    } else {
        name = starName + ' ' + suffix;
    }


    return name;
}


function rollADice(floor, ceil) {
    return Math.floor(Math.random() * ceil) + floor;
 };

 /*
 Deprecated
| d20   | Number of Stars |
| ----- | --------------- |
| 1-12  | Single          |
| 13-17 | Binary          |
| 18-19 | Trinary         |
| 20    | Quadrinary      |
 */
function rollNumberOfStars(floor,ceil) {
    // Roll a d100
    const roll = rollADice(floor,ceil);

    // Determine the number of stars based on the roll
    if (roll >= 1 && roll <= 75) {
        return 1;
    } else if (roll >= 76 && roll <= 85) {
        return 2;
    } else if (roll >= 86 && roll <= 97) {
        return 3;
    } else {
        return 4;
    }
}

/*
| D100  | Class | 0    | 1    | 2    | 3    | 4   | 5   | 6   | 7   | 8   | 9   |
| ----- | ----- | ---- | ---- | ---- | ---- | --- | --- | --- | --- | --- | --- |
| 00-49 | M     | 0.5  | 0.5  | 0.4  | 0.3  | 0.3 | 0.3 | 0.3 | 0.1 | 0.1 | 0.1 |
| 50-64 | K     | .8   | .8   | .7   | .7   | .7  | .7  | .6  | .6  | .6  | .5  |
| 65-74 | G     | 1.1  | 1    | 1    | 1    | .9  | .9  | .9  | .9  | .8  | .8  |
| 75-84 | F     | 1.6  | 1.6  | 1.5  | 1.5  | 1.4 | 1.4 | 1.3 | 1.3 | 1.2 | 1.1 |
| 85-94 | A     | 2.9  | 2.7  | 2.5  | 2.4  | 2.1 | 1.9 | 1.8 | 1.8 | 1.8 | 1.7 |
| 95-98 | B     | 17.5 | 14.2 | 10.9 | 7.6  | 6.7 | 5.9 | 5.2 | 4.5 | 3.8 | 3.4 |
| 99    | O     | 100  | 97.5 | 95   | 92.5 | 90  | 60  | 37  | 30  | 23  | 20  |
*/
function getPrimaryStar(floor, ceil) {
    // Roll a d100
    const roll = rollADice(floor,ceil);

    if (roll >= 1 && roll <= 49) {
        starType = "M";
        return "M";
    } else if (roll >= 50 && roll <= 64) {
        starType = "K";
        return "K";
    } else if (roll >= 65 && roll <= 74) {
        starType = "G";
        return "G";
    } else if (roll >= 75 && roll <= 84) {
        starType = "F";
        return "F"
    } else if (roll >= 85 && roll <= 94) {
        starType = "A";
        return "A"
    } else if (roll >= 95 && roll <= 99) {
        starType = "B";
        return "B"
    } else {
        starType = "O";
        return "O";
    }
}

/*
| D100  | Class | 0    | 1    | 2    | 3    | 4   | 5   | 6   | 7   | 8   | 9   |
| ----- | ----- | ---- | ---- | ---- | ---- | --- | --- | --- | --- | --- | --- |
| 00-49 | M     | 0.5  | 0.5  | 0.4  | 0.3  | 0.3 | 0.3 | 0.3 | 0.1 | 0.1 | 0.1 |
| 50-64 | K     | .8   | .8   | .7   | .7   | .7  | .7  | .6  | .6  | .6  | .5  |
| 65-74 | G     | 1.1  | 1    | 1    | 1    | .9  | .9  | .9  | .9  | .8  | .8  |
| 75-84 | F     | 1.6  | 1.6  | 1.5  | 1.5  | 1.4 | 1.4 | 1.3 | 1.3 | 1.2 | 1.1 |
| 85-94 | A     | 2.9  | 2.7  | 2.5  | 2.4  | 2.1 | 1.9 | 1.8 | 1.8 | 1.8 | 1.7 |
| 95-98 | B     | 17.5 | 14.2 | 10.9 | 7.6  | 6.7 | 5.9 | 5.2 | 4.5 | 3.8 | 3.4 |
| 99    | O     | 100  | 97.5 | 95   | 92.5 | 90  | 60  | 37  | 30  | 23  | 20  |
*/
function getBaseMass(floor, ceil) {
    // Roll a d10
    const roll = rollADice(floor,ceil);
    starProgress = roll;
    starBaseMass = baseMass[starType][roll];
    return starBaseMass;
}

/* 1-10 */
function getStarProgress() {
    return starProgress;
}

/*
| D100  | Luminosity | GSP Code | Classification | M     | K     | G    | F    | A    | B    | O    |
| ----- | ---------- | -------- | -------------- | ----- | ----- | ---- | ---- | ---- | ---- | ---- |
| 00-14 | I          | 1        | Supergiant     | x37.4 | x11.1 | x5.7 | x6.1 | x5.0 | x3.1 | x1.8 |
| 15-29 | II         | 2        | Bright Giant   | x25.3 | x5.9  | x2.7 | x4.4 | x3.6 | x2.4 | x1.6 |
| 30-44 | III        | 3        | Giant          | x17.1 | x4.2  | x2.2 | x3.3 | x2.8 | x2.0 | x1.4 |
| 45-59 | IV         | 4        | Sub-Giant      | x9.1  | x2.6  | x1.6 | x2.1 | x1.9 | x1.5 | x1.2 |
| 60-84 | V          | 5        | Main Sequence  | x1    | x1    | x1   | x1   | x1   | x1   | x1   |
| 85-99 | VI         | 6        | Sub-Dwarf      | x.5   | x.7   | x.9  | x.8  | x.7  | x.5  | x.3  |
*/
function getLuminosity(floor, ceil) {
    // Roll a d100
    const roll = rollADice(floor,ceil);

    if (roll >= 1 && roll <= 14) {
        starLuminosity = "I";
        starClassification = 'Supergiant';
        return "1";
    } else if (roll >= 15 && roll <= 29) {
        starLuminosity = "II";
        starClassification = 'Bright Giant';
        return "2";
    } else if (roll >= 30 && roll <= 44) {
        starLuminosity = "III";
        starClassification = 'Giant';
        return "3";
    } else if (roll >= 45 && roll <= 59) {
        starLuminosity = "IV";
        starClassification = 'Sub-giant';
        return "4"
    } else if (roll >= 60 && roll <= 84) {
        starLuminosity = "V";
        starClassification = 'Main Sequence';
        return "5"
    } else if (roll >= 85 && roll <= 100) {
        starLuminosity = "VI";
        starClassification = 'Sub-Dwarf';
        return "6"
    }
}

/**
 * Multiply baseMass by Luminosity derived Mass
 */
function getFinalMass() {
    let massMultiplier = classificationMass[starLuminosity][starType];
    let finalMass = starBaseMass * massMultiplier;
    stellarMass = finalMass.toFixed(2);
    return stellarMass;
}

/**
 * 
 * @returns String Stellar Classification
 * | D100  | Luminosity | GSP Code | Classification | M     | K     | G    | F    | A    | B    | O    |
 * | ----- | ---------- | -------- | -------------- | ----- | ----- | ---- | ---- | ---- | ---- | ---- |
 * | 00-14 | I          | 1        | Supergiant     | x37.4 | x11.1 | x5.7 | x6.1 | x5.0 | x3.1 | x1.8 |
 * | 15-29 | II         | 2        | Bright Giant   | x25.3 | x5.9  | x2.7 | x4.4 | x3.6 | x2.4 | x1.6 |
 * | 30-44 | III        | 3        | Giant          | x17.1 | x4.2  | x2.2 | x3.3 | x2.8 | x2.0 | x1.4 |
 * | 45-59 | IV         | 4        | Sub-Giant      | x9.1  | x2.6  | x1.6 | x2.1 | x1.9 | x1.5 | x1.2 |
 * | 60-84 | V          | 5        | Main Sequence  | x1    | x1    | x1   | x1   | x1   | x1   | x1   |
 * | 85-99 | VI         | 6        | Sub-Dwarf      | x.5   | x.7   | x.9  | x.8  | x.7  | x.5  | x.3  |
 */
function getStarClassification() {
    return starClassification;
}

//zone function pass in zone, mass and return an AU value for the object but call this AFTER creating them
function getZones(stellarMass, starProgress) {
    //populate zones
    for (const zone in zones) {
        const value = zones[zone];
        switch(value) {
            case 0:
                continue;
            case "A":
                generateAsteroidBelt(1,10,zone, stellarMass, starProgress);
                continue;
            case "I":
                generateIJovianIce(zone, stellarMass, starProgress);
                continue;
            case "G":
                generateJovianGas(zone, stellarMass, starProgress);
                continue;
            case "T":
                generateTerrestrialPlanet(zone, stellarMass, starProgress);
                continue;
            case "D":
                generateDwarfPlanet(zone, stellarMass, starProgress);
                continue;
        }
    }
    return zones;
}

/**
 * 
 * @param {*} zone 
 * 
 * 
 * | D100 O | D100 B | D100 A | D100  F | D100  G | D100  K | D100  M | Astronomical Object                                                    |
 * | :----- | :----- | :----- | :------ | :------ | :------ | :------ | :--------------------------------------------------------------------- |
 * | ‐‐     | 01‐05  | 01‐10  | 01‐15   | 01‐15   | 01‐35   | 01‐50   | Empty Zone                                                             |
 * | 01‐10  | 06‐17  | 11‐25  | 16‐30   | 16‐35   | 36‐49   | 51‐60   | Dwarf Planetoid                                                        |
 * | 11‐20  | 18‐29  | 26‐40  | 31‐45   | 36‐55   | 50‐63   | 61‐70   | Terrestrial Planet                                                     |
 * | 21‐30  | 30‐40  | 41‐50  | 46‐60   | 56‐70   | 64‐75   | 71‐80   | Asteroid Belt                                                          |
 * | 31‐40  | 41‐50  | 51‐60  | 61‐70   | 71‐80   | 76‐85   | 81‐90   | Jovian: Ice (If rolling for zone 1, change this result as Jovian: Gas) |
 * | 41‐50  | 51‐60  | 61‐70  | 71‐80   | 81‐90   | 86‐95   | 91‐00   | Jovian: Gas                                                            |
 * | 51‐60  | 61‐68  | 71‐77  | 81‐86   | 91‐95   | 96‐97   | ‐‐      | Companion Star (Cannot have more mass than primary star)               |
 * | 61‐00  | 69‐70  | 78‐00  | 87‐00   | 96‐00   | 98‐00   | ‐‐      | Reroll or Pick                                                         |
 */
function getZoneObject(zone) {
    const roll = rollADice(1,100);
    
    //M
    if (starType == "M") {
        if (roll >= 1 && roll <= 50) {   
            zoneObject = astronomicalObjects[starType][1]
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 51 && roll <= 60) {
            zoneObject = astronomicalObjects[starType][2]
            zoneObject.type = "Dwarf Planetoid";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 61 && roll <= 70) {
            zoneObject = astronomicalObjects[starType][3]
            zoneObject.type = "Terrestrial Planet";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 71 && roll <= 80) {
            zoneObject = astronomicalObjects[starType][4]
            zoneObject.type = "Asteroid Belt";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 81 && roll <= 90) {
            if (zone == "near") {
                zoneObject = "G";
                zoneObject.type = "Jovian Gas";
            } else {
                zoneObject = astronomicalObjects[starType][5]
                zoneObject.type = "Jovian Ice";
            }
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 91 && roll <= 100) {
            zoneObject = astronomicalObjects[starType][6]
            zoneObject.type = "Jovian Gas";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        }
    }
    //K

    if (starType == "K") {
        if (roll >= 1 && roll <= 35) {   
            zoneObject = astronomicalObjects[starType][1]
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 36 && roll <= 49) {
            zoneObject = astronomicalObjects[starType][2]
            zoneObject.type = "Dwarf Planetoid";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 50 && roll <= 63) {
            zoneObject = astronomicalObjects[starType][3]
            zoneObject.type = "Terrestrial Planet";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 64 && roll <= 75) {
            zoneObject = astronomicalObjects[starType][4]
            zoneObject.type = "Asteroid Belt";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 76 && roll <= 85) {
            if (zone == "near") {
                zoneObject = "G";
                zoneObject.type = "Jovian Gas";
                zoneObject.zone = zone;
            } else {
                zoneObject = astronomicalObjects[starType][5]
                zoneObject.type = "Jovian Ice";
                zoneObject.zone = zone;
            }
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 86 && roll <= 95) {
            zoneObject = astronomicalObjects[starType][6]
            zoneObject.type = "Jovian Gas";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 96 && roll <= 97) {
            if (zone == "near") {
                zoneObject = "G";
                zoneObject.type = "Jovian Gas";
                zoneObject.zone = zone;
            } else {
                zoneObject = astronomicalObjects[starType][5]
                zoneObject.type = "Jovian Ice";
                zoneObject.zone = zone;
            }
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 98 && roll <= 100) {
            zoneObject = astronomicalObjects[starType][rollADice(2,6)]
            zones[zone] = zoneObject
            return zoneObject;
        }
    }

    //G
    if (starType == "G") {
        if (roll >= 1 && roll <= 15) {   
            zoneObject = astronomicalObjects[starType][1]
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 16 && roll <= 35) {
            zoneObject = astronomicalObjects[starType][2]
            zoneObject.type = "Dwarf Planetoid";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 36 && roll <= 55) {
            zoneObject = astronomicalObjects[starType][3]
            zoneObject.type = "Terrestrial Planet";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 56 && roll <= 70) {
            zoneObject = astronomicalObjects[starType][4]
            zoneObject.type = "Asteroid Belt";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 71 && roll <= 80) {
            if (zone == "near") {
                zoneObject = "G";
                zoneObject.type = "Jovian Gas";
                zoneObject.zone = zone;
            } else {
                zoneObject = astronomicalObjects[starType][5]
                zoneObject.type = "Jovian Ice";
                zoneObject.zone = zone;
            }
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 81 && roll <= 90) {
            zoneObject = astronomicalObjects[starType][6]
            zoneObject.type = "Jovian Gas";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 91 && roll <= 95) {
            if (zone == "near") {
                zoneObject = "G";
                zoneObject.type = "Jovian Gas";
                zoneObject.zone = zone;
            } else {
                zoneObject = astronomicalObjects[starType][5]
                zoneObject.type = "Jovian Ice";
                zoneObject.zone = zone;
            }
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 96 && roll <= 100) {
            zoneObject = astronomicalObjects[starType][rollADice(2,6)]
            zones[zone] = zoneObject
            return zoneObject;
        }
    }

    //F
    if (starType == "F") {
        if (roll >= 1 && roll <= 15) {   
            zoneObject = astronomicalObjects[starType][1]
            zoneObject.type = "Dwarf Planetoid";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 16 && roll <= 30) {
            zoneObject = astronomicalObjects[starType][2]
            zoneObject.type = "Terrestrial Planet";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 31 && roll <= 45) {
            zoneObject = astronomicalObjects[starType][3]
            zoneObject.type = "Asteroid Belt";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 46 && roll <= 60) {
            zoneObject = astronomicalObjects[starType][4]
            zoneObject.type = "Jovian Gas";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 61 && roll <= 70) {
            if (zone == "near") {
                zoneObject = "G";
                zoneObject.type = "Jovian Gas";
                zoneObject.zone = zone;
            } else {
                zoneObject = astronomicalObjects[starType][5]
                zoneObject.type = "Jovian Ice";
                zoneObject.zone = zone;
            }
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 71 && roll <= 80) {
            zoneObject = astronomicalObjects[starType][6]
            zoneObject.type = "Jovian Gas";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 81 && roll <= 86) {
            if (zone == "near") {
                zoneObject = "G";
                zoneObject.type = "Jovian Gas";
                zoneObject.zone = zone;
            } else {
                zoneObject = astronomicalObjects[starType][5]
                zoneObject.type = "Jovian Ice";
                zoneObject.zone = zone;
            }
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 87 && roll <= 100) {
            zoneObject = astronomicalObjects[starType][rollADice(2,6)]
            zones[zone] = zoneObject
            return zoneObject;
        }
    }

    //A
    if (starType == "A") {
        if (roll >= 1 && roll <= 10) {   
            zoneObject = astronomicalObjects[starType][1]
            zoneObject.type = "Dwarf Planetoid";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 11 && roll <= 25) {
            zoneObject = astronomicalObjects[starType][2]
            zoneObject.type = "Terrestrial Planet";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 26 && roll <= 40) {
            zoneObject = astronomicalObjects[starType][3]
            zoneObject.type = "Asteroid Belt";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 41 && roll <= 50) {
            zoneObject = astronomicalObjects[starType][4]
            zoneObject.type = "Jovian Gas";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 51 && roll <= 60) {
            if (zone == "near") {
                zoneObject = "G";
                zoneObject.type = "Jovian Gas";
                zoneObject.zone = zone;
            } else {
                zoneObject = astronomicalObjects[starType][5]
                zoneObject.type = "Jovian Ice";
                zoneObject.zone = zone;
            }
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 61 && roll <= 70) {
            zoneObject = astronomicalObjects[starType][6]
            zoneObject.type = "Jovian Gas";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 71 && roll <= 77) {
            if (zone == "near") {
                zoneObject = "G";
                zoneObject.type = "Jovian Gas";
                zoneObject.zone = zone;
            } else {
                zoneObject = astronomicalObjects[starType][5]
                zoneObject.type = "Jovian Ice";
                zoneObject.zone = zone;
            }
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 78 && roll <= 100) {
            zoneObject = astronomicalObjects[starType][rollADice(2,6)]
            zones[zone] = zoneObject
            return zoneObject;
        }
    }
    //B
    if (starType == "B") {
        if (roll >= 1 && roll <= 5) {   
            zoneObject = astronomicalObjects[starType][1]
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 6 && roll <= 17) {
            zoneObject = astronomicalObjects[starType][2]
            zoneObject.type = "Dwarf Planetoid";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 18 && roll <= 29) {
            zoneObject = astronomicalObjects[starType][3]
            zoneObject.type = "Terrestrial Planet";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 30 && roll <= 40) {
            zoneObject = astronomicalObjects[starType][4]
            zoneObject.type = "Asteroid Belt";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 41 && roll <= 50) {
            if (zone == "near") {
                zoneObject = "G";
                zoneObject.type = "Jovian Gas";
                zoneObject.zone = zone;
            } else {
                zoneObject = astronomicalObjects[starType][5]
                zoneObject.type = "Jovian Ice";
                zoneObject.zone = zone;
            }
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 51 && roll <= 60) {
            zoneObject = astronomicalObjects[starType][6]
            zoneObject.type = "Jovian Gas";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 61 && roll <= 68) {
            if (zone == "near") {
                zoneObject = "G";
                zoneObject.type = "Jovian Gas";
                zoneObject.zone = zone;
            } else {
                zoneObject = astronomicalObjects[starType][5]
                zoneObject.type = "Jovian Ice";
                zoneObject.zone = zone;
            }
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 69 && roll <= 100) {
            zoneObject = astronomicalObjects[starType][rollADice(2,6)]
            zones[zone] = zoneObject
            return zoneObject;
        }
    }
    //O
    if (starType == "O") {
        if (roll >= 1 && roll <= 10) {   
            zoneObject = astronomicalObjects[starType][1]
            zoneObject.type = "Dwarf Planetoid";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 11 && roll <= 20) {
            zoneObject = astronomicalObjects[starType][2]
            zoneObject.type = "Terrestrial Planet";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 21 && roll <= 30) {
            zoneObject = astronomicalObjects[starType][3]
            zoneObject.type = "Asteroid Belt";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 31 && roll <= 40) {
            if (zone == "near") {
                zoneObject = "G";
                zoneObject.type = "Jovian Gas";
                zoneObject.zone = zone;
            } else {
                zoneObject = astronomicalObjects[starType][4]
                zoneObject.type = "Jovian Ice";
                zoneObject.zone = zone;
            }
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 41 && roll <= 50) {
            zoneObject = astronomicalObjects[starType][5]
            zoneObject.type = "Jovian Gas";
            zoneObject.zone = zone;
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 51 && roll <= 60) {
            zoneObject = astronomicalObjects[starType][6]
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 61 && roll <= 68) {
            if (zone == "near") {
                zoneObject = "G";
                zoneObject.type = "Jovian Gas";
                zoneObject.zone = zone;
            } else {
                zoneObject = astronomicalObjects[starType][5]
                zoneObject.type = "Jovian Ice";
                zoneObject.zone = zone;
            }
            zones[zone] = zoneObject
            return zoneObject;
        } else if (roll >= 69 && roll <= 100) {
            zoneObject = astronomicalObjects[starType][rollADice(1,6)]
            zones[zone] = zoneObject
            return zoneObject;
        }
    }
}

/*
| D10 | Typical Asteroid Size |
| --- | --------------------- |
| 1-2 | Tiny <500 km          |
| 3-4 | Small 500 km - 1 km   |
| 5-6 | Medium 1 km - 5 km    |
| 7-8 | Large 6 km – 50 km    |
| 9-0 | Huge 1000+ km         |

| D10 | Asteroid Field Population Density |
| --- | --------------------------------- |
| 1-2 | Sparse                            |
| 3-4 | Light                             |
| 5-6 | Moderate                          |
| 7-8 | Dense                             |
| 9-0 | Very Dense                        |
*/
function generateAsteroidBelt(floor, ceil, zone, stellarMass, starProgress) {
        let asteroidSize = ''; 
        let asteroidDensity = '';   
        let auDistance = generateAUDistances(stellarMass, starProgress);

    switch(rollADice(floor, ceil)) {
        case 1:
        case 2:
            asteroidSize = 'Tiny';
            break;
        case 3:
        case 4:
            asteroidSize = 'Small';
            break;
        case 5:
        case 6:
            asteroidSize = 'Medium';
            break;
        case 7:
        case 8:
            asteroidSize = 'Large';
            break;
        case 9:
        case 10:
            asteroidSize = 'Huge';
            break;
    }

    switch(rollADice(floor, ceil)) {
        case 1:
        case 2:
            asteroidDensity = 'Sparse';
            break;
        case 3:
        case 4:
            asteroidDensity = 'Light';
            break;
        case 5:
        case 6:
            asteroidDensity = 'Moderate';
            break;
        case 7:
        case 8:
            asteroidDensity = 'Dense';
            break;
        case 9:
        case 10:
            asteroidDensity = 'Very Dense';
            break;
    }

    // generate resources
    let resources = generateResources(asteroidSize);
    let asteroidData = {
        "zone": zone,
        "type": "Asteroid Belt",
        "distance": auDistance,
        "size": asteroidSize,
        "density": asteroidDensity,
        "resources": resources
    };
    zones[zone] = {
        "A": asteroidData
    }
    return asteroidData;
}

/**
 * | Item     | Calculation                   | Min.    | Max. |
 * | -------- | ----------------------------- | ------- | ---- |
 * | Gravity  | D100 / 30                     | 0.03    | 3.33 |
 * | Diameter | 6D10 x 0.01                   | 0.06    | 0.60 |
 * | Mass     | Gravity x Diameter x Diameter | 0.00012 | 1.20 |
 * | # Moons  | D8, min 0                     | 0       | 4    |
 * | Rings    | 20 on D20                     | .       | .    |
 */
function generateDwarfPlanet(zone) {
    let auDistance = generateAUDistances(stellarMass, starProgress);
    const featurePresent = rollADice(1, 100);

    let feature = 'None';
    if (featurePresent == 1) {
        feature = generateFeature();
        //console.log("Feature generated: " + feature);
    }

    let gravity = rollADice(1,100) / 30;
    let diameter = rollADice(6,60) * 0.01;
    let mass = gravity * diameter * diameter;
    let moons = rollADice(1,8) / 2
    moons = Math.floor(moons);
    let rings = false;

    if (rollADice(1,20) == 20) {
        rings = true;
    }
    //create moons
    let resources = generateResources("Dwarf");
    let hydrosphere = generateHydrosphere();
    let hydrosphereComposition = 'None';
    let atmosphericPressure = generateAtmosphericPressure(mass);
    let baseRadiationLevel = '';
    let radiationLevel = 'None';
    let atmosphericToxicity = generateAtmosphericToxicity();
    let surfaceTemperature = generateSurfaceTemperature(zone, atmosphericPressure);
    let dominantTerrain = 'None';

    if (hydrosphere > 0) {
        baseRadiationLevel = getBaseRadiationLevel(hydrosphere, zone, atmosphericPressure);
        radiationLevel = generateRadiationLevel(baseRadiationLevel);
    }

    if (zone == "near") {
        hydrosphere = "None";
        hydrosphereComposition = 'None';
        dominantTerrain = "Lava";
    }else if (zone == "inner" && hydrosphere > 0) {
        hydrosphereComposition = 'Sub-surface water';
    }else if (zone == "habitable" && hydrosphere > 0) {
        hydrosphereComposition = 'liquid water, and frozen poles';
    }else if (zone == "outer1" || zone == "outer2" || zone == "outer3" && hydrosphere > 0) {
        hydrosphereComposition = 'mostly frozen water';
    }else if (zone == "far1" || zone == "far2" || zone == "far3" || zone == "far4" && hydrosphere > 0) {
        hydrosphereComposition = 'sub-glacial water';
        dominantTerrain = "Ice";
    }

    if (dominantTerrain == 'None') {
        dominantTerrain = generateDominantTerrain(zone);
    }

    let habitable = checkHabitable(zone, gravity, mass, hydrosphere, atmosphericPressure, radiationLevel, atmosphericToxicity, surfaceTemperature);
        let dominateLifeForm = "None";

        let gwp = '';

        if (habitable) {
            dominateLifeForm = generateDominateLifeForm();

            if (dominateLifeForm == "Animal" || dominateLifeForm == "None") {
                gwp = createUninhabitedGWP(gravity.toFixed(2), atmosphericPressure, hydrosphere);
            }else {
                gwp = createHabitedGWP(gravity.toFixed(2), atmosphericPressure, hydrosphere);
            }
        }

        let name = nameGen('Dwarf Planet', false,  habitable, dominateLifeForm, rings, zone);
        let moonData = generateMoon(moons, zone,name);

    let dwarfData = {
        "name": name,
        "zone": zone,
        "type": "Dwarf Planet",
        "gwp": gwp,
        "distance": auDistance,
        "gravity": gravity.toFixed(2) + "g",
        "diameter": diameter.toFixed(2),
        "mass": mass.toFixed(2),
        "rings": rings,
        "habitable": habitable,
        "dominateLifeForm": dominateLifeForm,
        "atmosphericPressure": atmosphericPressure,
        "atmosphericToxicity": atmosphericToxicity,
        "hydrosphere": hydrosphere,
        "hydrosphereComposition": hydrosphereComposition,
        "surfaceTemperature": surfaceTemperature,
        "radiationLevel": radiationLevel,
        "dominantTerrain": dominantTerrain,
        "axialTilt": generateAxialTilt(),
        "lengthOfDay": generateLengthOfDay(),
        "lengthOfYear": generateLengthOfYear(zone),
        "resources": resources,
        "feature": feature,
        "moons": moonData,
    };

    if (gwp == '') {
        delete dwarfData["gwp"];
    }


    zones[zone] = {
        "D": dwarfData
    }
    return dwarfData;
}

/**
 * | Item     | Calculation                   | Min. | Max. |
 * | -------- | ----------------------------- | ---- | ---- |
 * | Gravity  | 2D10/10                       | 0.20 | 2.00 |
 * | Diameter | (D100+40) / 70                | .59  | 2.00 |
 * | Mass     | Gravity x Diameter x Diameter | 0.07 | 4.00 |
 * | # Moons  | D4-1 x Gravity                | 0    | 6    |
 * | Rings    | 20% D100                      | .    | .    |
 */
function generateTerrestrialPlanet(zone) {
    let auDistance = generateAUDistances(stellarMass, starProgress);

    const featurePresent = rollADice(1, 100);

    let feature = 'None';
    if (featurePresent == 1) {
        feature = generateFeature();
        //console.log("Feature generated: " + feature);
    }

    let gravity = rollADice(2,20) / 10;
    let diameter = rollADice(1,100) / 70;
    let mass = gravity * diameter * diameter;
    let moons = rollADice(1,4) - 1 * gravity
    moons = Math.floor(moons);
    let rings = false;


    if (rollADice(1,100) <= 20) {
        rings = true;
    }
    //create moons
    let resources = generateResources("Terrestrial");
    let hydrosphere = generateHydrosphere();
    let hydrosphereComposition = 'None';
    let atmosphericPressure = generateAtmosphericPressure(mass);
    let baseRadiationLevel = '';
    let radiationLevel = 'None';
    let atmosphericToxicity = generateAtmosphericToxicity();
    let surfaceTemperature = generateSurfaceTemperature(zone, atmosphericPressure);
    let dominantTerrain = 'None';

    if (hydrosphere > 0) {
        baseRadiationLevel = getBaseRadiationLevel(hydrosphere, zone, atmosphericPressure);
        radiationLevel = generateRadiationLevel(baseRadiationLevel);
    }

    if (zone == "near") {
        hydrosphere = "None";
        hydrosphereComposition = 'None';
        dominantTerrain = "Lava";
    }else if (zone == "inner" && hydrosphere > 0) {
        hydrosphereComposition = 'Sub-surface water';
    }else if (zone == "habitable" && hydrosphere > 0) {
        hydrosphereComposition = 'liquid water, and frozen poles';
    }else if (zone == "outer1" || zone == "outer2" || zone == "outer3" && hydrosphere > 0) {
        hydrosphereComposition = 'mostly frozen water';
    }else if (zone == "far1" || zone == "far2" || zone == "far3" || zone == "far4" && hydrosphere > 0) {
        hydrosphereComposition = 'sub-glacial water';
        dominantTerrain = "Ice";
    }

    if (dominantTerrain == 'None') {
        dominantTerrain = generateDominantTerrain(zone);
    }

    let habitable = checkHabitable(zone, gravity, mass, hydrosphere, atmosphericPressure, radiationLevel, atmosphericToxicity, surfaceTemperature);
        let dominateLifeForm = "None";
        let gwp = '';

        if (habitable) {
            dominateLifeForm = generateDominateLifeForm();

            if (dominateLifeForm == "Animal" || dominateLifeForm == "None") {
                gwp = createUninhabitedGWP(gravity.toFixed(2), atmosphericPressure, hydrosphere);
            }else {
                gwp = createHabitedGWP(gravity.toFixed(2), atmosphericPressure, hydrosphere);
            }
        }

        let name = nameGen('Terrestrial Planet', false, habitable, dominateLifeForm, rings, zone);    
        let moonData = generateMoon(moons, zone, name);

    let terrestrialData = {
        "name": name,
        "zone": zone,
        "type": "Terrestrial Planet",
        "gwp": gwp,
        "distance": auDistance,
        "gravity": gravity.toFixed(2) + "g",
        "diameter": diameter.toFixed(2),
        "mass": mass.toFixed(2),
        "rings": rings,
        "habitable": habitable,
        "dominateLifeForm": dominateLifeForm,
        "atmosphericPressure": atmosphericPressure,
        "atmosphericToxicity": atmosphericToxicity,
        "hydrosphere": hydrosphere,
        "hydrosphereComposition": hydrosphereComposition,
        "surfaceTemperature": surfaceTemperature,
        "radiationLevel": radiationLevel,
        "dominantTerrain": dominantTerrain,
        "axialTilt": generateAxialTilt(),
        "lengthOfDay": generateLengthOfDay(),
        "lengthOfYear": generateLengthOfYear(zone),
        "resources": resources,
        "feature": feature,
        "moons": moonData,
    };

    if (gwp == '') {
        delete terrestrialData["gwp"];
    }


    zones[zone] = {
        "T": terrestrialData
    }
    return terrestrialData;
}

/**
 *| Item     | Calculation                   | Min. | Max.   |
 *| -------- | ----------------------------- | ---- | ------ |
 *| Gravity  | (D100 x 0.05) + 0.25          | 0.30 | 5.25   |
 *| Diameter | (D10+12) / 4                  | 3.25 | 5.50   |
 *| Mass     | Gravity x Diameter x Diameter | 3.17 | 158.81 |
 *| # Moons  | 3D6 x Gravity                 | 0    | 99     |
 *| Rings    | 60% D100         (D10)        | .    | .      | 
 *
 */
function generateIJovianIce(zone) {
    let gravity = rollADice(1,100) * 0.05 + 0.25;
    let diameter = rollADice(1,10) + 12 / 4;
    let mass = gravity * diameter * diameter;
    let moons = rollADice(3,18) * gravity
    moons = Math.floor(moons);
    let rings = false;
    let auDistance = generateAUDistances(stellarMass, starProgress);

    if (rollADice(1,100) <= 60) {
        rings = true;
    }
    //create moons
    let name = nameGen('Ice', false, false, 'None', rings, zone)
    let moonData = generateMoon(moons, zone, name);
    let jovianDetails = generateJovianDetails();


    let jovianIceData = {
        "name": name,
        "zone": zone,
        "type": "Jovian Ice Giant",
        "distance": auDistance,
        "gravity": gravity.toFixed(2) + "g",
        "diameter": diameter.toFixed(2),
        "mass": mass.toFixed(2),
        "rings": rings,
        "details": jovianDetails,
        "moons": moonData,
    };
    zones[zone] = {
        "I": jovianIceData
    }
    return jovianIceData;
}

/**
 * 
 *| Item     | Calculation                   | Min. | Max.   |
 *| -------- | ----------------------------- | ---- | ------ |
 *| Gravity  | (D100 x 0.05) + 0.3           | 0.35 | 5.30   |
 *| Diameter | (D10+15) / 4                  | 3.25 | 5.50   |
 *| Mass     | Gravity x Diameter x Diameter | 3.17 | 158.81 |
 *| # Moons  | 3D6 x Gravity                 | 0    | 99     |
 *| Rings    | 60% D100    (D10)             | .    | .      |
 */
function generateJovianGas(zone) {
    let gravity = rollADice(1,100) * 0.05 + 0.30;
    let diameter = rollADice(1,10) + 15 / 4;
    let mass = gravity * diameter * diameter;
    let moons = rollADice(3,18) * gravity
    moons = Math.floor(moons);
    let rings = false;
    let auDistance = generateAUDistances(stellarMass, starProgress);

    if (rollADice(1,100) <= 60) {
        rings = true;
    }
    //create moons
    let name = nameGen('Gas', false, false, 'None', rings, zone)
    let moonData = generateMoon(moons, zone, name);
    let jovianDetails = generateJovianDetails();


    let jovianGasData = {
        "name": name,
        "zone": zone,
        "type": "Jovian Gas Giant",
        "distance": auDistance,
        "gravity": gravity.toFixed(2) + "g",
        "diameter": diameter.toFixed(2),
        "mass": mass.toFixed(2),
        "rings": rings,
        "details": jovianDetails,
        "moons": moonData,
    };
    zones[zone] = {
        "I": jovianGasData
    }
    return jovianGasData;
}

/**
 * | D10  | Result                                                                                             |
 * | :--- | -------------------------------------------------------------------------------------------------- |
 * | 1    | Small core of rock and ice, surrounded by a thick layer of metallic hydrogen                       |
 * | 2    | Solid inner core surrounded by a liquid outer core                                                 |
 * | 3    | Small core consisting of a conducting liquid rotating around an iron outer core                    |
 * | 4    | A dense lead core with uranium deposits and fissures that spout metals beyond the planet’s surface |
 * | 5    | Ferrous rocky chunks floating in a metallic hydrogen core causing a strong magnetic field          |
 * | 6    | Small iron core enriched with gold, platinum, and other iron-loving elements                       |
 * | 7    | Mostly frozen rock                                                                                 |
 * | 8    | Large liquid magnesium core surround by a uranium crust enriched with palladium veins              |
 * | 9    | A single iron crystal surrounded by zinc-sulfide encasement                                        |
 * | 10   | Solid iron core mixed with nickel and trace amounts of lighter elements                            |
 * 
 * | Roll | Jovian Fuel Rating                                                                    |
 * | :--- | :------------------------------------------------------------------------------------ |
 * | 1    | Not fuel-rated, no scooping possible                                                  |
 * | 2-3  | Low fuel rating, ½ refuel rate                                                        |
 * | 4-6  | Standard fuel rating, normal rate                                                     |
 * | 7-8  | High fuel rating, 2x refuel rate                                                      |
 * | 9    | Very high fuel rating, 3x times refuel rate                                           |
 * | 10   | Hazardous, scooping causes the reactor core to sputter and fail, requires an overhaul |
 * 
 * | D10 | Roll Jovian Main Gases                       |
 * | --- | :------------------------------------------- |
 * | 1   | Hydrogen 90%, Helium 10%                     |
 * | 2   | Water 45%, Ammonia 15%, Methane 40%          |
 * | 3   | Carbon dioxide 20%, Hydrogen 60%, Helium 20% |
 * | 4   | Hydrogen 90%, Methane 10%                    |
 * | 5   | Water 10%, Ammonia 30%, Methane 60%          |
 * | 6   | Fluorine 33%, Methane 33%, Ammonia 33%       |
 * | 7   | Water 20%, Ammonia 40%, Methane 40%          |
 * | 8   | Neon 25%, Argon 75%                          |
 * | 9   | Hydrogen 80%, Helium 20%                     |
 * | 10  | Water 30%, Ammonia 30%, Methane 40%          |
 * 
 * | D10 | Jovian Trace Gases                                  |
 * | --- | --------------------------------------------------- |
 * | 1   | Water, Methane, Ammonia                             |
 * | 2   | Helium, Water, Methane, Ammonia                     |
 * | 3   | Ammonia, Fluorine, Argon                            |
 * | 4   | Helium-3                                            |
 * | 5   | --                                                  |
 * | 6   | Water, Ethane, Hydrogen                             |
 * | 7   | Water, Ammonia                                      |
 * | 8   | Water, Methane, Ethane, Ammonia, Fluorine, Hydrogen |
 * | 9   | Water, Methane, Ammonia                             |
 * | 10  | Hydrogen                                            |
 */
function generateJovianDetails() {
    let core = rollADice(1,10);
    let fuelRating = rollADice(1,10);
    let mainGases = rollADice(1,10);
    let traceGases = rollADice(1,10);

    switch(core) {
        case 1:
            core = "Small core of rock and ice, surrounded by a thick layer of metallic hydrogen";
            break;
        case 2:
            core = "Solid inner core surrounded by a liquid outer core";
            break;
        case 3:
            core = "Small core consisting of a conducting liquid rotating around an iron outer core";
            break;
        case 4:
            core = "A dense lead core with uranium deposits and fissures that spout metals beyond the planet’s surface";
            break;
        case 5:
            core = "Ferrous rocky chunks floating in a metallic hydrogen core causing a strong magnetic field";
            break;
        case 6:
            core = "Small iron core enriched with gold, platinum, and other iron-loving elements";
            break;
        case 7:
            core = "Mostly frozen rock";
            break;
        case 8:
            core = "Large liquid magnesium core surround by a uranium crust enriched with palladium veins";
            break;
        case 9:
            core = "A single iron crystal surrounded by zinc-sulfide encasement";
            break;
        case 10:
            core = "Solid iron core mixed with nickel and trace amounts of lighter elements";
            break;
    }

    switch(fuelRating) {
        case 1:
            fuelRating = "Not fuel-rated, no scooping possible";
            break;
        case 2:
        case 3:
            fuelRating = "Low fuel rating, ½ refuel rate";
            break;
        case 4:
        case 5:
        case 6:
            fuelRating = "Standard fuel rating, normal rate";
            break;
        case 7:
        case 8:
            fuelRating = "High fuel rating, 2x refuel rate";
            break;
        case 9:
            fuelRating = "Very high fuel rating, 3x times refuel rate";
            break;
        case 10:
            fuelRating = "Hazardous, scooping causes the reactor core to sputter and fail, requires an overhaul";
            break;
    }

    switch(mainGases) {
        case 1:
            mainGases = "Hydrogen 90%, Helium 10%";
            break;
        case 2:
            mainGases = "Water 45%, Ammonia 15%, Methane 40%";
            break;
        case 3:
            mainGases = "Carbon dioxide 20%, Hydrogen 60%, Helium 20%";
            break;
        case 4:
            mainGases = "Hydrogen 90%, Methane 10%";
            break;
        case 5:
            mainGases = "Water 10%, Ammonia 30%, Methane 60%";
            break;
        case 6:
            mainGases = "Fluorine 33%, Methane 33%, Ammonia 33%";
            break;
        case 7:
            mainGases = "Water 20%, Ammonia 40%, Methane 40%";
            break;
        case 8:
            mainGases = "Neon 25%, Argon 75%";
            break;
        case 9:
            mainGases = "Hydrogen 80%, Helium 20%";
            break;
        case 10:
            mainGases = "Water 30%, Ammonia 30%, Methane 40%";
            break;
    }

    switch(traceGases) {
        case 1:
            traceGases = "Water, Methane, Ammonia";
            break;
        case 2:
            traceGases = "Helium, Water, Methane, Ammonia";
            break;
        case 3:
            traceGases = "Ammonia, Fluorine, Argon";
            break;
        case 4:
            traceGases = "Helium-3";
            break;
        case 5:
            traceGases = "--";
            break;
        case 6:
            traceGases = "Water, Ethane, Hydrogen";
            break;
        case 7:
            traceGases = "Water, Ammonia";
            break;
        case 8:
            traceGases = "Water, Methane, Ethane, Ammonia, Fluorine, Hydrogen";
            break;
        case 9:
            traceGases = "Water, Methane, Ammonia";
            break;
        case 10:
            traceGases = "Hydrogen";
            break;
    }

    let jovianDetails = {
        "Core": core,
        "Fuel Rating": fuelRating,
        "Main Gases": mainGases,
        "Trace Gases": traceGases
    }
    
    return jovianDetails;
        
}

/**
 * | D10        | Gravity     | Gravity Min/Max | Diameter       | Diameter Min/Max |
 * | ---------- | ----------- | --------------- | -------------- | ---------------- |
 * | 1-3 Tiny   | D100/800    | (Negligible!)   | D10 x 0.001    | (0.001 - 0.010)  |
 * | 4-6 Small  | D100/400    | (0.0025 - 0.25) | (D10+5) x 0.01 | (0.06 - 0.15)    |
 * | 7-8 Medium | D100/210    | (0.005 - 0.47)  | (D10+5) x 0.02 | (0.12 - 0.30)    |
 * | 9 Large    | D100 x 0.01 | (0.01 - 1.00)   | (D10+5) x 0.03 | (0.18 - 0.45)    |
 * | 10 Huge    | D100 x 0.02 | (0.02 - 2.00)   | (D10+5) x 0.04 | (0.24 - 0.60)    |
 */
function generateMoon(moons, zone, planetName) {
    const featurePresent = rollADice(1, 100);

    let feature = 'None';
    if (featurePresent == 1) {
        feature = generateFeature();
        //console.log("Feature generated: " + feature);
    }

    let moonData = {};
    
    for (let i = 0; i < moons; i++) {
        let size = rollADice(1,10)
        let gravity = rollADice(1,100);
        let diameter = 0;
        switch(size){
            case 1:
            case 2:
            case 3:
                size = 'Tiny';
                gravity = gravity / 800;
                diameter = rollADice(1,10) * 0.001;
                break;
            case 4:
            case 5:
            case 6:
                size = 'Small';
                gravity = gravity / 400;
                diameter = rollADice(1,10) + 5 * 0.001;
                break;
            case 7:
            case 8:
                size = 'Medium';
                gravity = gravity / 210;
                diameter = rollADice(1,10) + 5 * 0.002;
                break;
            case 9:
                size = 'Large';
                gravity = gravity * 0.01
                diameter = rollADice(1,10) + 5 * 0.003;
                break;
            case 10:
                size = 'Huge';
                gravity = gravity * 0.02;
                diameter = rollADice(1,10) + 5 * 0.004;
                break;
        }

        let mass = gravity * diameter * diameter
        let resources = generateResources(size);

        let hydrosphere = generateHydrosphere();
        let hydrosphereComposition = '';
        let atmosphericPressure = generateAtmosphericPressure(mass);
        let baseRadiationLevel = '';
        let radiationLevel = 'None';
        let atmosphericToxicity = generateAtmosphericToxicity();
        let surfaceTemperature = generateSurfaceTemperature(zone, atmosphericPressure);
        let dominantTerrain = 'None';

        if (hydrosphere > 0) {
            baseRadiationLevel = getBaseRadiationLevel(hydrosphere, zone, atmosphericPressure);
            radiationLevel = generateRadiationLevel(baseRadiationLevel);
        }

              

        if (zone == "near") {
            hydrosphere = "None";
            hydrosphereComposition = 'None';
            dominantTerrain = "Lava";
        }else if (zone == "inner" && hydrosphere > 0) {
            hydrosphereComposition = 'Sub-surface water';
        }else if (zone == "habitable" && hydrosphere > 0) {
            hydrosphereComposition = 'liquid water, and frozen poles';
        }else if (zone == "outer1" || zone == "outer2" || zone == "outer3" && hydrosphere > 0) {
            hydrosphereComposition = 'mostly frozen water';
        }else if (zone == "far1" || zone == "far2" || zone == "far3" || zone == "far4" && hydrosphere > 0) {
            hydrosphereComposition = 'sub-glacial water';
            dominantTerrain = "Ice";
        }

        if (dominantTerrain == 'None') {
            dominantTerrain = generateDominantTerrain(zone);
        }

        let habitable = checkHabitable(zone, gravity, mass, hydrosphere, atmosphericPressure, radiationLevel, atmosphericToxicity, surfaceTemperature);
        let dominateLifeForm = "None";
        let gwp = '';

        if (habitable) {
            dominateLifeForm = generateDominateLifeForm();

            if (dominateLifeForm == "Animal" || dominateLifeForm == "None") {
                gwp = createUninhabitedGWP(gravity.toFixed(2), atmosphericPressure, hydrosphere);
            }else {
                gwp = createHabitedGWP(gravity.toFixed(2), atmosphericPressure, hydrosphere);
            }
        }

        let name = "Moon " + i + ' ('+planetName+')' 
        if (habitable) {
            name = nameGen('Moon', false, habitable, dominateLifeForm, false, zone);
        }

        moonData[i] = {
            "name": name,
            "zone": zone,
            "type": "Moon",
            "gwp": gwp,
            "size": size,
            "gravity": gravity.toFixed(3) + "g",
            "diameter": diameter.toFixed(3),
            "mass": mass.toFixed(3),
            "habitable": habitable,
            "dominateLifeForm": dominateLifeForm,
            "atmosphericPressure": atmosphericPressure,
            "atmosphericToxicity": atmosphericToxicity,
            "hydrosphere": hydrosphere,
            "hydrosphereComposition": hydrosphereComposition,
            "surfaceTemperature": surfaceTemperature,
            "radiationLevel": radiationLevel,
            "dominantTerrain": dominantTerrain,
            "axialTilt": generateAxialTilt(),
            "lengthOfDay": generateLengthOfDay(),
            "lengthOfYear": generateLengthOfYear(zone),
            "resources": resources,
            "feature": feature
        };

        if (gwp == '') {
            delete moonData[i]["gwp"];
        }

        
    }

    return moonData;
}


function checkHabitable(zone, gravity, mass, hydrosphere, atmosphericPressure, radiationLevel, atmosphericToxicity, surfaceTemperature) {

    // if (zone != "inner" || zone != "habitable" || zone != "outer1" || zone != "outer2" || zone != "outer3") {
    //     return habitable;
    // }

    if (zone == "near" || zone == "far1" || zone == "far2" || zone == "far3" || zone == "far4") {
       //// console.log('Planet is uninhabitable. Due to Zone')
        return false;
    }

    if (gravity < 0.5 || gravity > 1.5) {
       //// console.log('Planet is uninhabitable. Due to Gravity')
        return false;
    }

    if(mass < 0.1) {
       //// console.log('Planet is uninhabitable. Due to Mass')
        return false;
    }

    if (hydrosphere == "None" || hydrosphere == 0) {
       //// console.log('Planet is uninhabitable. Due to Hydrosphere')
        return false;
    }

    if (atmosphericPressure == "Very Dense" || atmosphericPressure == "Very Thing") {
       //// console.log('Planet is uninhabitable. Due to Atmospheric Pressure')
        return false;
    }

    if (radiationLevel == "Severe" || radiationLevel == "Extreme") {
       //// console.log('Planet is uninhabitable. Due to Radiation')
        return false;
    }

    if (atmosphericToxicity == "Moderate Hazard" || atmosphericToxicity == "Severe Hazard") {
       //// console.log('Planet is uninhabitable. Due to Atmospheric Toxicity')
        return false;
    }

    if (surfaceTemperature == "Inferno" || surfaceTemperature == "Frozen") {
       //// console.log('Planet is uninhabitable. Due to Surface Temperature')
        return false;
    }

    //// console.log("Found a habitable planet! Zone: " + zone);

    return true;
}

/**
 * 
 * | Orbital Object          | Chance Present | Amount Present |
 * | ----------------------- | -------------- | -------------- |
 * | Tiny Asteroid or Mon    | 5%             | 3D10 TONS      |
 * | Small Asteroid or Moon  | 10%            | 5D10 TONS      |
 * | Medium Asteroid or Moon | 15%            | D100 TONS      |
 * | Large Asteroid or Moon  | 20%            | D10x25 TONS    |
 * | Huge Asteroid or Moon   | 25%            | D10x50 TONS    |
 * | Dwarf Planetoid         | 30%            | D10x100 TONS   |
 * | Terrestrial Planet      | 50%            | Abundant       |
 */
function checkResources(size) {
    let chance = rollADice(1,100);
    let amount = 0;
    switch(size) {
        case "Tiny":
            if (chance <= 5) {
                amount = rollADice(3,30);
            }
            break;
        case "Small":
            if (chance <= 10) {
                amount = rollADice(5,50);
            }
            break;
        case "Medium":
            if (chance <= 15) {
                amount = rollADice(1,100);
            }
            break;
        case "Large":
            if (chance <= 20) {
                amount = rollADice(1,10) * 25;
            }
            break;
        case "Huge":
            if (chance <= 25) {
                amount = rollADice(1,10) * 50;
            }
            break;
        case "Dwarf":
            if (chance <= 30) {
                amount = rollADice(1,10) * 100;
            }
            break;
        case "Terrestrial":
            if (chance <= 50) {
                amount = rollADice(1,10) * 1000;
            }
            break;
    }
    return amount;
}

/**
 * 
 * | D10                | Precious Resource            | Value per Ton (ch) |
 * | ------------------ | ---------------------------- | ------------------ |
 * | 1                  | Metal Ore (low-grade)        | 2D10               |
 * | 2                  | Precious Metal(s)            | 5D10x50            |
 * | 3                  | Radioactive Ore              | D100               |
 * | 4                  | Metal Ore (high-grade)       | 2D10x10            |
 * | 5                  | Precious Gem(s)              | 5D10x100           |
 * | 6                  | Silicates (no mineral value) | 1D6                |
 * | 7                  | Raw crystals                 | D100               |
 * | 8                  | Minerals (high-grade)        | 5D10x10            |
 * | 9                  | Low-Grade Ores               | 2D10               |
 * | 10                 | Metal Ore (high-grade)       | 2D10x10            |
 * 
 * 
 */
function generateResources(size) {
    let amount = checkResources(size);
    let resource = '';
    let resourceType = rollADice(1,10);
    let resourceValue = 0;
    let resourceCode = 0;
    let resourceRoll = 0;

    if (amount > 0) {
        switch(resourceType) {
            case 1:
            case 10:
                resourceType = "Metal Ore (low-grade)";
                resourceValue = rollADice(2,20);
                resourceCode = 1;
                resourceRoll = rollADice(1,100);
                resource = resources1x100[resourceCode][resourceRoll];
                break;
            case 2:
                resourceType = "Precious Metal(s)";
                resourceValue = rollADice(5,50) * 50;
                resourceCode = 2;
                resourceRoll = rollADice(1,4);
                resource = resources1x10[resourceCode][resourceRoll];
                break;
            case 3:
                resourceType = "Radioactive Ore";
                resourceValue = rollADice(1,100);
                resourceCode = 3;
                resourceRoll = rollADice(1,10);
                resource = resources1x10[resourceCode][resourceRoll];
                break;
            case 4:
                resourceType = "Metal Ore (high-grade)";
                resourceValue = rollADice(2,20) * 10;
                resourceCode = 4;
                resourceRoll = rollADice(1,100);
                resource = resources1x100[resourceCode][resourceRoll];
                break;
            case 5:
                resourceType = "Precious Gem(s)";
                resourceValue = rollADice(5,50) * 100;
                resourceCode = 5;
                resourceRoll = rollADice(1,10);
                resource = resources1x10[resourceCode][resourceRoll];
                break;
            case 6:
                resourceType = "Silicates (no mineral value)";
                resourceValue = rollADice(1,6);
                resourceCode = 6;
                break;
            case 7:
                resourceType = "Raw crystals";
                resourceValue = rollADice(1,100);
                resourceCode = 7;
                resourceRoll = rollADice(1,10);
                resource = resources1x10[resourceCode][resourceRoll];
                break;
            case 8:
                resourceType = "Minerals (high-grade)";
                resourceValue = rollADice(5,50) * 10;
                resourceCode = 8;
                resourceRoll = rollADice(1,10);
                resource = resources1x10[resourceCode][resourceRoll];
                break;
            case 9:
                resourceType = "Low-Grade Ores";
                resourceValue = rollADice(2,20);
                resourceCode = 9;
                resourceRoll = rollADice(1,10);
                resource = resources1x10[resourceCode][resourceRoll];
                break;
        }
        let resourceData = {
            "type": resourceType,
            "Amount": amount,
            "Value": resourceValue,
            "Resource": resource
        }
        return resourceData;
    } else {
        return "None";
    }
}

/**
 * | D100  | System Feature                         |
 * | ----- | -------------------------------------- |
 * | 1     | Precurosr Ruins                        |
 * | 2     | Ancient Robot                          |
 * | 3     | Ancient Ruins                          |
 * | 4     | Artificial Moon                        |
 * | 5     | Comet(s)                               |
 * | 6     | Cross-planar Orbit                     |
 * | 7     | Deep Space Lifeform                    |
 * | 8     | Depleted Resources                     |
 * | 9     | Derelict Ship                          |
 * | 10    | Doomsday Planet                        |
 * | 11    | Electromagnetic Atmospheric Conditions |
 * | 12    | Generations-old Castaways              |
 * | 13    | Glowing Moon                           |
 * | 14    | Micro Black Hole                       |
 * | 15    | Micro Pulsar                           |
 * | 16    | Mine Field                             |
 * | 17    | Ringed Moon                            |
 * | 18    | Unstable Planet                        |
 * | 19    | Water Reservoir                        |
 * | 20    | Temporal Anomaly                       |
 * | 21    | Exotic Gas Giant                       |
 * | 22    | Solar Flare Surges                     |
 * | 23    | Quantum Crystal Formation              |
 * | 24    | Living Starship                        |
 * | 25    | Magnetic Anomaly                       |
 * | 26    | Mysterious Signals                     |
 * | 27    | Frozen Civilization                    |
 * | 28    | Living Nebula                          |
 * | 29    | Space-time Rift                        |
 * | 30    | Subspace Beacon                        |
 * | 31    | Phantom Pirates                        |
 * | 32    | Silicon-based Lifeforms                |
 * | 33    | Cryogenic Ship Graveyard               |
 * | 34    | Stellar Observatory                    |
 * | 35    | Sentient Asteroid                      |
 * | 36    | Temporal Dilation Zone                 |
 * | 37    | Space-faring Pirates                   |
 * | 38    | Quantum Anomaly Nexus                  |
 * | 39    | Crystal Forest                         |
 * | 40    | Nebula Nexus                           |
 * | 41    | Cosmic Stormfront                      |
 * | 42    | Quantum Garden                         |
 * | 43    | Phantom Anomalies                      |
 * | 44    | Timeless Observatory                   |
 * | 45    | Gravity Forge                          |
 * | 46    | Hyperspace Resonance                   |
 * | 47    | Poltergeist Vortex                     |
 * | 48    | Quantum Skyline                        |
 * | 49    | Planetary Observatory                  |
 * | 50    | Holographic Anomalies                  |
 * | 51    | Time Dilation Oasis                    |
 * | 52    | Cosmic Bard's Harp                     |
 * | 53    | Starship Graveyard                     |
 * | 54    | Quantum Echoes                         |
 * | 55    | Skyborne Cities                        |
 * | 56    | Quantum Lighthouse                     |
 * | 57    | Celestial Library                      |
 * | 58    | Temporal Nexus                         |
 * | 59    | Nebular Sirens                         |
 * | 60-99 | Unidentifiable stellar debris          |
 * | 100   | Precursor Artifact                     |
 */
// there is a 1% chance of a feature existing with a Terrestrial, Moon, or Dwarf Planetoid
function generateFeature() {
    const roll = rollADice(1,100);
    let feature = '';

    if (roll >=60 && roll <= 99) {
        feature = "Unidentifiable stellar debris";
    } else {
        feature = systemFeatures[roll];
    }

    return feature;
}

/**
 * | Stellar Mass | StarProgress 1| StarProgress 2| StarProgress 3| StarProgress 4 | StarProgress 5  | StarProgress 6  | StarProgress 7   | StarProgress 8    | StarProgress 9    | StarProgress 10     |
 * | :----------- | :------------ | :------------ | :------------ | :------------- | :-------------- | :-------------- | :--------------- | :---------------- | :---------------- | :------------------ |
 * | <0.6         | 0.02 ‐ 0.05   | 0.05 ‐ 0.09   | 0.09 ‐ 0.18   | 0.18 ‐ 0.36    | 0.36 ‐ 0.73     | 0.73 ‐ 1.46     | 1.46 ‐ 2.92      | 2.92 ‐ 5.84       | 5.84 ‐ 11.67      | 11.67 ‐ 23.35       |
 * | 0.6‐1.5      | 0.2 ‐ 0.4     | 0.4 ‐ 0.8     | 0.8‐ 1.5      | 1.5 ‐ 3.0      | 3.0 ‐ 6.0       | 6.0 ‐ 12.0      | 12.0 ‐ 24.0      | 24.0 ‐ 48.0       | 48.0 ‐ 96.0       | 96.0 ‐ 192.0        |
 * | 1.6‐3.0      | 0.8 ‐ 1.9     | 1.9 ‐ 3.7     | 3.7‐ 7.5      | 7.5 ‐ 14.9     | 14.9 ‐ 29.8     | 29.8 ‐ 59.6     | 59.6 ‐ 119.3     | 119.3 ‐ 238.6     | 238.6 ‐ 477.2     | 477.2 ‐ 954.3       |
 * | 3.1‐5.0      | 1.9 ‐ 4.2     | 4.2 ‐ 8.5     | 8.5 ‐ 17.0    | 17.0 ‐ 33.9    | 33.9 ‐ 67.9     | 67.9 ‐ 135.8    | 135.8 ‐ 271.5    | 271.5 ‐ 543.1     | 543.1 ‐ 1,086.1   | 1,086.1 ‐ 2,172.2   |
 * | 5.1‐8.0      | 4.4 ‐ 9.9     | 9.9 ‐ 19.8    | 19.8 ‐ 39.7   | 39.7 ‐ 79.4    | 79.4 ‐ 158.8    | 158.8 ‐ 317.5   | 317.5 ‐ 635.1    | 635.1 ‐ 1,270.1   | 1,270.1 ‐ 2,540.2 | 2,540.2 ‐ 5,080.4   |
 * | 8.1‐12.0     | 9 ‐ 21        | 21 ‐ 42       | 42 ‐ 84       | 84 ‐ 169       | 169 ‐ 337       | 337 ‐ 675       | 675 ‐ 1,350      | 1,350 ‐ 2,699     | 2,699 ‐ 5,398     | 5,398 ‐ 10,797      |
 * | 12.1‐20.0    | 21 ‐ 48       | 48 ‐ 96       | 96 ‐ 192      | 192 ‐ 384      | 384 ‐ 768       | 768 ‐ 1,536     | 1,536 ‐ 3,072    | 3,072 ‐ 6,144     | 6,144 ‐ 12,288    | 12,288 ‐ 24,576     |
 * | 20.1‐36.0    | 57 ‐ 128      | 128 ‐ 256     | 256 ‐ 511     | 511 ‐ 1,022    | 1,022 ‐ 2,045   | 2,045 ‐ 4,090   | 4,090 ‐ 8,180    | 8,180 ‐ 16,359    | 16,359 ‐ 32,719   | 32,719 ‐ 65,438     |
 * | 36.1‐68.0    | 168 ‐ 378     | 378 ‐ 755     | 755 ‐ 1,510   | 1,510 ‐ 3,021  | 3,021 ‐ 6,042   | 6,042 ‐ 12,083  | 12,083 ‐ 24,167  | 24,167 ‐ 48,333   | 48,333 ‐ 96,667   | 96,667 ‐ 193,333    |
 * | 68.1‐132.0   | 527 ‐ 1,186   | 1,186 ‐ 2,372 | 2,372 ‐ 4,743 | 4,743 ‐ 9,487  | 9,487 ‐ 18,974  | 18,974 ‐ 37,947 | 37,947 ‐ 75,895  | 75,895 ‐ 151,789  | 151,789 ‐ 303,579 | 303,579 ‐ 607,157   |
 * | >132.0       | 1,072 ‐ 2,411 | 2,411 ‐ 4,822 | 4,822 ‐ 9,644 | 9,644 ‐ 19,288 | 19,288 ‐ 38,575 | 38,575 ‐ 77,151 | 77,151 ‐ 154,302 | 154,302 ‐ 308,604 | 308,604 ‐ 617,207 | 617,207 ‐ 1,234,414 |
 */
//will generate the distance between the star and the object in a given zone with variability based on the size of the star it uses the starProgress to narrow this down

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function generateAUDistances(stellarMass, starProgress) {
    let auDistance = 0;
    // example
    if (stellarMass < 0.6) { 
        // if the stellar mass is less than 0.6
        // and the StarProgress is 1
        // then the AU distance will be between 0.02 and 0.05
        if (starProgress == 1) {
            auDistance = randomNumber(0.02, 0.05);
        }
        // if the StarProgress is 2
        // then the AU distance will be between 0.05 and 0.09
        if (starProgress == 2) {
            auDistance = randomNumber(0.05, 0.09);
        }
        // if the StarProgress is 3
        // then the AU distance will be between 0.09 and 0.18
        if (starProgress == 3) {
            auDistance = randomNumber(0.09, 0.18);
        }
        // if the StarProgress is 4
        // then the AU distance will be between 0.18 and 0.36
        if (starProgress == 4) {
            auDistance = randomNumber(0.18, 0.36);
        }
        // if the StarProgress is 5
        // then the AU distance will be between 0.36 and 0.73
        if (starProgress == 5) {
            auDistance = randomNumber(0.36, 0.73);
        }
        // if the StarProgress is 6
        // then the AU distance will be between 0.73 and 1.46
        if (starProgress == 6) {
            auDistance = randomNumber(0.73, 1.46);
        }
        // if the StarProgress is 7
        // then the AU distance will be between 1.46 and 2.92
        if (starProgress == 7) {
            auDistance = randomNumber(1.46, 2.92);
        }
        // if the StarProgress is 8
        // then the AU distance will be between 2.92 and 5.84
        if (starProgress == 8) {
            auDistance = randomNumber(2.92, 5.84);
        }
        // if the StarProgress is 9
        // then the AU distance will be between 5.84 and 11.67
        if (starProgress == 9) {
            auDistance = randomNumber(5.84, 11.67);
        }
        // if the StarProgress is 10
        // then the AU distance will be between 11.67 and 23.35
        if (starProgress == 10) {
            auDistance = randomNumber(11.67, 23.35);
        }
    } else if (stellarMass >= 0.6 && stellarMass <= 1.50) {
        if (starProgress == 1) {
            auDistance = randomNumber(0.2, 0.4);
        }
        if (starProgress == 2) {
            auDistance = randomNumber(0.4, 0.8);
        }
        if (starProgress == 3) {
            auDistance = randomNumber(0.8, 1.5);
        }
        if (starProgress == 4) {
            auDistance = randomNumber(1.5, 3.0);
        }
        if (starProgress == 5) {
            auDistance = randomNumber(3.0, 6.0);
        }
        if (starProgress == 6) {
            auDistance = randomNumber(6.0, 12.0);
        }
        if (starProgress == 7) {
            auDistance = randomNumber(12.0, 24.0);
        }
        if (starProgress == 8) {
            auDistance = randomNumber(24.0, 48.0);
        }
        if (starProgress == 9) {
            auDistance = randomNumber(48.0, 96.0);
        }
        if (starProgress == 10) {
            auDistance = randomNumber(96.0, 192.0);
        }
    
    } else if (stellarMass >= 1.51 && stellarMass <= 3.0) {
        if (starProgress == 1) {
            auDistance = randomNumber(0.8, 1.9);
        }
        if (starProgress == 2) {
            auDistance = randomNumber(1.9, 3.7);
        }
        if (starProgress == 3) {
            auDistance = randomNumber(3.7, 7.5);
        }
        if (starProgress == 4) {
            auDistance = randomNumber(7.5, 14.9);
        }
        if (starProgress == 5) {
            auDistance = randomNumber(14.9, 29.8);
        }
        if (starProgress == 6) {
            auDistance = randomNumber(29.8, 59.6);
        }
        if (starProgress == 7) {
            auDistance = randomNumber(59.6, 119.3);
        }
        if (starProgress == 8) {
            auDistance = randomNumber(119.3, 238.6);
        }
        if (starProgress == 9) {
            auDistance = randomNumber(238.6, 477.2);
        }
        if (starProgress == 10) {
            auDistance = randomNumber(477.2, 954.3);
        }
    
    } else if (stellarMass >= 3.01 && stellarMass <= 5.0) {
        if (starProgress == 1) {
            auDistance = randomNumber(1.9, 4.2);
        }
        if (starProgress == 2) {
            auDistance = randomNumber(4.2, 8.5);
        }
        if (starProgress == 3) {
            auDistance = randomNumber(8.5, 17.0);
        }
        if (starProgress == 4) {
            auDistance = randomNumber(17.0, 33.9);
        }
        if (starProgress == 5) {
            auDistance = randomNumber(33.9, 67.9);
        }
        if (starProgress == 6) {
            auDistance = randomNumber(67.9, 135.8);
        }
        if (starProgress == 7) {
            auDistance = randomNumber(135.8, 271.5);
        }
        if (starProgress == 8) {
            auDistance = randomNumber(271.5, 543.1);
        }
        if (starProgress == 9) {
            auDistance = randomNumber(543.1, 1086.1);
        }
        if (starProgress == 10) {
            auDistance = randomNumber(1086.1, 2172.2);
        }
    
    } else if (stellarMass >= 5.01 && stellarMass <= 8.0) {
        if (starProgress == 1) {
            auDistance = randomNumber(4.4, 9.9);
        }
        if (starProgress == 2) {
            auDistance = randomNumber(9.9, 19.8);
        }
        if (starProgress == 3) {
            auDistance = randomNumber(19.8, 39.7);
        }
        if (starProgress == 4) {
            auDistance = randomNumber(39.7, 79.4);
        }
        if (starProgress == 5) {
            auDistance = randomNumber(79.4, 158.8);
        }
        if (starProgress == 6) {
            auDistance = randomNumber(158.8, 317.5);
        }
        if (starProgress == 7) {
            auDistance = randomNumber(317.5, 635.1);
        }
        if (starProgress == 8) {
            auDistance = randomNumber(635.1, 1270.1);
        }
        if (starProgress == 9) {
            auDistance = randomNumber(1270.1, 2540.2);
        }
        if (starProgress == 10) {
            auDistance = randomNumber(2540.2, 5080.4);
        }
    
    } else if (stellarMass >= 8.01 && stellarMass <= 12.0) {
        if (starProgress == 1) {
            auDistance = randomNumber(9, 21);
        }
        if (starProgress == 2) {
            auDistance = randomNumber(21, 42);
        }
        if (starProgress == 3) {
            auDistance = randomNumber(42, 84);
        }
        if (starProgress == 4) {
            auDistance = randomNumber(84, 169);
        }
        if (starProgress == 5) {
            auDistance = randomNumber(169, 337);
        }
        if (starProgress == 6) {
            auDistance = randomNumber(337, 675);
        }
        if (starProgress == 7) {
            auDistance = randomNumber(675, 1350);
        }
        if (starProgress == 8) {
            auDistance = randomNumber(1350, 2699);
        }
        if (starProgress == 9) {
            auDistance = randomNumber(2699, 5398);
        }
        if (starProgress == 10) {
            auDistance = randomNumber(5398, 10797);
        }
    
    } else if (stellarMass >= 12.01 && stellarMass <= 20.0) {
        if (starProgress == 1) {
            auDistance = randomNumber(21, 48);
        }
        if (starProgress == 2) {
            auDistance = randomNumber(48, 96);
        }
        if (starProgress == 3) {
            auDistance = randomNumber(96, 192);
        }
        if (starProgress == 4) {
            auDistance = randomNumber(192, 384);
        }
        if (starProgress == 5) {
            auDistance = randomNumber(384, 768);
        }
        if (starProgress == 6) {
            auDistance = randomNumber(768, 1536);
        }
        if (starProgress == 7) {
            auDistance = randomNumber(1536, 3072);
        }
        if (starProgress == 8) {
            auDistance = randomNumber(3072, 6144);
        }
        if (starProgress == 9) {
            auDistance = randomNumber(6144, 12288);
        }
        if (starProgress == 10) {
            auDistance = randomNumber(12288, 24576);
        }

    } else if (stellarMass >= 20.01 && stellarMass <= 36.0) {
        if (starProgress == 1) {
            auDistance = randomNumber(57, 128);
        }
        if (starProgress == 2) {
            auDistance = randomNumber(128, 256);
        }
        if (starProgress == 3) {
            auDistance = randomNumber(256, 511);
        }
        if (starProgress == 4) {
            auDistance = randomNumber(511, 1022);
        }
        if (starProgress == 5) {
            auDistance = randomNumber(1022, 2045);
        }
        if (starProgress == 6) {
            auDistance = randomNumber(2045, 4090);
        }
        if (starProgress == 7) {
            auDistance = randomNumber(4090, 8180);
        }
        if (starProgress == 8) {
            auDistance = randomNumber(8180, 16359);
        }
        if (starProgress == 9) {
            auDistance = randomNumber(16359, 32719);
        }
        if (starProgress == 10) {
            auDistance = randomNumber(32719, 65438);
        }
    } else if (stellarMass >= 36.01 && stellarMass <= 68.0) {
        if (starProgress == 1) {
            auDistance = randomNumber(168, 378);
        }
        if (starProgress == 2) {
            auDistance = randomNumber(378, 755);
        }
        if (starProgress == 3) {
            auDistance = randomNumber(755, 1510);
        }
        if (starProgress == 4) {
            auDistance = randomNumber(1510, 3021);
        }
        if (starProgress == 5) {
            auDistance = randomNumber(3021, 6042);
        }
        if (starProgress == 6) {
            auDistance = randomNumber(6042, 12083);
        }
        if (starProgress == 7) {
            auDistance = randomNumber(12083, 24167);
        }
        if (starProgress == 8) {
            auDistance = randomNumber(24167, 48333);
        }
        if (starProgress == 9) {
            auDistance = randomNumber(48333, 96667);
        }
        if (starProgress == 10) {
            auDistance = randomNumber(96667, 193333);
        }
    } else if (stellarMass >= 68.01 && stellarMass <= 132.0) {
        if (starProgress == 1) {
            auDistance = randomNumber(527, 1186);
        }
        if (starProgress == 2) {
            auDistance = randomNumber(1186, 2372);
        }
        if (starProgress == 3) {
            auDistance = randomNumber(2372, 4743);
        }
        if (starProgress == 4) {
            auDistance = randomNumber(4743, 9487);
        }
        if (starProgress == 5) {
            auDistance = randomNumber(9487, 18974);
        }
        if (starProgress == 6) {
            auDistance = randomNumber(18974, 37947);
        }
        if (starProgress == 7) {
            auDistance = randomNumber(37947, 75895);
        }
        if (starProgress == 8) {
            auDistance = randomNumber(75895, 151789);
        }
        if (starProgress == 9) {
            auDistance = randomNumber(151789, 303579);
        }
        if (starProgress == 10) {
            auDistance = randomNumber(303579, 607157);
        }

    } else if (stellarMass > 132.0) {
        if (starProgress == 1) {
            auDistance = randomNumber(1072, 2411);
        }
        if (starProgress == 2) {
            auDistance = randomNumber(2411, 4822);
        }
        if (starProgress == 3) {
            auDistance = randomNumber(4822, 9644);
        }
        if (starProgress == 4) {
            auDistance = randomNumber(9644, 19288);
        }
        if (starProgress == 5) {
            auDistance = randomNumber(19288, 38575);
        }
        if (starProgress == 6) {
            auDistance = randomNumber(38575, 77151);
        }
        if (starProgress == 7) {
            auDistance = randomNumber(77151, 154302);
        }
        if (starProgress == 8) {
            auDistance = randomNumber(154302, 308604);
        }
        if (starProgress == 9) {
            auDistance = randomNumber(308604, 617207);
        }
        if (starProgress == 10) {
            auDistance = randomNumber(617207, 1234414);
        }
    }
    if (auDistance == 0.00) {
        let error = {
            "mass": stellarMass,
            "StarProgress": starProgress,
            "Message": "Error in generateAUDistances"
        };
        //console.log(error)
    }
    return auDistance.toFixed(2) + " au";
}

function generateSystemTags() {

}


/* Habitable Planet Generation */

/**
 * Inner, Habitable, Outer
 * Dwarf Planet, Terrestrial, or Moon
 * @returns % of water on the planet
 */
function generateHydrosphere() {
    const roll = rollADice(1,100);
    return roll;
}

/**
 * | Mass           | D10 1-2   | D10 3-8    | D10 9-10    |
 * | -------------- | --------- | ---------- | ---------- |
 * | Less than 0.3  | Very Thin | Very Thin  | Thin       |
 * | .3 to .75      | Very Thin | Thin       | Moderate   |
 * | .76 to 1.25    | Thin      | Moderate   | Dense      |
 * | 1.26 to 10     | Moderate  | Dense      | Very Dense |
 * | Higher than 10 | Dense     | Very Dense | Very Dense |
 */
function generateAtmosphericPressure(mass) {
    const roll = rollADice(1,10);
    let pressure = '';

    if (mass < 0.3) {
        switch(roll) {
            case 1:
            case 2:
                pressure = "Very Thin";
                break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                pressure = "Very Thin";
                break;
            case 9:
            case 10:
                pressure = "Thin";
                break;
        }
    }

    if (mass >= 0.3 && mass <= 0.75) {
        switch(roll) {
            case 1:
            case 2:
                pressure = "Very Thin";
                break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                pressure = "Thin";
                break;
            case 9:
            case 10:
                pressure = "Standard";
                break;
        }
    }

    if (mass >= 0.76 && mass <= 1.25) {
        switch(roll) {
            case 1:
            case 2:
                pressure = "Thin";
                break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                pressure = "Standard";
                break;
            case 9:
            case 10:
                pressure = "Dense";
                break;
        }
    }

    if (mass >= 1.26 && mass <= 10) {
        switch(roll) {
            case 1:
            case 2:
                pressure = "Standard";
                break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                pressure = "Dense";
                break;
            case 9:
            case 10:
                pressure = "Very Dense";
                break;
        }
    }

    if (mass > 10) {
        switch(roll) {
            case 1:
            case 2:
                pressure = "Dense";
                break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                pressure = "Very Dense";
                break;
            case 9:
            case 10:
                pressure = "Very Dense";
                break;
        }
    }
    return pressure;
}

/**
 * | Zone      | % Liquid | Very Thin | Thin   | Moderate | Dense  | Very Dense |
 * | --------- | -------- | --------- | ------ | -------- | ------ | ---------- |
 * | Near      | 01-25    | Deadly    | Deadly | Deadly   | Severe | Minor      |
 * | Near      | 26-75    | Deadly    | Deadly | Severe   | Minor  | Minor      |
 * | Near      | 76-100   | Deadly    | Severe | Minor    | Minor  | Low        |
 * | Inner     | 01-25    | Deadly    | Deadly | Severe   | Minor  | Minor      |
 * | Inner     | 26-75    | Deadly    | Severe | Minor    | Minor  | Low        |
 * | Inner     | 76-100   | Severe    | Minor  | Minor    | Low    | Low        |
 * | Habitable | 01-25    | Deadly    | Severe | Minor    | Minor  | Minor      |
 * | Habitable | 26-75    | Severe    | Minor  | Minor    | Low    | Low        |
 * | Habitable | 76-100   | Minor     | Minor  | Minor    | Low    | Low        |
 * | Outer     | 01-25    | Severe    | Minor  | Minor    | Minor  | Minor      |
 * | Outer     | 26-75    | Minor     | Minor  | Low      | Low    | Low        |
 * | Outer     | 76-100   | Minor     | Minor  | Low      | Low    | Low        |
 * | Far       | 01-25    | Minor     | Minor  | Minor    | Low    | Low        |
 * | Far       | 26-75    | Minor     | Low    | Low      | Low    | Low        |
 * | Far       | 76-100   | Low       | Low    | Low      | Low    | Low        |
 * 
 *
 * @param {*} hydrosphere 
 * @param {*} zone 
 * @param {*} atmosphere 
 */
function getBaseRadiationLevel(hydrosphere, zone, atmosphere) {
    let radiationLevel = '';
    if (zone == "near" && hydrosphere <= 25) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Deadly";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Deadly";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Deadly";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Severe";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Minor";
        }
    }

    if (zone == "near" && hydrosphere >= 26 && hydrosphere <= 75) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Deadly";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Deadly";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Severe";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Minor";
        }
    }

    if (zone == "near" && hydrosphere >= 76 && hydrosphere <= 100) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Deadly";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Severe";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Low";
        }
    }

    if (zone == "inner" && hydrosphere <= 25) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Deadly";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Deadly";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Severe";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Minor";
        }
    }

    if (zone == "inner" && hydrosphere >= 26 && hydrosphere <= 75) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Deadly";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Severe";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Low";
        }
    }

    if (zone == "inner" && hydrosphere >= 76 && hydrosphere <= 100) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Severe";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Low";
        }
    }

    if (zone == "habitable" && hydrosphere <= 25) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Deadly";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Severe";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Minor";
        }
    }

    if (zone == "habitable" && hydrosphere >= 26 && hydrosphere <= 75) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Severe";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Low";
        }
    }

    if (zone == "habitable" && hydrosphere >= 76 && hydrosphere <= 100) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Low";
        }
    }

    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && hydrosphere <= 25) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Severe";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Minor";
        }
    }

   if (zone == "outer1" || zone == "outer2" || zone == "outer3"  && hydrosphere >= 26 && hydrosphere <= 75) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Low";
        }
    }

   if (zone == "outer1" || zone == "outer2" || zone == "outer3"  && hydrosphere >= 76 && hydrosphere <= 100) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Low";
        }
    }

    if (zone == "far1" || zone == "far2" || zone == "far3" && hydrosphere <= 25) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Low";
        }
    }

    if (zone == "far1" || zone == "far2" || zone == "far3"  && hydrosphere >= 26 && hydrosphere <= 75) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Minor";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Low";
        }
    }

    if (zone == "far1" || zone == "far2" || zone == "far3"  && hydrosphere >= 76 && hydrosphere <= 100) {
        if (atmosphere == "Very Thin") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Thin") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Moderate") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Dense") {
            radiationLevel = "Low";
        }
        if (atmosphere == "Very Dense") {
            radiationLevel = "Low";
        }
    }

    return radiationLevel;
}

/**
 * | D10 | Core Radioactivity | Low   | Minor  | Severe | Lethal |
 * | --- | ------------------ | ----- | ------ | ------ | ------ |
 * | 1   | None               | Low   | Low    | Minor  | Minor  |
 * | 2-3 | Some               | Low   | Low    | Minor  | Severe |
 * | 4-7 | Typical            | Low   | Minor  | Severe | Deadly |
 * | 8-9 | Severe             | Minor | Minor  | Deadly | Deadly |
 * | 10  | Extreme            | Minor | Severe | Deadly | Deadly |
 */
function generateRadiationLevel(baseRadiationLevel) {
    let radiationLevel = '';
    let coreRadioactivity = '';
    const roll = rollADice(1,10);

    switch(roll) {
        case 1:
            coreRadioactivity = "None";
            break;
        case 2:
        case 3:
            coreRadioactivity = "Some";
            break;
        case 4:
        case 5:
        case 6:
        case 7:
            coreRadioactivity = "Typical";
            break;
        case 8:
        case 9:
            coreRadioactivity = "Severe";
            break;
        case 10:
            coreRadioactivity = "Extreme";
            break;
    }

    if (baseRadiationLevel == "Low" && coreRadioactivity == "None") {
        radiationLevel = "Low";
    }
    if (baseRadiationLevel == "Low" && coreRadioactivity == "Some") {
        radiationLevel = "Low";
    }
    if (baseRadiationLevel == "Low" && coreRadioactivity == "Typical") {
        radiationLevel = "Low";
    }
    if (baseRadiationLevel == "Low" && coreRadioactivity == "Severe") {
        radiationLevel = "Minor";
    }
    if (baseRadiationLevel == "Low" && coreRadioactivity == "Extreme") {
        radiationLevel = "Minor";
    }
    if (baseRadiationLevel == "Minor" && coreRadioactivity == "None") {
        radiationLevel = "Low";
    }
    if (baseRadiationLevel == "Minor" && coreRadioactivity == "Some") {
        radiationLevel = "Low";
    }
    if (baseRadiationLevel == "Minor" && coreRadioactivity == "Typical") {
        radiationLevel = "Minor";
    }
    if (baseRadiationLevel == "Minor" && coreRadioactivity == "Severe") {
        radiationLevel = "Minor";
    }
    if (baseRadiationLevel == "Minor" && coreRadioactivity == "Extreme") {
        radiationLevel = "Severe";
    }
    if (baseRadiationLevel == "Severe" && coreRadioactivity == "None") {
        radiationLevel = "Minor";
    }
    if (baseRadiationLevel == "Severe" && coreRadioactivity == "Some") {
        radiationLevel = "Minor";
    }
    if (baseRadiationLevel == "Severe" && coreRadioactivity == "Typical") {
        radiationLevel = "Severe";
    }
    if (baseRadiationLevel == "Severe" && coreRadioactivity == "Severe") {
        radiationLevel = "Deadly";
    }
    if (baseRadiationLevel == "Severe" && coreRadioactivity == "Extreme") {
        radiationLevel = "Deadly";
    }

    
    return radiationLevel;
}

/**
 * | D100  | Toxicity Hazard   |
 * | ----- | ----------------- |
 * | 00-49 | Normal, no hazard |
 * | 50-69 | Trace Hazard      |
 * | 70-79 | Mild Hazard       |
 * | 80-89 | Moderate Hazard   |
 * | 90-99 | Severe Hazard     |
 */
function generateAtmosphericToxicity() {
    const roll = rollADice(1,100);
    let toxicity = '';

    if (roll <= 49) {
        toxicity = "Normal, no hazard";
    }
    if (roll >= 50 && roll <= 69) {
        toxicity = "Trace Hazard";
    }
    if (roll >= 70 && roll <= 79) {
        toxicity = "Mild Hazard";
    }
    if (roll >= 80 && roll <= 89) {
        toxicity = "Moderate Hazard";
    }
    if (roll >= 90 && roll <= 99) {
        toxicity = "Severe Hazard";
    }
    return toxicity;
}

/**
 * | Zone      | Very Dense | Dense    | Moderate | Thin     | Very Thin |
 * | --------- | ---------- | -------- | -------- | -------- | --------- |
 * | Near      | Inferno    | Inferno  | Hot      | Hot      | Moderate  |
 * | Inner     | Inferno    | Hot      | Hot      | Hot      | Moderate  |
 * | Habitable | Hot        | Moderate | Moderate | Moderate | Cold      |
 * | Outer     | Moderate   | Cold     | Cold     | Cold     | Frozen    |
 * | Far       | Moderate   | Cold     | Cold     | Frozen   | Frozen    |
 */
function generateSurfaceTemperature(zone, atmosphericPressure) {
    if (zone == "near" && atmosphericPressure == "Very Dense") {
        return "Inferno";
    }
    if (zone == "near" && atmosphericPressure == "Dense") {
        return "Inferno";
    }
    if (zone == "near" && atmosphericPressure == "Moderate") {
        return "Hot";
    }
    if (zone == "near" && atmosphericPressure == "Thin") {
        return "Hot";
    }
    if (zone == "near" && atmosphericPressure == "Very Thin") {
        return "Moderate";
    }
    if (zone == "inner" && atmosphericPressure == "Very Dense") {
        return "Inferno";
    }
    if (zone == "inner" && atmosphericPressure == "Dense") {
        return "Hot";
    }
    if (zone == "inner" && atmosphericPressure == "Moderate") {
        return "Hot";
    }
    if (zone == "inner" && atmosphericPressure == "Thin") {
        return "Hot";
    }
    if (zone == "inner" && atmosphericPressure == "Very Thin") {
        return "Moderate";
    }
    if (zone == "habitable" && atmosphericPressure == "Very Dense") {
        return "Hot";
    }
    if (zone == "habitable" && atmosphericPressure == "Dense") {
        return "Moderate";
    }
    if (zone == "habitable" && atmosphericPressure == "Moderate") {
        return "Moderate";
    }
    if (zone == "habitable" && atmosphericPressure == "Thin") {
        return "Moderate";
    }
    if (zone == "habitable" && atmosphericPressure == "Very Thin") {
        return "Cold";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && atmosphericPressure == "Very Dense") {
        return "Moderate";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && atmosphericPressure == "Dense") {
        return "Cold";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && atmosphericPressure == "Moderate") {
        return "Cold";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && atmosphericPressure == "Thin") {
        return "Cold";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && atmosphericPressure == "Very Thin") {
        return "Frozen";
    }
    if (zone == "far1" || zone == "far2" || zone == "far3" && atmosphericPressure == "Very Dense") {
        return "Moderate";
    }
    if (zone == "far1" || zone == "far2" || zone == "far3" && atmosphericPressure == "Dense") {
        return "Cold";
    }
    if (zone == "far1" || zone == "far2" || zone == "far3" && atmosphericPressure == "Moderate") {
        return "Cold";
    }
    if (zone == "far1" || zone == "far2" || zone == "far3" && atmosphericPressure == "Thin") {
        return "Frozen";
    }
    if (zone == "far1" || zone == "far2" || zone == "far3" && atmosphericPressure == "Very Thin") {
        return "Frozen";
    }

    

}

function generateAxialTilt() {
    const roll = rollADice(1,100) - 50;
    return roll;
}

/**
 * | D100  | Result                  | Galactic Standard Hours |
 * | ----- | ----------------------- | ----------------------- |
 * | 01-09 | Very fast length of day | up to 7 hours           |
 * | 10-29 | Fast length of day      | 7 - 15 hours            |
 * | 30-69 | Typical length of day   | 15 - 30 hours           |
 * | 70-89 | Slow length of day      | 30 - 60 hours           |
 * | 90-100| Very slow length of day | 60 or more hours        |
 */
function generateLengthOfDay() {
    const roll = rollADice(1,100);
    let lengthOfDay = '';
    let galacticStandardHours = '';

    if (roll <= 9) {
        lengthOfDay = "Very fast length of day";
        galacticStandardHours = randomNumber(1,7).toFixed(1) + " hours";
    }
    if (roll >= 10 && roll <= 29) {
        lengthOfDay = "Fast length of day";
        galacticStandardHours = randomNumber(7,15).toFixed(1) + " hours";
    }
    if (roll >= 30 && roll <= 69) {
        lengthOfDay = "Typical length of day";
        galacticStandardHours = randomNumber(15,30).toFixed(1) + " hours";
    }
    if (roll >= 70 && roll <= 89) {
        lengthOfDay = "Slow length of day";
        galacticStandardHours = randomNumber(30,60).toFixed(1) + " hours";
    }
    if (roll >= 90 && roll <= 100) {
        lengthOfDay = "Very slow length of day";
        galacticStandardHours = randomNumber(60,100).toFixed(1) + " hours";
    }
    return lengthOfDay + " (" + galacticStandardHours + ")";

}

/**
 * | Inner Zone | Habitable Zone | Outer Zone | Length of Year             |
 * | ---------- | -------------- | ---------- | -------------------------- |
 * | 01-29      | 01-09          | 01         | Very fast (up to 125 days) |
 * | 30-59      | 10-29          | 01-09      | Fast (125 to 250 days)     |
 * | 60-89      | 30-69          | 10-39      | Typical (250 to 500 days)  |
 * | 90-98      | 70-89          | 40-69      | Slow (500 - 1,000 days)    |
 * | 100        | 90-100         | 70-100     | Very slow (1,000+ days)    |
 * @param {*} zone 
 */
function generateLengthOfYear(zone) {
    const roll = rollADice(1,100);
    let lengthOfYear = '';
    let lengthNumber = '';

    if (zone == "near" && roll <= 29) {
        lengthNumber = randomNumber(1,125);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Very fast (" + lengthNumber + " days)";
    }
    if (zone == "near" && roll >= 30 && roll <= 59) {
        lengthNumber = randomNumber(125,250);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Fast (" + lengthNumber + " days)";
    }
    if (zone == "near" && roll >= 60 && roll <= 89) {
        lengthNumber = randomNumber(250,500);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Typical (" + lengthNumber + " days)";
    }
    if (zone == "near" && roll >= 90 && roll <= 98) {
        lengthNumber = randomNumber(500,1000);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Slow (" + lengthNumber + " days)";
    }
    if (zone == "near" && roll == 100) {
        lengthNumber = randomNumber(1000,10000);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Very slow (" + lengthNumber + " days)";
    }
    if (zone == "inner" && roll <= 29) {
        lengthNumber = randomNumber(1,125);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Very fast (" + lengthNumber + " days)";
    }
    if (zone == "inner" && roll >= 30 && roll <= 59) {
        lengthNumber = randomNumber(125,250);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Fast (" + lengthNumber + " days)";
    }
    if (zone == "inner" && roll >= 60 && roll <= 89) {
        lengthNumber = randomNumber(250,500);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Typical (" + lengthNumber + " days)";
    }
    if (zone == "inner" && roll >= 90 && roll <= 98) {
        lengthNumber = randomNumber(500,1000);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Slow (" + lengthNumber + " days)";
    }
    if (zone == "inner" && roll == 100) {
        lengthNumber = randomNumber(1000,10000);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Very slow (" + lengthNumber + " days)";
    }
    if (zone == "habitable" && roll <= 9) {
        lengthNumber = randomNumber(1,125);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Very fast (" + lengthNumber + " days)";
    }
    if (zone == "habitable" && roll >= 10 && roll <= 29) {
        lengthNumber = randomNumber(125,250);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Fast (" + lengthNumber + " days)";
    }
    if (zone == "habitable" && roll >= 30 && roll <= 69) {
        lengthNumber = randomNumber(250,500);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Typical (" + lengthNumber + " days)";
    }
    if (zone == "habitable" && roll >= 70 && roll <= 89) {
        lengthNumber = randomNumber(500,1000);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Slow (" + lengthNumber + " days)";
    }
    if (zone == "habitable" && roll >= 90 && roll <= 100) {
        lengthNumber = randomNumber(1000,10000);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Very slow (" + lengthNumber + " days)";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && roll <= 9) {
        lengthNumber = randomNumber(1,125);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Very fast (" + lengthNumber + " days)";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && roll >= 10 && roll <= 39) {
        lengthNumber = randomNumber(125,250);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Fast (" + lengthNumber + " days)";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && roll >= 40 && roll <= 69) {
        lengthNumber = randomNumber(250,500);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Typical (" + lengthNumber + " days)";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && roll >= 70 && roll <= 100) {
        lengthNumber = randomNumber(500,1000);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Slow (" + lengthNumber + " days)";
    }
    if (zone == "far1" || zone == "far2" || zone == "far3" && roll <= 9) {
        lengthNumber = randomNumber(1,125);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Very fast (" + lengthNumber + " days)";
    }
    if (zone == "far1" || zone == "far2" || zone == "far3" && roll >= 10 && roll <= 39) {
        lengthNumber = randomNumber(125,250);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Fast (" + lengthNumber + " days)";
    }
    if (zone == "far1" || zone == "far2" || zone == "far3" && roll >= 40 && roll <= 69) {
        lengthNumber = randomNumber(250,500);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Typical (" + lengthNumber + " days)";
    }
    if (zone == "far1" || zone == "far2" || zone == "far3" && roll >= 70 && roll <= 100) {
        lengthNumber = randomNumber(500,1000);
        lengthNumber = lengthNumber.toFixed(0);
        lengthOfYear = "Slow (" + lengthNumber + " days)";
    }
    return lengthOfYear;

}

/**
 * | Inner Zone | Habitable Zone | Outer Zone | Dominant Terrain               |
 * | ---------- | -------------- | ---------- | ------------------------------ |
 * | 01-21      | 01-09          | --         | Lava Beds                      |
 * | 22-40      | 10-19          | 01-02      | Desert, Wastelands, Salt Flats |
 * | 41-56      | 20-29          | 03-06      | Canyons, Ravines, Stonelands   |
 * | 57-69      | 30-39          | 07-12      | Mountains, Crags, Ridges       |
 * | 70-79      | 40-49          | 13-20      | Jungle, Rainforest             |
 * | 80-87      | 50-59          | 21-30      | Hills, Steppes, Slopes         |
 * | 88-93      | 60-69          | 31-43      | Swamp, Bog, Marsh              |
 * | 84-97      | 70-79          | 44-59      | Plains, Savannas, Prairies     |
 * | 98-99      | 80-89          | 60-78      | Forest, Woods                  |
 * | --         | 90-99          | 79-99      | Tundra, Glacier                |
 */
function generateDominantTerrain(zone) {
    const roll = rollADice(1,100);
    let dominantTerrain = '';

    if (zone == "inner" && roll <= 21) {
        dominantTerrain = "Lava Beds";
    }
    if (zone == "inner" && roll >= 22 && roll <= 40) {
        dominantTerrain = "Desert, Wastelands, Salt Flats";
    }
    if (zone == "inner" && roll >= 41 && roll <= 56) {
        dominantTerrain = "Canyons, Ravines, Stonelands";
    }
    if (zone == "inner" && roll >= 57 && roll <= 69) {
        dominantTerrain = "Mountains, Crags, Ridges";
    }
    if (zone == "inner" && roll >= 70 && roll <= 79) {
        dominantTerrain = "Jungle, Rainforest";
    }
    if (zone == "inner" && roll >= 80 && roll <= 87) {
        dominantTerrain = "Hills, Steppes, Slopes";
    }
    if (zone == "inner" && roll >= 88 && roll <= 93) {
        dominantTerrain = "Swamp, Bog, Marsh";
    }
    if (zone == "inner" && roll >= 94 && roll <= 97) {
        dominantTerrain = "Plains, Savannas, Prairies";
    }
    if (zone == "inner" && roll >= 98 && roll <= 99) {
        dominantTerrain = "Forest, Woods";
    }
    if (zone == "habitable" && roll <= 9) {
        dominantTerrain = "Lava Beds";
    }
    if (zone == "habitable" && roll >= 10 && roll <= 19) {
        dominantTerrain = "Desert, Wastelands, Salt Flats";
    }
    if (zone == "habitable" && roll >= 20 && roll <= 29) {
        dominantTerrain = "Canyons, Ravines, Stonelands";
    }
    if (zone == "habitable" && roll >= 30 && roll <= 39) {
        dominantTerrain = "Mountains, Crags, Ridges";
    }
    if (zone == "habitable" && roll >= 40 && roll <= 49) {
        dominantTerrain = "Jungle, Rainforest";
    }
    if (zone == "habitable" && roll >= 50 && roll <= 59) {
        dominantTerrain = "Hills, Steppes, Slopes";
    }
    if (zone == "habitable" && roll >= 60 && roll <= 69) {
        dominantTerrain = "Swamp, Bog, Marsh";
    }
    if (zone == "habitable" && roll >= 70 && roll <= 79) {
        dominantTerrain = "Plains, Savannas, Prairies";
    }
    if (zone == "habitable" && roll >= 80 && roll <= 89) {
        dominantTerrain = "Forest, Woods";
    }
    if (zone == "habitable" && roll >= 90 && roll <= 99) {
        dominantTerrain = "Tundra, Glacier";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && roll <= 2) {
        dominantTerrain = "Desert, Wastelands, Salt Flats";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && roll >= 3 && roll <= 6) {
        dominantTerrain = "Canyons, Ravines, Stonelands";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && roll >= 7 && roll <= 12) {
        dominantTerrain = "Mountains, Crags, Ridges";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && roll >= 13 && roll <= 20) {
        dominantTerrain = "Jungle, Rainforest";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && roll >= 21 && roll <= 30) {
        dominantTerrain = "Hills, Steppes, Slopes";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && roll >= 31 && roll <= 43) {
        dominantTerrain = "Swamp, Bog, Marsh";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && roll >= 44 && roll <= 59) {
        dominantTerrain = "Plains, Savannas, Prairies";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && roll >= 60 && roll <= 78) {
        dominantTerrain = "Forest, Woods";
    }
    if (zone == "outer1" || zone == "outer2" || zone == "outer3" && roll >= 79 && roll <= 99) {
        dominantTerrain = "Tundra, Glacier";
    }

    return dominantTerrain;
}

// IF habitable
/**
 * | D100  | Result             |
 * | ----- | ------------------ |
 * | 00-09 | None - Uninhabited |
 * | 10-75 | Animal             |
 * | 76+   | Humanoid           |
 */
function generateDominateLifeForm() {
    const roll = rollADice(1,100);
    let dominateLifeForm = '';

    if(roll <= 9) {
        //console.log("None - Uninhabited");
        dominateLifeForm = "None";
    }
    if(roll >= 10 && roll <= 25) {
        //console.log("Animal");
        dominateLifeForm = "Animal";
    }
    if(roll >= 26) {
        dominateLifeForm = selectHumanoidSpecies();
        //console.log("Humanoid " + dominateLifeForm);
    }
    return dominateLifeForm;
}

// IF Habited

/* GWP Generation Process If Habited */

/**
 * - Galactic World Profile
   1. Starport - this will be present only if the world is inhabited
   2. World Size
   3. Atmostpheric conditions
   4. Hydrographics - this will be present only if the world is inhabited
   5. Population - this will be present only if the world is inhabited
   6. Government - this will be present only if the world is inhabited
   7. Law Level - this will be present only if the world is inhabited
   8. Tech Level - this will be present only if the world is inhabited [1-E]
   9. Orbital Starbases - this will be present only if the world is inhabited
   10. Trade Codes - this will be present only if the world is inhabited
   11. Travel Zone R (Restricted), A (Amber or Caution), G (Green), a blank is unknown

- Galactic World Profile

.......................................A1234567 x Ni R
1. Starport_______(if inhabited)_______|||||||| | |  | 
2. World Size___________________________||||||| | |  | 
3. Atmosphere____________________________|||||| | |  | 
4. Hydrographics__________________________||||| | |  | 
5. Population_____(if inhabited)___________|||| | |  | 
6. Government_____(if inhabited)____________||| | |  | 
7. Law Level______(if inhabited)_____________|| | |  | 
8. Tech Level____(if inhabited)_______________| | |  | 
9. Orbital Star Bases____(if any)_______________| |  | 
10. Trade Codes__(if inhabited)___________________|  | 
11. Travel Zone______________________________________| 
 */

function createHabitedGWP(gravity, atmosphericPressure, hydrosphere) {
    const worldSize = generateWorldSizeCode(gravity);
    const atmosphere = generateAtmosphereCode(atmosphericPressure, worldSize);
    const hydrographics = generateHydrographicsCode(hydrosphere);
    const population = generatePopulationCode(worldSize, atmosphere, hydrographics);
    const starport = generateStarportCode(population);
    const government = generateGovernmentCode(population);
    const lawLevel = generateLawLevelCode(government);
    const techLevelModifier = generateTechLevelModifier(starport, worldSize, atmosphere, hydrographics, population, government);
    const techLevel = generateTechLevelCode(techLevelModifier, hydrographics, population, atmosphere);
    const orbitalStarbases = generateOrbitalStarbasesCode();
    const tradeCodes = generateTradeCodes(worldSize, atmosphere, hydrographics, population, government, lawLevel, techLevel);
    const travelZone = generateTravelZoneCode();

    const gwp = starport + worldSize + atmosphere + hydrographics + population + government + lawLevel + techLevel + " " + orbitalStarbases + "[" + tradeCodes + "]" + travelZone;
    return gwp;
}

/**
* |Word Code|         World Size            | Surface Gravity (gs) |
* |:--------|------------------------------ | :------------------- |
* |0        |800 km (typically an asteroid) | Negligible           |
* |1        |1,600 km                       | 0.05                 |
* |2        |3,200 km                       | 0.15                 |
* |3        |4,800 km                       | 0.25                 |
* |4        |6,400 km                       | 0.35                 |
* |5        |8,000 km                       | 0.45                 |
* |6        |9,600 km                       | 0.7                  |
* |7        |11,200 km                      | 0.9                  |
* |8        |12,800 km                      | 1.0                  |
* |9        |14,400 km                      | 1.25                 |
* |A        |16,000 km                      | 1.4                  |
 * 
 * @returns 
 */
function generateWorldSizeCode(gravity) {
   let worldSize = '';
    if (gravity <= 0.05) {
        worldSize = "0";
    }
    if (gravity >= 0.06 && gravity <= 0.15) {
        worldSize = "1";
    }
    if (gravity >= 0.16 && gravity <= 0.25) {
        worldSize = "2";
    }
    if (gravity >= 0.26 && gravity <= 0.35) {
        worldSize = "3";
    }
    if (gravity >= 0.36 && gravity <= 0.45) {
        worldSize = "4";
    }
    if (gravity >= 0.46 && gravity <= 0.7) {
        worldSize = "5";
    }
    if (gravity >= 0.71 && gravity <= 0.9) {
        worldSize = "6";
    }
    if (gravity >= 0.91 && gravity <= 1.0) {
        worldSize = "7";
    }
    if (gravity >= 1.01 && gravity <= 1.25) {
        worldSize = "8";
    }
    if (gravity >= 1.26 && gravity <= 1.4) {
        worldSize = "9";
    }
    if (gravity >= 1.41) {
        worldSize = "A";
    }

    if (worldSize == '') {
        worldSize = '5';
        //console.log("Error: World Size not found. Defaulting to 5 (8,000 km) Gravity: " + gravity + "gs");
    }
    return worldSize;

}

/**
 * | 2d6-7  | Atmosphere         | Pressure      | Survival Gear Required |
 * | :----- | :----------------- | :------------ | :--------------------- |
 * | 0      | None               | 0.00          | Vacc Suit              |
 * | 1      | Trace              | 0.001 to 0.09 | Vacc Suit              |
 * | 2      | Very Thin, Tainted | 0.1 to 0.42   | Respirator, Filter     |
 * | 3      | Very Thin          | 0.1 to 0.42   | Respirator             |
 * | 4      | Thin, Tainted      | 0.43 to 0.7   | Filter                 |
 * | 5      | Thin               | 0.43 to 0.7   |                        |
 * | 6      | Standard           | 0.71–1.49     |                        |
 * | 7      | Standard, Tainted  | 0.71–1.49     | Filter                 |
 * | 8      | Dense              | 1.5 to 2.49   |                        |
 * | 9      | Dense, Tainted     | 1.5 to 2.49   | Filter                 |
 * | 10 (A) | Exotic             | Varies        | Air Supply             |
 * | 11 (B) | Corrosive          | Varies        | Vacc Suit              |
 * | 12 (C) | Insidious          | Varies        | Vacc Suit              |
 * | 13 (D) | Dense, High        | 2.5+          |                        |
 * | 14 (E) | Thin, Low          | 0.5 or less   |                        |
 * | 15 (F) | Unusual            | Varies        | Varies                 |
 * @returns 
 */
function generateAtmosphereCode(atmosphericPressure, worldSize) {
    let roll = rollADice(2,12) - 7;
    if (roll < 0) {
        roll = 0;
    }
    let atmosphereCode = '';
    if (worldSize == "A") {
        worldSize = 10;
    }
    let pressure = roll + worldSize;

    if(atmosphericPressure == "None") {
        //should never occur
        console.log("ERROR: Atmospheric Pressure is None. Roll was: " + roll + " World Size: " + worldSize);
        atmosphereCode = "0";
    }

    if (pressure == 0) {
        //rare
        console.log("Pressure is 0. Roll was: " + roll + " World Size: " + worldSize);
        atmosphereCode = "0";
    }

    if (pressure >= 0.001 && pressure <= 0.09 && atmosphericPressure == "Thin" || atmosphericPressure == "Very Thin") {
        atmosphereCode = "1";
    }

    if(pressure < 0.5 && atmosphericPressure == "Very Thin" || atmosphericPressure == "Thin") {
        atmosphereCode = "4";
    }

    if(pressure > 1.25 && atmosphericPressure == "Standard") {
        atmosphereCode = "7";
    }

    if (pressure > 2.25 && atmosphericPressure == "Dense") {
        atmosphereCode = "9";
    }

    if (atmosphericPressure == "Very Dense") {
        atmosphereCode = "D";
    }

    if (atmosphereCode == '') {
        if (atmosphericPressure == "Thin") {
            atmosphereCode = "5";
        }

        if (atmosphericPressure == "Standard") {
            atmosphereCode = "6";
        }

        if (atmosphericPressure == "Dense") {
            atmosphereCode = "8";
        }
    }

    return atmosphereCode;
}


/**
 * | Hydrographic Percentage | Description                                |
 * |:---------------------- | :----------------------------------------- |
 * |0%–5%                   | Desert world                               |
 * |6%–15%                  | Dry world                                  |
 * |16%–25%                 | A few small seas.                          |
 * |26%–35%                 | Small seas and oceans.                     |
 * |36%–45%                 | Wet world                                  |
 * |46%–55%                 | Large oceans                               |
 * |56%–65%                 |                                            |
 * |66%–75%                 | Earth-like world                           |
 * |76%–85%                 | Water world                                |
 * |86%–95%                 | Only a few small islands and archipelagos. |
 * |96–100%                 | Almost entirely water.                     |
 * @returns 
 */
function generateHydrographicsCode(hydrographics) {
    let hydrographicCode = '';
    hydrographics = hydrographics * .01;

    if (hydrographics <= 0.05) {
        hydrographicCode = "0";
    }
    if (hydrographics >= 0.06 && hydrographics <= 0.15) {
        hydrographicCode = "1";
    }
    if (hydrographics >= 0.16 && hydrographics <= 0.25) {
        hydrographicCode = "2";
    }
    if (hydrographics >= 0.26 && hydrographics <= 0.35) {
        hydrographicCode = "3";
    }
    if (hydrographics >= 0.36 && hydrographics <= 0.45) {
        hydrographicCode = "4";
    }
    if (hydrographics >= 0.46 && hydrographics <= 0.55) {
        hydrographicCode = "5";
    }
    if (hydrographics >= 0.56 && hydrographics <= 0.65) {
        hydrographicCode = "6";
    }
    if (hydrographics >= 0.66 && hydrographics <= 0.75) {
        hydrographicCode = "7";
    }
    if (hydrographics >= 0.76 && hydrographics <= 0.85) {
        hydrographicCode = "8";
    }
    if (hydrographics >= 0.86 && hydrographics <= 0.95) {
        hydrographicCode = "9";
    }
    if (hydrographics >= 0.96) {
        hydrographicCode = "A";
    }

    return hydrographicCode;
}

/**
 * | Condition                                     | DM   |
 * | :-------------------------------------------- | :--- |
 * | Size is 2 or less                             | -1   |
 * | Atmosphere is A or greater                    | -2   |
 * | Atmosphere is 6                               | +3   |
 * | Atmosphere is 5 or 8                          | +1   |
 * | Hydrographics is 0 and Atmosphere less than 3 | -2   |
 * 
 * | 2D6-2  |  AG Size        | AG Population        | AG Comparison                                         |
 * | :----- |  -------------- | -------------------- | ----------------------------------------------------- |
 * | 0      |  0              | None                 | No longer habited                                     |
 * | 1      |  10+            | Few                  | Outpost                                               |
 * | 2      |  100+           | Hundreds             | New colony                                            |
 * | 3      |  500+           | Few hundred          | Fringe colony                                         |
 * | 4      |  1,000+         | Thousands            | Small colony in Free Space                            |
 * | 5      |  5,000+         | Few thousands        | Average Colony in Free Space                          |
 * | 6      |  10,000+        | Tens of Thousands    | Large colony in Free Space                            |
 * | 7      |  50,000-99,000+ | Several thousand     | Average colony in Realm Space                         |
 * | 8      |  100,000+       | Hundred thousand     | Average well developed settled colony                 |
 * | 9      |  250,000+       | Quarter of a million | Very large colonies, Freedoms Gate sized              |
 * | 10 (A) |  500,000+       | Half a Million       | Largest known colonies, even Bastion barely hits this |
 * 
 * @returns 
 */
function generatePopulationCode(worldSize, atmosphereCode, hydrographicCode) {
    let modifier = 0;
    let populationCode = '';
    let roll = rollADice(2,12) - 2;
    
    if (roll < 0) {
        roll = 0;
    }

    if (worldSize <= 2) {
        modifier = modifier--;
    }
    if (atmosphereCode == "A") {
        modifier = modifier - 2;
    }
    if (atmosphereCode == "6") {
        modifier = modifier + 3;
    }
    if (atmosphereCode == "5" || atmosphereCode == "8") {
        modifier = modifier + 1;
    }
    if (hydrographicCode == "0" && atmosphereCode <= "3") {
        modifier = modifier - 2;
    }

    roll = roll + modifier;

    if (roll <= 0) {
        populationCode = "0";
    }
    if (roll == 1) {
        populationCode = "1";
    }
    if (roll == 2) {
        populationCode = "2";
    }
    if (roll == 3) {
        populationCode = "3";
    }
    if (roll == 4) {
        populationCode = "4";
    }
    if (roll == 5) {
        populationCode = "5";
    }
    if (roll == 6) {
        populationCode = "6";
    }
    if (roll == 7) {
        populationCode = "7";
    }
    if (roll == 8) {
        populationCode = "8";
    }
    if (roll == 9) {
        populationCode = "9";
    }
    if (roll >= 10) {
        populationCode = "A";
    }

    return populationCode;
}

/**
 * 
 * @returns | Type   | Government                  |
 * | :----- | :-------------------------- |
 * | 0      | None                        |
 * | 1      | Company/Corporation         |
 * | 2      | Participating Democracy     |
 * | 3      | Self-Perpetuating Oligarchy |
 * | 4      | Representative Democracy    | 
 * | 5      | Feudal Technocracy          |
 * | 6      | Captive Government          |
 * | 7      | Balkanization               |
 * | 8      | Civil Service Bureaucracy   |
 * | 9      | Impersonal Bureaucracy      |
 * | 10 (A) | Charismatic Dictator        |
 * | 11 (B) | Non-Charismatic Leader      |
 * | 12 (C) | Charismatic Oligarchy       |
 * | 13 (D) | Religious Dictatorship      |
 * | 14 (E) | Religious Autocracy         |
 * | 15 (F) | Totalitarian Oligarchy      |
 */
function generateGovernmentCode(populationCode) {
    //console.log("Population Code In To Government: " + populationCode + "")
    if (populationCode == 0) {
        return 0;
    }

    let roll = rollADice(2,12);
    roll = roll -7;
    
    if (roll < 0) {
        roll = 0;
    }
    
    if (populationCode == "A") {
        populationCode = 10;
    }

        
    roll = (roll * 1) + (populationCode * 1);
    
    let governmentCode = '';

    if (roll <= 0) {
        governmentCode = "0";
    }
    if (roll == 1) {
        governmentCode = "1";
    }
    if (roll == 2) {
        governmentCode = "2";
    }
    if (roll == 3) {
        governmentCode = "3";
    }
    if (roll == 4) {
        governmentCode = "4";
    }
    if (roll == 5) {
        governmentCode = "5";
    }
    if (roll == 6) {
        governmentCode = "6";
    }
    if (roll == 7) {
        governmentCode = "7";
    }
    if (roll == 8) {
        governmentCode = "8";
    }
    if (roll == 9) {
        governmentCode = "9";
    }
    if (roll == 10) {
        governmentCode = "A";
    }
    if (roll == 11) {
        governmentCode = "B";
    }
    if (roll == 12) {
        governmentCode = "C";
    }
    if (roll == 13) {
        governmentCode = "D";
    }
    if (roll == 14) {
        governmentCode = "E";
    }
    if (roll >= 15) {
        governmentCode = "F";
    }

    return governmentCode;
}

/**
 * 
 * | Digit  | Descriptor  | Not Allowed                                                               |
 * | :----- | :---------- | :------------------------------------------------------------------------ |
 * | 0      | No Law      | No restrictions; candidate for Amber Zone status                          |
 * | 1      | Low Law     | Poison gas, explosives, undetectable weapons, weapons or mass destruction |
 * | 2      | Low Law     | Portable energy weapons (except ship-mounted weapons)                     |
 * | 3      | Low Law     | Heavy weapons                                                             |
 * | 4      | Medium Law  | Light assault weapons and submachine guns                                 |
 * | 5      | Medium Law  | Personal concealable weapons                                              |
 * | 6      | Medium Law  | All firearms except shotguns and stunners; carrying weapons discouraged   |
 * | 7      | High Law    | Shotguns                                                                  |
 * | 8      | High Law    | All bladed weapons, stunners                                              |
 * | 9      | High Law    | Any weapons outside one's residence; candidate for Amber Zone status      |
 * | 10(A)+ | Extreme Law | Any weapons allowed at all; candidate for Amber Zone status               |
 * 
 * @param {*} governmentCode 
 * @returns 
 */
function generateLawLevelCode(governmentCode) {
    //console.log("Government Code In To Law Level: " + governmentCode + "")
    if (governmentCode == 0) {
        return 0;
    }

    let roll = rollADice(2,12);
    roll = roll -7;
    
    if (roll < 0) {
        roll = 0;
    }
    
    if (governmentCode == "A") {
        governmentCode = 10;
    }
        
    roll = (roll * 1) + (governmentCode * 1);
    
    let lawCode = '';

    if (roll <= 0) {
        lawCode = "0";
    }
    if (roll == 1) {
        lawCode = "1";
    }
    if (roll == 2) {
        lawCode = "2";
    }
    if (roll == 3) {
        lawCode = "3";
    }
    if (roll == 4) {
        lawCode = "4";
    }
    if (roll == 5) {
        lawCode = "5";
    }
    if (roll == 6) {
        lawCode = "6";
    }
    if (roll == 7) {
        lawCode = "7";
    }
    if (roll == 8) {
        lawCode = "8";
    }
    if (roll == 9) {
        lawCode = "9";
    }
    if (roll == 10) {
        lawCode = "A";
    }
    if (roll == 11) {
        lawCode = "B";
    }
    if (roll == 12) {
        lawCode = "C";
    }
    if (roll == 13) {
        lawCode = "D";
    }
    if (roll == 14) {
        lawCode = "E";
    }
    if (roll >= 15) {
        lawCode = "F";
    }

    return lawCode;
}

/**
 * Many worlds have starports, their presence being essential to interstellar trade and commerce. To determine the world's primary starport, roll 2D6-7 and add the world's Population value. 
 * Compare the result to the Primary Starport table to determine the starport class for the world. Each starport class offers different levels of service. The Starport Class Services table provides more specific details. 

| Roll | Starport Class |
| :--- | :------------- |
| 2    | X              |
| 3    | E              |
| 4    | E              |
| 5    | D              |
| 6    | D              |
| 7    | C              |
| 8    | C              |
| 9    | B              |
| 10   | B              |
| 11+  | A              |

| Class | Descriptor | Best Fuel | Annual Maint. | Shipyard Capacity                         | Possible Bases |
| :---- | :--------- | :-------- | :------------ | :---------------------------------------- | :------------- |
| A     | Excellent  | Refined   | Yes           | Can construct starships and non-starships | Naval, Scout   |
| B     | Good       | Refined   | Yes           | Can construct non-starships               | Naval, Scout   |
| C     | Routine    | Unrefined | No            | Can perform reasonable repairs            | Scout          |
| D     | Poor       | Unrefined | No            | None                                      | Scout          |
| E     | Frontier   | None      | No            | None                                      | None           |
| X     | None       | None      | No            | None                                      | None           |
 * @returns 
 */
function generateStarportCode(populationCode) {
    let roll = rollADice(2,12);
    roll = roll -7;

    if (populationCode === "A") {
        populationCode = 10;
    }

    if (roll < 0) {
        roll = 0;
    }
    roll = (roll * 1) + (populationCode * 1);
    let starportCode = '';

    if (roll <= 2) {
        starportCode = "X";
    }
    if (roll == 3 || roll == 4) {
        starportCode = "E";
    }
    if (roll == 5 || roll == 6) {
        starportCode = "D";
    }
    if (roll == 7 || roll == 8) {
        starportCode = "C";
    }
    if (roll == 9 || roll == 10) {
        starportCode = "B";
    }
    if (roll >= 11) {
        starportCode = "A";
    }

    if (starportCode == '') {
        starportCode = 'X';
        console.log("ERROR: Starport Code (pop code: "+populationCode+" roll: "+roll+") not found. Defaulting to X");
    }
    return starportCode;
}

/**
 * 
 * | Value  | Starport | Size | Atmosphere | Hydrographics | Population | Government |
 * | :----- | :------- | :--- | :--------- | :------------ | :--------- | :--------- |
 * | 0      |          | +2   | +1         | +1            |            | +1         |
 * | 1      |          | +2   | +1         |               | +1         |            |
 * | 2      |          | +1   | +1         |               | +1         |            |
 * | 3      |          | +1   | +1         |               | +1         |            |
 * | 4      |          | +1   |            |               | +1         |            |
 * | 5      |          |      |            |               | +1         | +1         |
 * | 6      |          |      |            |               |            |            |
 * | 7      |          |      |            |               |            | +2         |
 * | 8      |          |      |            |               |            |            |
 * | 9      |          |      |            | +1            | +1         |            |
 * | 10 (A) | +6       |      | +1         | +2            | +2         |            |
 * | 11 (B) | +4       |      | +1         |               | +3         |            |
 * | 12 (C) | +2       |      | +1         |               | +4         |            |
 * | 13 (D) |          |      | +1         |               |            | –2         |
 * | 14 (E) |          |      | +1         |               |            | –2         |
 * | X      | –4       |      |            |               |            |            |
 * 
 * 
 * @param {*} starportCode 
 * @param {*} worldSize 
 * @param {*} atmosphereCode 
 * @param {*} hydrographicCode 
 * @param {*} populationCode 
 * @param {*} governmentCode 
 */
function generateTechLevelModifier(starportCode, worldSize, atmosphereCode, hydrographicCode, populationCode, governmentCode) {

    //console.log("Starport Code In To Tech Level Modifier: " + starportCode + "")
    //starport
    let starportModifier = 0;
    if (starportCode == "A") {
        starportModifier = 6;
    }
    if (starportCode == "B") {
        starportModifier = 4;
    }
    if (starportCode == "C") {
        starportModifier = 2;
    }
    if (starportCode == "X") {
        starportModifier = -4;
    }
    //console.log("Starport Modifier: " + starportModifier + "")

    //console.log("World Size In To Tech Level Modifier: " + worldSize + "")
    //worldSize
    let worldSizeModifier = 0;
    if (worldSize == "0") {
        worldSizeModifier = 2;
    }
    if (worldSize == "1") {
        worldSizeModifier = 2;
    }
    if (worldSize == "2") {
        worldSizeModifier = 1;
    }
    if (worldSize == "3") {
        worldSizeModifier = 1;
    }
    if (worldSize == "4") {
        worldSizeModifier = 1;
    }
    //console.log("World Size Modifier: " + worldSizeModifier + "")

    //console.log("Atmosphere Code In To Tech Level Modifier: " + atmosphereCode + "")
    //atmosphere
    let atmosphereModifier = 0;
    if (atmosphereCode == 0 || atmosphereCode == 1 || atmosphereCode == 2 || atmosphereCode == 3 || atmosphereCode == "A" || atmosphereCode == "B" || atmosphereCode == "C" || atmosphereCode == "D" || atmosphereCode == "E") {
        atmosphereModifier = 1;
    }
    //console.log("Atmosphere Modifier: " + atmosphereModifier + "")

    //console.log("Hydrographics Code In To Tech Level Modifier: " + hydrographicCode + "")
    //hydrographics
    let hydrographicsModifier = 0;
    if (hydrographicCode == 0 || hydrographicCode == 9 || hydrographicCode == "A") {
        hydrographicsModifier = 1;
    }
    //console.log("Hydrographics Modifier: " + hydrographicsModifier + "")

    //console.log("Population Code In To Tech Level Modifier: " + populationCode + "")
    //population
    let populationModifier = 0;
    if (populationCode == 1 || populationCode == 2 || populationCode == 3 || populationCode == 4 || populationCode == 5 || populationCode == 9) {
        populationModifier = 1;
    }
    if (populationCode == "A") {
        populationModifier = 2;
    }
    if (populationCode == "B") {
        populationModifier = 3;
    }
    if (populationCode == "C") {
        populationModifier = 4;
    }
    //console.log("Population Modifier: " + populationModifier + "")

    //console.log("Government Code In To Tech Level Modifier: " + governmentCode + "")
    //government
    let governmentModifier = 0;
    if (governmentCode == 0 || governmentCode == 5) {
        governmentModifier = 1;
    }
    if (governmentCode == 7) {
        governmentModifier = 2;
    }
    if (governmentCode == "D" || governmentCode == "E") {
        governmentModifier = -2;
    }
    //console.log("Government Modifier: " + governmentModifier + "")

    let techLevelModifier = starportModifier + worldSizeModifier + atmosphereModifier + hydrographicsModifier + populationModifier + governmentModifier;
    //console.log("Tech Level Modifier: " + techLevelModifier + "")
    return techLevelModifier;
}

/**
 * | Conditions                                            | Minimum TL |
 * | :---------------------------------------------------- | :--------- |
 * | Hydrographics is 0 or 10(A), Population is at least 6 | 4          |
 * | Atmosphere is 4, 7 or 9                               | 5          |
 * | Atmosphere is 3 or less, or 10(A)-12(C)               | 7          |
 * | Atmosphere is 13(D) or 14(E), Hydrographics is 10(A)  | 7          |
 * @returns 
 */
function generateTechLevelCode(techModifier, hydrographicCode, populationCode, atmosphereCode) {
    let techLevelCode = 0;
    let roll = rollADice(1,6);
    techLevelCode = roll + techModifier;
    
    // defaults
    if (hydrographicCode == "0" || hydrographicCode == "A" && populationCode >= 6) {
        if (techLevelCode < 4) {
        // console.log("TechLevelCode: " + techLevelCode + " Defaulting to TL 4");
        techLevelCode = 4;
        }
        
    }
    if (atmosphereCode == "4" || atmosphereCode == "7" || atmosphereCode == "9")  {
        if (techLevelCode < 5) {
        // console.log("TechLevelCode: " + techLevelCode + " Defaulting to TL 5");
        techLevelCode = 5;
        }
    }
    if (atmosphereCode <= "3" || atmosphereCode == "A" || atmosphereCode == "B" || atmosphereCode == "C") {
        if (techLevelCode < 7) {
        // console.log("TechLevelCode: " + techLevelCode + " Defaulting to TL 7");
        techLevelCode = 7;
        }
    }
    if (atmosphereCode == "D" || atmosphereCode == "E" && hydrographicCode == "A") {
        if (techLevelCode < 7) {
        // console.log("TechLevelCode: " + techLevelCode + " Defaulting to TL 7");
        techLevelCode = 7;
        }
    }

    return techLevelCode;
}

/**
 * 
##### Bases

Stellar systems may have bases for military forces, the navy, the scouts, or for other arms of interstellar government. Bases can help determine political boundaries within a given region of space. An interstellar government will place bases along its borders to guard against aggression from rival states, or to control local systems. The presence of multiple bases within a few parsecs might indicate a contested border, or a mighty stronghold. While other bases may exist, the two primary bases are the Naval Base and the Scout Base.

###### Naval Base

A naval base is a supply depot, refueling station, repair yard or fortress of the Navy. Naval vessels can obtain refined fuel and supplies here. If a world possesses a Class-A or Class-B starport, throw 8+ on 2D6 to determine the presence of a naval base in the system.

###### Scout Base

A scout base or outpost offers refined fuel and supplies to scout ships. If a world does not possess a Class-E or Class-X starport, throw 7+ on 2D6 to determine the presence of a scout base in the system. This roll suffers a DM -1 if the world has a Class-C starport, a DM -2 for a Class-B starport and a DM -3 for a Class-A starport.

###### Pirate Base

A pirate base serves as a haven for interstellar pirates. If a world does not possess a Class-A starport or a naval base, throw 12+ on 2D6 to determine the presence of a pirate base in the system.

###### Base Codes

The presence of one or more bases is designated on the hex map with a base code in the upper-left of the world hex. The Base Codes table identifies which note-worthy bases, if any, are present


| Code | Description                        |
| :--- | :--------------------------------- |
| A    | Naval Base and Scout Base/Outpost  |
| G    | Low Tech Base                      |
| N    | Naval Base                         |
| P    | Pirate Base                        |
| S    | Scout Base/Outpost                 |
 * @returns 
 */
function generateOrbitalStarbasesCode(starportCode, techLevelCode) {
    const roll = rollADice(2,12);

    if (starportCode == "A" || starportCode == "B") {
        if (roll >= 8) {
            return "A";
        }
    }

    if (starportCode == "E" || starportCode == "X") {
        if (roll >= 7) {
            return "S";
        }
    }

    if (starportCode != "A") {
        if (roll >= 12) {
            return "P";
        }
    }

    if (techLevelCode <= 7) {
        if (roll >= 8) {
            return "G";
        }
    }

    return 0;
}

/**
 * 
 * | Classification   | Code | Size | Atmos.    | Hydro | Pop. | Gov. | Law  | TL   |
 * | :--------------- | :--- | :--- | :-------- | :---- | :--- | :--- | :--- | :--- |
 * | Agricultural     | Ag   |      | 4–9       | 4–8   | 5–7  |      |      |      |
 * | Asteroid         | As   | 0    | 0         | 0     |      |      |      |      |
 * | Barren           | Ba   |      |           |       | 0    | 0    | 0    |      |
 * | Desert           | De   |      | 2+        | 0     |      |      |      |      |
 * | Fluid Oceans     | Fl   |      | 10+       | 1+    |      |      |      |      |
 * | Garden           | Ga   |      | 5,6,8     | 4–9   | 4–8  |      |      |      |
 * | High Population  | Hi   |      |           |       | 9+   |      |      |      |
 * | High Technology  | Ht   |      |           |       |      |      |      | 12+  |
 * | Ice-Capped       | Ic   |      | 0–1       | 1+    |      |      |      |      |
 * | Industrial       | In   |      | 0–2,4,7,9 |       | 9+   |      |      |      |
 * | Low Population   | Lo   |      |           |       | 1–3  |      |      |      |
 * | Low Technology   | Lt   |      |           |       |      |      |      | 5–   |
 * | Non-Agricultural | Na   |      | 0–3       | 0–3   | 6+   |      |      |      |
 * | Non-Industrial   | Ni   |      |           |       | 4–6  |      |      |      |
 * | Poor             | Po   |      | 2–5       | 0–3   |      |      |      |      |
 * | Rich             | Ri   |      | 6,8       |       | 6–8  |      |      |      |
 * | Water World      | Wa   |      |           | 10    |      |      |      |      |
 * | Vacuum           | Va   |      | 0         |       |      |      |      |      |
 * |                  |      |      |           |       |      |      |      |      |
 * 
 * 
 * @returns 
 * 
 */
function generateTradeCodes(worldSize, atmosphereCode, hydrographicCode, populationCode, governmentCode, lawCode, techLevelCode) {
    let tradeCodes = {};

    //convert codes to letters if needed
    atmosphereCode = convertLetters(atmosphereCode);
    hydrographicCode = convertLetters(hydrographicCode);
    populationCode = convertLetters(populationCode);
    governmentCode = convertLetters(governmentCode);
    lawCode = convertLetters(lawCode);
    techLevelCode = convertLetters(techLevelCode);


    // Vacuum
    if (atmosphereCode == "0") {
        tradeCodes["Va"] = "Vacuum";
    }

    // Agricultural
    if (atmosphereCode == "4" || atmosphereCode == "5" || atmosphereCode == "6" || atmosphereCode == "7" || atmosphereCode == "8" || atmosphereCode == "9") {
        if (hydrographicCode == "4" || hydrographicCode == "5" || hydrographicCode == "6" || hydrographicCode == "7" || hydrographicCode == "8") {
            if (populationCode == "5" || populationCode == "6" || populationCode == "7") {
                tradeCodes["Ag"] = "Agricultural";
            }
        }
    }

    // Barren
    if (hydrographicCode == "0" && governmentCode == "0" && lawCode == "0") {
        tradeCodes["Ba"] = "Barren";
    }

    // Asteroid
    if (worldSize == "0" && atmosphereCode == "0" && hydrographicCode == "0") {
        tradeCodes["As"] = "Asteroid";
    }

    // Desert
    if (atmosphereCode == "2" || atmosphereCode == "3" || atmosphereCode == "4" || atmosphereCode == "5" || atmosphereCode == "6" || atmosphereCode == "7" || atmosphereCode == "8" || atmosphereCode == "9" || atmosphereCode == "A") {
        if (hydrographicCode == "0") {
            tradeCodes["De"] = "Desert";
        }
    }

    // Fluid Oceans
    if (atmosphereCode == "A" || atmosphereCode == "B" || atmosphereCode == "C" || atmosphereCode == "D" || atmosphereCode == "E" || atmosphereCode == "F") {
        if (hydrographicCode == "A" || hydrographicCode >= "1") {
            tradeCodes["Fl"] = "Fluid Oceans";
        }
    }

    // Garden
    if (atmosphereCode == "5" || atmosphereCode == "6" || atmosphereCode == "8") {
        if (hydrographicCode == "4" || hydrographicCode == "5" || hydrographicCode == "6" || hydrographicCode == "7" || hydrographicCode == "8" || hydrographicCode == "9") {
            if (populationCode == "4" || populationCode == "5" || populationCode == "6" || populationCode == "7" || populationCode == "8") {
                tradeCodes["Ga"] = "Garden";
            }
        }
    }

    // High Population
    if (populationCode == "9" || populationCode == "A" || populationCode == "B" || populationCode == "C" || populationCode == "D" || populationCode == "E" || populationCode == "F") {
        tradeCodes["Hi"] = "High Population";
    }

    // High Technology
    if (techLevelCode == "C" || techLevelCode == "D" || techLevelCode == "E" || techLevelCode == "F") {
        tradeCodes["Ht"] = "High Technology";
    }else if (techLevelCode > 9) {
        console.log('Very High Tech Level Investigate this bug: ' + techLevelCode);
    }

    // Ice-Capped
    if (atmosphereCode == "0" || atmosphereCode == "1") {
        if (hydrographicCode == "A" || hydrographicCode >= "1") {
            tradeCodes["Ic"] = "Ice-Capped";
        }
    }

    // Industrial
    if (atmosphereCode == "0" || atmosphereCode == "1" || atmosphereCode == "2" || atmosphereCode == "4" || atmosphereCode == "7" || atmosphereCode == "9") {
        if (populationCode == "9" || populationCode == "A" || populationCode == "B" || populationCode == "C" || populationCode == "D" || populationCode == "E" || populationCode == "F") {
            tradeCodes["In"] = "Industrial";
        }
    }

    // Low Population
    if (populationCode == "1" || populationCode == "2" || populationCode == "3") {
        tradeCodes["Lo"] = "Low Population";
    }

    // Low Technology
    if (techLevelCode == "0" || techLevelCode == "1" || techLevelCode == "2" || techLevelCode == "3" || techLevelCode == "4") {
        tradeCodes["Lt"] = "Low Technology";
    }

    // Non-Agricultural
    if (atmosphereCode == "0" || atmosphereCode == "1" || atmosphereCode == "2" || atmosphereCode == "3") {
        if (hydrographicCode == "0" || hydrographicCode == "1" || hydrographicCode == "2" || hydrographicCode == "3") {
            if (populationCode == "6" || populationCode == "7" || populationCode == "8" || populationCode == "9" || populationCode == "A" || populationCode == "B" || populationCode == "C" || populationCode == "D" || populationCode == "E" || populationCode == "F") {
                tradeCodes["Na"] = "Non-Agricultural";
            }
        }
    }

    // Non-Industrial
    if (populationCode == "4" || populationCode == "5" || populationCode == "6") {
        tradeCodes["Ni"] = "Non-Industrial";
    }

    // Poor
    if (atmosphereCode == "2" || atmosphereCode == "3" || atmosphereCode == "4" || atmosphereCode == "5") {
        if (hydrographicCode == "0" || hydrographicCode == "1" || hydrographicCode == "2" || hydrographicCode == "3") {
            tradeCodes["Po"] = "Poor";
        }
    }

    // Rich
    if (atmosphereCode == "6" || atmosphereCode == "8") {
        if (populationCode == "6" || populationCode == "7" || populationCode == "8") {
            tradeCodes["Ri"] = "Rich";
        }
    }

    // Water World
    if (hydrographicCode == "A") {
        tradeCodes["Wa"] = "Water World";
    }

    // Uninhabited
    if (populationCode == "0") {
        tradeCodes["Un"] = "Uninhabited";
    }

    let returnCodes = ' ';
    for (const [key, value] of Object.entries(tradeCodes)) {
        returnCodes = returnCodes + key + " ";
        // console.log(key, value);
    }

    return returnCodes;
}

//will return G, A, or R
// G for green
// A for amber
// R for red
function generateTravelZoneCode(governmentCode, populationCode, lawCode, techLevelCode) {
    if (populationCode == 0) {
        return "C";
    }
    if (governmentCode == "F") {
        return "R";
    }
    if (lawCode == "9" || lawCode == "A" || lawCode == "B" || lawCode == "C" || lawCode == "D") {
        return "A";
    }
    if (techLevelCode == "0" || techLevelCode == "1" || techLevelCode == "2" || techLevelCode == "3" || techLevelCode == "4" || techLevelCode == "5") {
        return "A";
    }


    // default to Green
    return "G"
}

// IF uninhabited but habitable (or dominateLifeForm by animal life)

function createUninhabitedGWP(gravity, atmosphericPressure, hydrosphere) {
    const starport = 0;
    const worldSize = generateWorldSizeCode(gravity);
    const atmosphere = generateAtmosphereCode(atmosphericPressure, worldSize);
    const hydrographics = generateHydrographicsCode(hydrosphere);
    const population = 0;
    const government = 0;
    const lawLevel = 0;
    const techLevel = 0;
    const orbitalStarbases = generateOrbitalStarbasesCode("X",0);
    const tradeCodes = 0;
    const travelZone = generateTravelZoneCode(0,0,0,0);

    const gwp = starport + worldSize + atmosphere + hydrographics + population + government + lawLevel + techLevel + " " + orbitalStarbases + "[" + tradeCodes + "]" + travelZone;
    return gwp;
}

/**
 * GM will place Kriost, Illithari, Celestar, and Drakneri as needed
 * 5% chance lesser species
 * 1% chance of new species
 * 93.99% chance of common species
 * 
 * |Common Species |
 * |-------------- |
 * | Berexar       |1
 * | Dwarf         |2
 * | Elf           |3
 * | Human         |4
 * | Gerex         |5
 * | Rakashan      |6
 * | Sovreki       |7
 * | Vandi         |8
 * | Virmine       |9
 * | Ves'Kari      |10
 * 
 * |Lesser Species |
 * |-------------- |
 * | Changeling    |1
 * | Centaurs      |2
 * | Genasi        |3
 * | Gith          |4
 * | Goliath       |5
 * | Goblin        |6
 * | Kitsune       |7
 * | Locatah       |8
 * | Tabaxi        |9
 * | Triton        |10
 * | Yuan-Ti       |11
 * 
 * | Other Species |
 * |-------------- |
 * | Drakneri      |
 * | Celestar      | 
 * | Illithari     |
 * | Kriost        |
 * | Synthar       |
 * 
 */
function selectHumanoidSpecies() {
    let roll = rollADice(1,100);
    let species = '';

    if (roll == 1) {
        roll = rollADice(1,100);
        if (roll == 1) {
            species = "Synthar";
        } else {
            species = "Unkown"
            //console.log("Create a new Species");
        }
    }

    if (roll >= 2 && roll <= 5) {
        roll = rollADice(1,11);
        switch (roll) {
            case 1:
                species = "Changeling";
                break;
            case 2:
                species = "Centaurs";
                break;
            case 3:
                species = "Genasi";
                break;
            case 4:
                species = "Gith";
                break;
            case 5:
                species = "Goliath";
                break;
            case 6:
                species = "Goblin";
                break;
            case 7:
                species = "Kitsune";
                break;
            case 8:
                species = "Locatah";
                break;
            case 9:
                species = "Tabaxi";
                break;
            case 10:
                species = "Triton";
                break;
            case 11:
                species = "Yuan-Ti";
                break;
        }
    }
    if (roll >= 6) {
        roll = rollADice(1,10);
        switch (roll) {
            case 1:
                species = "Berexar";
                break;
            case 2:
                species = "Dwarf";
                break;
            case 3:
                species = "Elf";
                break;
            case 4:
                species = "Human";
                break;
            case 5:
                species = "Gerex";
                break;
            case 6:
                species = "Rakashan";
                break;
            case 7:
                species = "Sovreki";
                break;
            case 8:
                species = "Vandi";
                break;
            case 9:
                species = "Virmine";
                break;
            case 10:
                species = "Ves'Kari";
                break;
        }
    }

    return species;

}

// // name generation

function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// function getRandomInt(min, max) {
//   	return Math.floor(Math.random() * (max - min)) + min;
// }

// function generateName(){
// 	var name1 = ["Liluri","4821 Niu Xiu","6799 Pegasi","Dilwica","Naunet","Lei-Zhen-Zi","Loni","1434 Araneae","Alklha","4555 Noctuae","Keliukis","Prano","Zachua","Zosim","Zoidi","Hun-Dun","2656 Revati","Gona","Zuli","Tartarus","Cronus","Supa","9097 Scuti","Loke","Wadjet","Usnon","6303 Jing Xiu","6076 Quadrati","Feri","2231 Ardra","Tale","5924 Shatabhisha","Teta","Nessa","7850 Felis","Ovoon","Ybyon","2159 Arietis","Groida","Amenhotep","Bori","Darca","Garia","Nane","Anor","Alreth","Bela","Mara","Manto","Daga","Cara","Dara","Inest","Amar","Ulstiss","Bacra","Nara","Bormai","Makua","Gendio","Dara","Aran","Solia","Anin","Tina","Corla","Aror","Dumea","Pane","Drana","Eta Lilii II","Arrin VII","Elnath VII","Morthra III","Omega Cassiopeiae Prime","Cargga V","Sartu Prime","Morkyo II","Rigel V","Kappa Herculis VI","Omega Orionis VI","Zoni II","Bajy VII","Omega Phoenicis Prime","Thuban VI","Xari IV","Alpha Columbae V","Straiusa IV","Muuhua IV","Hadar II","Vargi Prime","Dagon IV","3423 Bhadrapada V","Tr'Sychua","Zhu-Rong","Jori III","New Babylon","Nosa's World","Desse Kh'Zerza","8039 Centauri VII","Cori III","Dridi","New Madagascar","Vortu","Vani","Onan","Formi","New Kenor","Gullveig","New Amazon","Poa","Sleish","Kriot","Izlol","Zrunt","Jikils","Zleahi","Qucdooh","Maana","Elaltau","Oxol","Thams","Evlep","Uslua","Opriog","Prasduak","Limsop","Tretti","Ikaepdu","Slaonseh","Fets","Eshoog","Oxued","Jaut","Vuc","Maabosh","Uvliondets","Ovlerseo","Raoroph","Uriobsub","Cluy","Cio","Uclaunt","Glaa","Zaoth","Ujoimer","Glaklaens","Retoac","Fluabdon","Sutruad","Aprau","Onip","Keix","Bleom","Kraix","Treugsit","Piohur","Blabroics","Zaugdid","Acizra","Trip","Irualt","Yeuph","Idrab","Icoig","Greneft","Proarsok","Esrauyaft","Laegdeb","Tiurtoc","Caah","Ucroiph","Ocooks","Xil","Icuax","Vranei","Cloorru","Vueggix","Zruachuys","Eklozle","Evrint","Shox","Keum","Broam","Plio","Wizih","Vihler","Cleehlul","Silda","Plaaksuy","Slei","Shiks","Fluen","Streah","Imat","Uzlaandux","Yibsits","Cathao","Trazlum","Ezodroix","Zroh","Srop","Giuls","Feult","Qiuy","Zruantucs","Phaossuct","Giztiub","Meotre","Aduslan","Vlaib","Irex","Aku","Umag","Xeep","Straimek","Filloob","Crorrud","Uslalay","Crodraet"];

// 	var name2 = ["","",];

// 	var name = capFirst(name1[getRandomInt(0, name1.length + 1)]);
// 	return name;

// }


function romanize (num) {
    if (!+num) return false;
    var digits = String(+num).split('');
    var key = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM',
               '','X','XX','XXX','XL','L','LX','LXX','LXXX','XC',
               '','I','II','III','IV','V','VI','VII','VIII','IX'];
    var roman = '', i = 3;
    while (i--) roman = (key[+digits.pop() + (i * 10)] || '') + roman;
    return Array(+digits.join('') + 1).join('M') + roman;
  }
  
  function deromanize (str) {
    var str = str.toUpperCase();
    var validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/;
    var token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g;
    var key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    var num = 0, m;
    if (!(str && validator.test(str))) return false;
    while (m = token.exec(str)) num += key[m[0]];
    return num;
  }

function generateRandomStarName(minLength, maxLength, prefix = false, suffix = false) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const consonants = [
        'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
        'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'z'
    ];

    let name = '';

    // Determine the length of the name
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const pairsCount = Math.floor(length / 2);

    // Add random letters to the name
    for (let i = 0; i < pairsCount; i++) {
        let vowel = vowels[Math.floor(Math.random() * vowels.length)];
        let consonant = '';

        do {
            consonant = consonants[Math.floor(Math.random() * consonants.length)];
        } while (i === 0 && consonant === 'x');
            name += consonant + vowel;
    }

    name = capFirst(name);

    if (prefix) {
        name = prefix + ' ' + name;
    }
    if (suffix) {
        name = name + ' ' + suffix;
    }


    return name;
        
}


// // Arrays of syllables or words to create planet names
// const beginnings = ["Mer", "Ven", "Earth", "Mar", "Jup", "Sat", "Ura", "Nept"];
// const endings = ["is", "on", "tar", "tis", "nus", "to", "terra", "tune"];

// // Function to generate a random planet name
// function generateRandomName(minLength, maxLength, prefix = '', suffix = '') {
//   if (minLength <= 0 || maxLength < minLength) {
//     throw new Error("Invalid length parameters");
//   }

//   let name = '';
//   while (name.length < minLength) {
//     const beginning = beginnings[Math.floor(Math.random() * beginnings.length)];
//     const ending = endings[Math.floor(Math.random() * endings.length)];
//     name += beginning + ending;
//   }

//   // Trim the name to the maximum length
//   name = name.substring(0, maxLength);

//   // Add prefix and suffix
//   if (prefix) {
//     name = prefix + ' ' + name;
//   }
//   if (suffix) {
//     name = name + ' ' + suffix;
//   }

//   return name;
// }



// dictionaries

const baseMass = {
    "M" : {
        1 : 0.5,
        2 : 0.5,
        3 : 0.4,
        4 : 0.3,
        5 : 0.3,
        6 : 0.3,
        7 : 0.3,
        8 : 0.1,
        9 : 0.1,
        10: 0.1
    },
    "K" : {
        1 : 0.8,
        2 : 0.8,
        3 : 0.7,
        4 : 0.7,
        5 : 0.7,
        6 : 0.7,
        7 : 0.6,
        8 : 0.6,
        9 : 0.6,
        10: 0.5
    },
    "G" : {
        1 : 1.1,
        2 : 1,
        3 : 1,
        4 : 1,
        5 : 0.9,
        6 : 0.9,
        7 : 0.9,
        8 : 0.9,
        9 : 0.8,
        10: 0.8
    },
    "F" : {
        1 : 1.6,
        2 : 1.6,
        3 : 1.5,
        4 : 1.5,
        5 : 1.4,
        6 : 1.4,
        7 : 1.3,
        8 : 1.3,
        9 : 1.2,
        10: 1.1
    },
    "A" : {
        1 : 2.9,
        2 : 2.7,
        3 : 2.5,
        4 : 2.4,
        5 : 2.1,
        6 : 1.9,
        7 : 1.8,
        8 : 1.8,
        9 : 1.8,
        10: 1.7
    },
    "B" : {
        1 : 17.5,
        2 : 14.2,
        3 : 10.9,
        4 : 7.6,
        5 : 6.7,
        6 : 5.9,
        7 : 5.2,
        8 : 4.5,
        9 : 3.8,
        10: 3.4
    },
    "O" : {
        1 : 1.6,
        2 : 1.6,
        3 : 1.5,
        4 : 1.5,
        5 : 1.4,
        6 : 1.4,
        7 : 1.3,
        8 : 1.3,
        9 : 1.2,
        10: 1.1
    },
};

const classificationMass = {
    "I": {
        "M":37.4,
        "K":11.1,
        "G":5.7,
        "F":6.1,
        "A":5.0,
        "B":3.1,
        "O":1.8
    },
    "II": {
        "M":25.3,
        "K":5.9,
        "G":2.7,
        "F":4.4,
        "A":3.6,
        "B":2.4,
        "O":1.6
    },
    "III":{
        "M":17.1,
        "K":4.2,
        "G":2.2,
        "F":3.3,
        "A":2.8,
        "B":2.0,
        "O":1.4
    },
    "IV":{
        "M":9.1,
        "K":2.6,
        "G":1.6,
        "F":2.1,
        "A":1.9,
        "B":1.5,
        "O":1.2
    },
    "V":{
        "M":1,
        "K":1,
        "G":1,
        "F":1,
        "A":1,
        "B":1,
        "O":1
    },
    "VI":{
        "M":0.5,
        "K":0.7,
        "G":0.9,
        "F":0.8,
        "A":0.7,
        "B":0.5,
        "O":0.3
    },
}

const astronomicalObjects = {
    "M" : {
        1 : "0",
        2 : "D",
        3 : "T",
        4 : "A",
        5 : "I",
        6 : "G",
        7 : "0",
    },
    "K" : {
        1 : "0",
        2 : "D",
        3 : "T",
        4 : "A",
        5 : "I",
        6 : "G",
        7 : "0",
    },
    "G" : {
        1 : "0",
        2 : "D",
        3 : "T",
        4 : "A",
        5 : "I",
        6 : "G",
        7 : "0",
    },
    "F" : {
        1 : "0",
        2 : "D",
        3 : "T",
        4 : "A",
        5 : "I",
        6 : "G",
        7 : "0",
    },
    "A" : {
        1 : "0",
        2 : "D",
        3 : "T",
        4 : "A",
        5 : "I",
        6 : "G",
        7 : "0",
    },
    "B" : {
        1 : "0",
        2 : "D",
        3 : "T",
        4 : "A",
        5 : "I",
        6 : "G",
        7 : "0",
    },
    "O" : {
        1 : "D",
        2 : "T",
        3 : "A",
        4 : "I",
        5 : "G",
        6 : "0",
        7 : "0",
    },
}

/**
 * @param resourceCode
 * | D10  | **Radioactive Ores:** | **Low-Grade Ores:** | **Precious Gems:** | **Raw Crystals:** | **High-Grade Minerals:** |
 * | :--- | :-------------------- | :------------------ | :----------------- | :---------------- | :----------------------- |
 * | 1    | Uraninite             | Limonite            | Diamond            | Quartz            | Magnetite                |
 * | 2    | Pitchblende           | Bauxite             | Ruby               | Ametrine          | Rutile                   |
 * | 3    | Autunite              | Goethite            | Sapphire           | Citrine           | Cassiterite              |
 * | 4    | Carnotite             | Siderite            | Emerald            | Rose Quartz       | Chrysoberyl              |
 * | 5    | Torbernite            | Chalcopyrite        | Amethyst           | Smoky Quartz      | Scheelite                |
 * | 6    | Chalcolite            | Dolomite            | Aquamarine         | Celestite         | Apatite                  |
 * | 7    | Tyuyamunite           | Galena              | Opal               | Tourmaline        | Corundum                 |
 * | 8    | Coconinoite           | Sphalerite          | Topaz              | Fluorite          | Zircon                   |
 * | 9    | Rutherfordine         | Pyrrhotite          | Garnet             | Aventurine        | Muscovite                |
 * | 10   | Curite                | Cassiterite         | Jade               | Hematite          | Spodumene                |
 */
const resources1x10 = {
    2: {
        1: "Gold",
        2: "Mercury",
        3: "Silver",
        4: "Platinum",
    },
    
    3: {
        1: "Uraninite",
        2: "Pitchblende",
        3: "Autunite",
        4: "Carnotite",
        5: "Torbernite",
        6: "Chalcolite",
        7: "Tyuyamunite",
        8: "Coconinoite",
        9: "Rutherfordine",
        10: "Curite",
    },
    5: {
        1: "Diamond",
        2: "Ruby",
        3: "Sapphire",
        4: "Emerald",
        5: "Amethyst",
        6: "Aquamarine",
        7: "Opal",
        8: "Topaz",
        9: "Garnet",
        10: "Jade",
    },
    7: {
        1: "Quartz",
        2: "Ametrine",
        3: "Citrine",
        4: "Rose Quartz",
        5: "Smoky Quartz",
        6: "Celestite",
        7: "Tourmaline",
        8: "Fluorite",
        9: "Aventurine",
        10: "Hematite",
    },
    8: {
        1: "Magnetite",
        2: "Rutile",
        3: "Cassiterite",
        4: "Chrysoberyl",
        5: "Scheelite",
        6: "Apatite",
        7: "Corundum",
        8: "Zircon",
        9: "Muscovite",
        10: "Spodumene",
    },
    9: {
        1: "Limonite",
        2: "Bauxite",
        3: "Goethite",
        4: "Siderite",
        5: "Chalcopyrite",
        6: "Dolomite",
        7: "Galena",
        8: "Sphalerite",
        9: "Pyrrhotite",
        10: "Cassiterite",

    }
}

/**
 * @param resourceCode
 * | D100  | **Metal Ore (low-grade)** |
 * | ----- | ------------------------ |
 * | 1     | Lithium                  |
 * | 2-8   | Aluminium                |
 * | 9-15  | Cadmium                  |
 * | 16-22 | Chromium                 |
 * | 23-29 | Cobalt                   |
 * | 30-36 | Iron                     |
 * | 37-43 | Manganese                |
 * | 44-50 | Nickel                   |
 * | 51-57 | Selenium                 |
 * | 58-64 | Tin                      |
 * | 65-71 | Titanium                 |
 * | 72-78 | Vanadium                 |
 * | 79-85 | Zinc                     |
 * | 86-92 | Copper                   |
 * | 93-99 | Lead                     |
 * | 100   | Magnesium                |
 * 
 * | D100  | **Metal Ore (high-grade)** |  // 1-100
 * | ----- | ------------------------ |  // 1-100
 * | 01    | Dicobalt                 |  // 1
 * | 2-6   | Antimony                 |  // 5
 * | 7-11  | Arsenic                  |  // 5
 * | 12-16 | Bismuth                  |  // 5
 * | 17-21 | Indium                   |  // 5
 * | 22-26 | Molybdenum               |  // 5
 * | 27-31 | Niobium                  |  // 5
 * | 32-36 | Tantalum                 |  // 5
 * | 37-41 | Tellurium                |  // 5
 * | 42-46 | Tungsten                 |  // 5
 * | 47-51 | Gold                     |  // 5
 * | 52-56 | Mercury                  |  // 5
 * | 57-61 | Silver                   |  // 5
 * | 62-66 | Platinum                 |  // 5
 * | 67-71 | Iridium                  |  // 5
 * | 72-76 | Osmium                   |  // 5
 * | 77-81 | Palladium                |  // 5
 * | 82-86 | Rhodium                  |  // 5
 * | 87-91 | Lanthanum                |  // 5
 * | 92-96 | Europium                 |  // 5
 * | 97-99 | Rhenium                  |  // 3
 * | 100   | Tridanium                |  // 1
 * 
 */
const resources1x100 = {
    1: {
        1: "Lithium",
        2: "Aluminium",
        3: "Aluminium",
        4: "Aluminium",
        5: "Aluminium",
        6: "Aluminium",
        7: "Aluminium",
        8: "Aluminium",
        9: "Cadmium",
        10: "Cadmium",
        11: "Cadmium",
        12: "Cadmium",
        13: "Cadmium",
        14: "Cadmium",
        15: "Cadmium",
        16: "Chromium",
        17: "Chromium",
        18: "Chromium",
        19: "Chromium",
        20: "Chromium",
        21: "Chromium",
        22: "Chromium",
        23: "Cobalt",
        24: "Cobalt",
        25: "Cobalt",
        26: "Cobalt",
        27: "Cobalt",
        28: "Cobalt",
        29: "Cobalt",
        30: "Iron",
        31: "Iron",
        32: "Iron",
        33: "Iron",
        34: "Iron",
        35: "Iron",
        36: "Iron",
        37: "Manganese",
        38: "Manganese",
        39: "Manganese",
        40: "Manganese",
        41: "Manganese",
        42: "Manganese",
        43: "Manganese",
        44: "Nickel",
        45: "Nickel",
        46: "Nickel",
        47: "Nickel",
        48: "Nickel",
        49: "Nickel",
        50: "Nickel",
        51: "Selenium",
        52: "Selenium",
        53: "Selenium",
        54: "Selenium",
        55: "Selenium",
        56: "Selenium",
        57: "Selenium",
        58: "Tin",
        59: "Tin",
        60: "Tin",
        61: "Tin",
        62: "Tin",
        63: "Tin",
        64: "Tin",
        65: "Titanium",
        66: "Titanium",
        67: "Titanium",
        68: "Titanium",
        69: "Titanium",
        70: "Titanium",
        71: "Titanium",
        72: "Vanadium",
        73: "Vanadium",
        74: "Vanadium",
        75: "Vanadium",
        76: "Vanadium",
        77: "Vanadium",
        78: "Vanadium",
        79: "Zinc",
        80: "Zinc",
        81: "Zinc",
        82: "Zinc",
        83: "Zinc",
        84: "Zinc",
        85: "Zinc",
        86: "Copper",
        87: "Copper",
        88: "Copper",
        89: "Copper",
        90: "Copper",
        91: "Copper",
        92: "Copper",
        93: "Lead",
        94: "Lead",
        95: "Lead",
        96: "Lead",
        97: "Lead",
        98: "Lead",
        99: "Lead",
        100: "Magnesium",
    },
    4: {
        // contains 1-100 of high grade ores from docblock above
        1: "Dicobalt",
        2: "Antimony",
        3: "Antimony",
        4: "Antimony",
        5: "Antimony",
        6: "Antimony",
        7: "Arsenic",
        8: "Arsenic",
        9: "Arsenic",
        10: "Arsenic",
        11: "Arsenic",
        12: "Bismuth",
        13: "Bismuth",
        14: "Bismuth",
        15: "Bismuth",
        16: "Bismuth",
        17: "Indium",
        18: "Indium",
        19: "Indium",
        20: "Indium",
        21: "Indium",
        22: "Molybdenum",
        23: "Molybdenum",
        24: "Molybdenum",
        25: "Molybdenum",
        26: "Molybdenum",
        27: "Niobium",
        28: "Niobium",
        29: "Niobium",
        30: "Niobium",
        31: "Niobium",
        32: "Tantalum",
        33: "Tantalum",
        34: "Tantalum",
        35: "Tantalum",
        36: "Tantalum",
        37: "Tellurium",
        38: "Tellurium",
        39: "Tellurium",
        40: "Tellurium",
        41: "Tellurium",
        42: "Tungsten",
        43: "Tungsten",
        44: "Tungsten",
        45: "Tungsten",
        46: "Tungsten",
        47: "Gold",
        48: "Gold",
        49: "Gold",
        50: "Gold",
        51: "Gold",
        52: "Mercury",
        53: "Mercury",
        54: "Mercury",
        55: "Mercury",
        56: "Mercury",
        57: "Silver",
        58: "Silver",
        59: "Silver",
        60: "Silver",
        61: "Silver",
        62: "Platinum",
        63: "Platinum",
        64: "Platinum",
        65: "Platinum",
        66: "Platinum",
        67: "Iridium",
        68: "Iridium",
        69: "Iridium",
        70: "Iridium",
        71: "Iridium",
        72: "Osmium",
        73: "Osmium",
        74: "Osmium",
        75: "Osmium",
        76: "Osmium",
        77: "Palladium",
        78: "Palladium",
        79: "Palladium",
        80: "Palladium",
        81: "Palladium",
        82: "Rhodium",
        83: "Rhodium",
        84: "Rhodium",
        85: "Rhodium",
        86: "Rhodium",
        87: "Lanthanum",
        88: "Lanthanum",
        89: "Lanthanum",
        90: "Lanthanum",
        91: "Lanthanum",
        92: "Europium",
        93: "Europium",
        94: "Europium",
        95: "Europium",
        96: "Europium",
        97: "Rhenium",
        98: "Rhenium",
        99: "Rhenium",
        100: "Tridanium",
    },
}

const systemFeatures = {
      1: "Precurosr Ruins",
      2: "Ancient Robot",
      3: "Ancient Ruins",
      4: "Artificial Moon",
      5: "Comet(s)",
      6: "Cross-planar Orbit",
      7: "Deep Space Lifeform",
      8: "Depleted Resources",
      9: "Derelict Ship",
     10: "Doomsday Planet",
     11: "Electromagnetic Atmospheric Conditions",
     12: "Generations-old Castaways",
     13: "Glowing Moon",
     14: "Micro Black Hole",
     15: "Micro Pulsar",
     16: "Mine Field",
     17: "Ringed Moon",
     18: "Unstable Planet",
     19: "Water Reservoir",
     20: "Temporal Anomaly",
     21: "Exotic Gas Giant",
     22: "Solar Flare Surges",
     23: "Quantum Crystal Formation",
     24: "Living Starship",
     25: "Magnetic Anomaly",
     26: "Mysterious Signals",
     27: "Frozen Civilization",
     28: "Living Nebula",
     29: "Space-time Rift",
     30: "Subspace Beacon",
     31: "Phantom Pirates",
     32: "Silicon-based Lifeforms",
     33: "Cryogenic Ship Graveyard",
     34: "Stellar Observatory",
     35: "Sentient Asteroid",
     36: "Temporal Dilation Zone",
     37: "Space-faring Pirates",
     38: "Quantum Anomaly Nexus",
     39: "Crystal Forest",
     40: "Nebula Nexus",
     41: "Cosmic Stormfront",
     42: "Quantum Garden",
     43: "Phantom Anomalies",
     44: "Timeless Observatory",
     45: "Gravity Forge",
     46: "Hyperspace Resonance",
     47: "Poltergeist Vortex",
     48: "Quantum Skyline",
     49: "Planetary Observatory",
     50: "Holographic Anomalies",
     51: "Time Dilation Oasis",
     52: "Cosmic Bard's Harp",
     53: "Starship Graveyard",
     54: "Quantum Echoes",
     55: "Skyborne Cities",
     56: "Quantum Lighthouse",
     57: "Celestial Library",
     58: "Temporal Nexus",
     59: "Nebular Sirens",
    100: "Precursor Artifact",
};


function convertNumbers(code) {
    //check if code is an integer
    if (code * 10 != NaN) {
        return code
    }

    //convert alpha code to number
    if (code === "A") {
        code = 10;
    }
    if (code === "B") {
        code = 11;
    }
    if (code === "C") {
        code = 12;
    }
    if (code === "D") {
        code = 13;
    }
    if (code === "E") {
        code = 14;
    }
    if (code === "F") {
        code = 15;
    }
    if (code === "G") {
        code = 16;
    }
    if (code === "H") {
        code = 17;
    }
    if (code === "I") {
        code = 18;
    }
    if (code === "J") {
        code = 19;
    }
    if (code === "K") {
        code = 20;
    }
    if (code === "L") {
        code = 21;
    }
    if (code === "M") {
        code = 22;
    }
    if (code === "N") {
        code = 23;
    }
    if (code === "O") {
        code = 24;
    }
    if (code === "P") {
        code = 25;
    }
    if (code === "Q") {
        code = 26;
    }
    if (code === "R") {
        code = 27;
    }
    if (code === "S") {
        code = 28;
    }
    if (code === "T") {
        code = 29;
    }
    if (code === "U") {
        code = 30;
    }
    if (code === "V") {
        code = 31;
    }
    if (code === "W") {
        code = 32;
    }
    if (code === "X") {
        code = 33;
    }
    if (code === "Y") {
        code = 34;
    }
    if (code === "Z") {
        code = 35;
    }
    return code;

}

function convertLetters(code) {
    //if its already a letter we don't need to do anything
    if (code < 10) {
        return code
    }
    if (code * 10 == NaN) {
        return code
    }

    if (code === 10) {
        code = "A";
    }
    if (code === 11) {
        code = "B";
    }
    if (code === 12) {
        code = "C";
    }
    if (code === 13) {
        code = "D";
    }
    if (code === 14) {
        code = "E";
    }
    if (code === 15) {
        code = "F";
    }
    if (code === 16) {
        code = "G";
    }
    if (code === 17) {
        code = "H";
    }
    if (code === 18) {
        code = "I";
    }
    if (code === 19) {
        code = "J";
    }
    if (code === 20) {
        code = "K";
    }
    if (code === 21) {
        code = "L";
    }
    if (code === 22) {
        code = "M";
    }
    if (code === 23) {
        code = "N";
    }
    if (code === 24) {
        code = "O";
    }
    if (code === 25) {
        code = "P";
    }
    if (code === 26) {
        code = "Q";
    }
    if (code === 27) {
        code = "R";
    }
    if (code === 28) {
        code = "S";
    }
    if (code === 29) {
        code = "T";
    }
    if (code === 30) {
        code = "U";
    }
    if (code === 31) {
        code = "V";
    }
    if (code === 32) {
        code = "W";
    }
    if (code === 33) {
        code = "X";
    }
    if (code === 34) {
        code = "Y";
    }
    if (code === 35) {
        code = "Z";
    }
    return code;
}
  

module.exports = mongoose.model('StarSystem', starSystemSchema);