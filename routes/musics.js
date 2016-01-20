var express = require('express');
var util = require('util');
var router = express.Router();

// client list
router.get('/', function(req, res) {
  Music.find(function(err, musicFileList)
  {
    var genreList = []
    musicFileList.forEach(function(file)
    {
      if (!(genreList.contains(file.genre)))
      {
        genreList.push(file.genre);
      }
    });
    res.render('index', {musicFileList : musicFileList, genreList:genreList});
  });

});

module.exports = router;

