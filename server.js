const express = require('express');
const morgan = require('express');
const server = express();

const projectRouter = require('./data/helpers/projectRouter');
const actionRouter = require('./data/helpers/actionRouter');

server.get('/', (req, res) => {
    res.send(`<h2>API</h2>`);
  });
  
server.use(morgan('dev'));
server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get("*", (req, res) => {
    res.status(404).json({message: "Not found"})
});

server.use((error, req, res, next) => {
    res.status(500).json({message: error})
});

module.exports = server;