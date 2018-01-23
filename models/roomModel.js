'use strict';

let mongoose = require('mongoose');


let RoomSchema = mongoose.Schema({
  identifier: {
    type:String
  },
  posts: {
    type:Array
  },
  title: {
    type:String
  }
}
);

let Room = module.exports = mongoose.model('Room', RoomSchema);
