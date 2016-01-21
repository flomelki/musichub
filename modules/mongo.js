// files management
var recursive = require('recursive-readdir');
var mongoose = require('mongoose');
var path = require('path');
var mm = require('musicmetadata')
var fs = require('fs')

console.log('go on')

var musicSchema = mongoose.Schema({
  path : {type : String, required: true},
  genre : {type: String, required: true}
});

Music = mongoose.model("Music", musicSchema);

var authExt = ['.mp3', '.ogg'];

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
        mm(fs.createReadStream(file), function(err, metadata)
        {
          Music.create({path:filePath, genre:metadata.genre}, function(err, musicFile)
          {
            if (err)
              console.log(err);
          });
        });
      });
    });
});