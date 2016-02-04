var express = require('express');
var util = require('util');
var router = express.Router();

// client list
router.get('/', function(req, res) {
  Music.find().sort({'path' : 1}).exec(function(err, musicFileList)
  {
      var genreList = []
      musicFileList.forEach(function(element)
      {
        if (!genreList.contains(element.genre))
        {
          genreList.push(element.genre)
        }
      });
      
      res.render('index', {musicFileList : musicFileList, genreList : genreList.sort()});
  });

});

module.exports = router;

