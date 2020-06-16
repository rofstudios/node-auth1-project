let express = require('express');
let helmet = require('helmet');

let server = express();

server.use(helmet());
server.use(express.json());

server.get('/api', (req, res) => {
    res.status(200).json({ api: "up" })
})

module.exports = server;