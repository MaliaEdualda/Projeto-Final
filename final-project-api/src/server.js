const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`API iniciada: http://localhost:${PORT}`);
});