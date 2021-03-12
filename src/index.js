const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express');


const socketIO = require('socket.io');


const app = express();
app.use(bodyParser.json())
app.use(cors());
const server = http.createServer(app);

const io = socketIO(server);

const port = process.env.PORT || 8095;

app.use(express.static(__dirname));


const houses = [
    {
        "id": 1,
        "name": "Lannister",
        "position": {
            "x": 260,
            "y": 470
        },
        "strength": 8,
        "flag": "lannister.png"
    },
    {
        "id": 2,
        "name": "Stark",
        "position": {
            "x": 220,
            "y": 250
        },
        "strength": 7,
        "flag": "stark.png"
    },
    {
        "id": 3,
        "name": "Targaryen",
        "position": {
            "x": 530,
            "y": 500
        },
        "strength": 9,
        "flag": "targaryen.png"
    },
    {
        "id": 4,
        "name": "Tyrell",
        "position": {
            "x": 180,
            "y": 440
        },
        "strength": 2,
        "flag": "tyrell.png"
    },
    {
        "id": 5,
        "name": "Greyjoy",
        "position": {
            "x": 110,
            "y": 380
        },
        "strength": 4,
        "flag": "greyjoy.png"
    },
    {
        "id": 6,
        "name": "White Walkers",
        "position": {
            "x": 120,
            "y": 50
        },
        "strength": 10,
        "flag": "night_king.png"
    }
]

let temp = houses

app.get('/api/v1/house', (req, res) => {
    res.send({
        "houses": houses
    })
})

app.post('/api/v1/house', (req, res) => {

    const reqHouse = req.body
    temp = temp.map(h => {
        return h.id === reqHouse.id ? reqHouse : h
    })

    res.send({
        "houses": houses
    })
})

app.get('/api/v1/random', (req, res) => {

    const randHouse = temp[Math.floor(Math.random() * houses.length)];
    const max = 10;
    const min = 5;
    const randSteps = randHouse.name !== 'Lannister'
        ? Math.floor(Math.random() * (max - min) + min) * randHouse.strength : 0;

    res.send({
        house: randHouse,
        steps: randSteps
    })
})


server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
