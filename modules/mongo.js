var recursive = require('recursive-readdir');
var mongoose = require('mongoose');
var path = require('path');
var mm = require('musicmetadata')
var FileQueue = require('filequeue')
var fq = new FileQueue(1024)  // max number of open files. Beyond this limit, EMFILE exception will occur
var Promise = require('promise')

var musicSchema = mongoose.Schema({
  path : {type : String, required: true},
  genre : {type: String, required: true},
  img: { data: Buffer, contentType: String }
});

Music = mongoose.model("Music", musicSchema);

var authExt = ['.mp3', '.ogg'];

mongoose.connect("mongodb://localhost/musicalBase", function(){
  Music.count(function(err, count)
  {
      if (count == 0 || ISDEBUG)
      {
        console.log('db reset')
        dbReset();
      }
  });
});

function dbReset()
{
  mongoose.connection.db.dropDatabase();
  
  recursive('musicFiles', function (err, files) {
    if (err)
    {
      console.log('Error during files reading - ' + err)
      return;
    }
    
    files = files.filter(function(file)
    {
      var ext = path.extname(file);
      return authExt.contains(ext);
    })
    
    // use of promises in order to be able to check when all the files are processed
    var promises = [];    
    files.forEach(function(file)
    {
      var p = new Promise(function(resolve, reject)
      {
        var filePath = file.split('\\').splice(1).join('/');
        mm(fq.createReadStream(file), function(err, metadata)
        {
          var music = new Music
          music.path = htmlEncode(filePath)
          music.genre = (metadata.genre != null && metadata.genre != '' ? metadata.genre : '(empty)')
          if (metadata.picture.length > 0)
          {
            music.img.data = metadata.picture[0].data
            music.img.contentType = 'image/' + metadata.picture[0].format
          }
  
          music.save(function(err, musicFile)
          {
            if (err)
            {
              reject('Error during mongoDb music file save ' + filePath + ' - ' + err);
            }
            else
            {
              resolve(filePath)
            }
          });
        });      
      });
      promises.push(p);
    });
    
    Promise.all(promises).then(function(valeur) {
      console.log("Db init completed");
    }, function(raison) {
      console.log(raison)
    });    
    
  });
  

}