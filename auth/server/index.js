const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');


// DB setup
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true });


// Setup express middleware
app.use(morgan('combined')); // This is a logging framework
app.use(cors());
app.use(bodyParser.json({ type: '*/*'})); // Parses incoming requires - to json
router(app);


// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on:', port);
