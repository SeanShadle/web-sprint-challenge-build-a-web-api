const express = require('express');
const morgan = require('express');
const server = express();

server.get('/', (req, res) => {
    res.send(`<h2>API</h2>`);
  });
  
server.use(express.json());
server.use(morgan('dev'));

server.get("*", (req, res) => {
    res.status(404).json({message: "Not found"})
});

server.use((error, req, res, next) => {
    res.status(500).json({message: error})
});