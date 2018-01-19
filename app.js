'use strict';

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let app = express();
let listRoute = require('./routes/listRoute');

// Establish Public Folder
app.use(express.static('public'));



// Set 'pug' as view engine
app.set('view engine','pug');
app.set('views','./views');

//Body Parser middleware
app.use(bodyParser.urlencoded({
  extended: true
}));

// Routes
app.use('/',listRoute);



// Listen on Port 80
app.listen(80);
