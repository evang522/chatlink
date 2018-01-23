'use strict';
let dbconnect = require('../db/dbconnect');
let express = require('express');
let router = express.Router();
let Room = require('../models/roomModel');



router.get('*/', (req,res) => {
  Room.find({}, (err,rooms)=> {
    let exists = false;
    rooms.forEach((room) => {
      // console.log(list);
      if (room.identifier === req.originalUrl) {
        exists = true;
      }
    });
    if (exists === false) {
      let newRoom = new Room;
      newRoom.posts = [];
      newRoom.identifier = req.originalUrl;
      newRoom.title = req.originalUrl.replace('/gen/',' ');
      newRoom.save();
      res.redirect(req.originalUrl);
    } else {
      Room.find({'identifier':req.originalUrl}, (err,room) => {
        if (err) {
          console.log(err);
        } else {
          res.render('room', {
            url:req.originalUrl,
            room:room[0]
          });
        }
      });
    }
  });
});


router.post('*/postmessage/:id', (req,res) => {
  Room.update({_id:req.params.id }, {$push: {roomitems:req.body.roomitem}}, (err,room) => {
    Room.find({_id:req.params.id}, (err,room) => {
      // console.log(list[0].listitems);
      res.redirect(room[0].identifier);
    });
  });
});


module.exports = router;