const TestModel = require('../models/test');
const StarSystem = require('../models/StarSystem');
const jsonToTsv = require('../models/convertJSONToTSV');

const express = require('express');
const router = express.Router()
module.exports = router;

//Post Method
router.post('/postTest', async (req, res) => {
    const data = new TestModel({
       name: req.body.name
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);

    }catch(error) {
        res.status(400).json({message: error.message});
    }
});

//Post Method
router.post('/postStarSystem', async (req, res) => {
    const data = new StarSystem({
        domain: req.body.domain,
        sector: req.body.sector,
        subsector: req.body.subsector,
        name: req.body.name,
        column: req.body.column,
        row: req.body.row, 
    })

    data.gsp =  data.domain + data.sector + data.subsector + 
        " " + data.column+data.row + 
        " " + data.numberOfStars.toString() + data.primaryStarType + data.starProgress + data.starLuminosity + data.starMass +
        " " + data.zoneNear + data.zoneInner + data.zoneHabitable + data.zoneOuter1 + data.zoneOuter2 + data.zoneOuter3 + data.zoneFar1 +
        data.zoneFar2 + data.zoneFar3 + data.zoneFar4   
    
    try {
        //const dataToSave = await data.save();
        res.status(200).json(data);

    }catch(error) {
        res.status(400).json({message: error.message});
    }
});

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await TestModel.find();
        res.json(data);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
});

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
});

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
});

//Post Method
router.post('/generateSubsector', async (req, res) => {
    //a subsector should determine randomly how many systems have planets between 25-55 of them out of 80 hexes
    //then it should take that number, create a unique column and row combination columns 01-08 rows 01-10
    //then it should in a for loop create a system for each one
    //then return the entire subsector
    let systems = randomNumber(35,55);
    let systemCoords = [];
    let subsector = {};
    
    for(let i = 0; i < systems; i++){
        let column = randomNumber(1,8).toFixed(0);
        let row =  randomNumber(1,10).toFixed(0);

        if (column < 10) column = '0' + column;
        if (row < 10) row = '0' + row;

        systemCoords[i] = column + '-' + row;
        
    }

    
    // Step 1: Convert to sortable format (split and parse)
    const sortableValues = systemCoords.map(value => {
        const [column, row] = value.split('-').map(Number);
        return { value, column, row };
    });
    
    // Step 2: Sort the values based on column and row
    sortableValues.sort((a, b) => {
        if (a.column === b.column) {
        return a.row - b.row;
        }
        return a.column - b.column;
    });
    
    // Step 3: Use a Set to remove duplicates
    const uniqueSortedValues = [...new Set(sortableValues.map(item => item.value))];

    let count = 0;
    for (const value of uniqueSortedValues) {
        let coords = value.split('-');
        let system = new StarSystem({
            domain: req.body.domain,
            sector: req.body.sector,
            subsector: req.body.subsector,
            // name: randomSystemName(),
            column: coords[0],
            row: coords[1], 
        })

        system.gsp =  system.subsector +
        " " + system.column+system.row + 
        " " + system.numberOfStars.toString() + system.primaryStarType + system.starProgress + system.starLuminosity + system.starMass +
        " " + system.zoneNear + system.zoneInner + system.zoneHabitable + system.zoneOuter1 + system.zoneOuter2 + system.zoneOuter3 + system.zoneFar1 +
        system.zoneFar2 + system.zoneFar3 + system.zoneFar4;

        //const dataToSave = await system.save();
        subsector[count] = system;
        count++;
    }
    
    try {
        res.status(200).json(subsector);

    }catch(error) {
        res.status(400).json({message: error.message});
    }
});

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function randomSystemName() {
    let name = '';
    let vowels = ['a','e','i','o','u'];
    let consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q',
    'r','s','t','v','w','x','y','z'];

    let length = randomNumber(2,5).toFixed(0);

    for(let i = 0; i < length; i++){
        if(i % 2 == 0){
            name += consonants[randomNumber(0,consonants.length).toFixed(0)];
        } else {
            name += vowels[randomNumber(0,vowels.length).toFixed(0)];
        }
    }
    if (name === undefined || name === null || name === '') randomSystemName();
    return name;
}

