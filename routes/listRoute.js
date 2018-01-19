'use strict';
let dbconnect = require('../db/dbconnect');
let express = require('express');
let router = express.Router();
let List = require('../models/listModel');



router.get('*/', (req,res) => {
  List.find({}, (err,lists)=> {
    let exists = false;
    lists.forEach((list) => {
      // console.log(list);
      if (list.identifier === req.originalUrl) {
        exists = true;
      }
    });
    if (exists === false) {
      let newList = new List;
      newList.listitems = [];
      newList.identifier = req.originalUrl;
      newList.title = req.originalUrl.replace('/gen/',' ');
      newList.save();
      res.redirect(req.originalUrl);
    } else {
      List.find({'identifier':req.originalUrl}, (err,list) => {
        if (err) {
          console.log(err);
        } else {
          res.render('list', {
            url:req.originalUrl,
            list:list[0]
          });
        }
      });
    }
  });
});


router.post('*/additem/:id', (req,res) => {
  List.update({_id:req.params.id }, {$push: {listitems:req.body.listitem}}, (err,list) => {
    List.find({_id:req.params.id}, (err,list) => {
      // console.log(list[0].listitems);
      res.redirect(list[0].identifier);
    });
  });
});

router.post('*/resetlist/:id', (req,res) => {
  List.update({_id:req.params.id }, {listitems:[]}, (err,list) => {
    List.find({_id:req.params.id}, (err,list) => {
      // console.log(list[0].listitems);
      res.redirect(list[0].identifier);
    });
  });
});







module.exports = router;