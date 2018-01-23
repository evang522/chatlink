'use strict';

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chatlink');
mongoose.connection.on('connected', () => {
  console.log('db connected');
});