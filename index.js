require('dotenv').config();

//Vars
const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const people = require('./people.json');
const subsector = require('./subsector.json');
const port = process.env.PORT // 3000

// mongoose.connect(mongoString);
// const database = mongoose.connection;

// // check connection
// database.on('error', (error) => {
//     console.log(error);
// });

// database.once('connected', () => {
//     console.log('Database Connected');
// });


//App
const app = express();
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.json());

//api routes
app.use('/api', routes);

//html routes

//root
app.get('/', (req, res) => {
    res.render('subsector_print', {title: 'Complete Subsector', subsector: subsector});
});

//profile
app.get('/profile/', (req, res) => {
    const person = people.profiles.find(p => p.id === req.query.id);
  res.render('profile', {
    title: `About ${person.firstname} ${person.lastname}`,
    person,
  });
});

//subsector
app.get('/subsector/', (req, res) => {
    res.render('subsector', {title: 'Subsector', subsector: subsector});
});

//system
app.get('/system/', (req, res) => {
    const queryId = req.query.id;
    const systemKeys = Object.keys(subsector);

    for (const key of systemKeys) {
        const system = subsector[key];
        if (system._id === queryId) {
            return res.render('system', {title: system.gsp, system});
        }
    }
});

//system
app.get('/subsector_print/', (req, res) => {
    res.render('subsector_print', {title: 'Complete Subsector', subsector: subsector});
});

//test gen system
app.get('/getSystem/',async (req, res) => {
    try {
        // Make a GET request to your own API (assuming it's running on a different server)
        const response = await fetch('http://localhost:3000/api/getStarSystem');
        const systemData = await response.json();
    
        // Render the Pug template and pass the systemData as a variable
        res.render('system', { system: systemData });
      } catch (error) {
        console.error('Error fetching star system data:', error);
        res.status(500).send('Error fetching star system data');
      }
});

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
});