var express = require('express');
var util = require('util');
var router = express.Router();
require('../modules/mongo')

// client list
router.get('/', function(req, res) {
  Music.find(function(err, musicFileList)
  {
    console.log(musicFileList.length)
      res.render('index', {musicFileList : musicFileList});
  });

});

module.exports = router;

