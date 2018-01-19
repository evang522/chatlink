'use strict';

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lists');
mongoose.connection.on('connected', () => {
  console.log('db connected');
});