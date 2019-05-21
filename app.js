const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const apiRoutes = require('./routes/index');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.use('/api/v1', apiRoutes);
app.use(helmet());

module.exports = app;
