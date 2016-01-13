var express = require('express');
var util = require('util');
var router = express.Router();

// files management
var recursive = require('recursive-readdir');
var mongoose = require('mongoose');
var path = require('path');

var musicSchema = mongoose.Schema({
  path : {type : String, required: true}
});

var Music = mongoose.model("Music", musicSchema);

var authExt = ['.mp3', '.ogg'];

// TODO : move in any library
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

mongoose.connect("mongodb://localhost/musicalBase", function(){
    // Drop the DB 
    mongoose.connection.db.dropDatabase();
    
    recursive('musicFiles', function (err, files) {
      files = files.filter(function(file)
      {
        var ext = path.extname(file);
        return authExt.contains(ext);
      })
      
      files.forEach(function(file)
      {
        var filePath = file.split('\\').splice(1).join('/');
        Music.create({path:filePath}, function(err, musicFile)
        {
          if (err)
            console.log(err);
        });
      });
    });
});

// client list
router.get('/', function(req, res) {
  Music.find(function(err, musicFileList)
  {
    console.log(musicFileList.length)
      res.render('index', {musicFileList : musicFileList});
  });

});

module.exports = router;

