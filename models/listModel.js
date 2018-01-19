'use strict';

let mongoose = require('mongoose');


let ListSchema = mongoose.Schema({
  identifier: {
    type:String
  },
  listitems: {
    type:Array
  },
  title: {
    type:String
  }
}
);

let List = module.exports = mongoose.model('List', ListSchema);
