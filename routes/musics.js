var express = require('express');
var util = require('util');
var router = express.Router();

// client list
router.get('/', function(req, res) {
    console.log('loading...')
  Music.find().sort({'path' : 1}).exec(function(err, musicFileList)
  {
      console.log('Found smthg...')
      var genreList = []
      musicFileList.forEach(function(element)
      {
        if (!genreList.contains(element.genre))
        {
          genreList.push(element.genre)
        }
      });
      console.log('Pushed...')
      res.render('index', {musicFileList : musicFileList, genreList : genreList.sort()});
  });
});


router.post('/fromtogenre', function(req, res)
{
    console.log('POST fromtogenre')
    if (req.body.fromto)
    {
        var fromto = JSON.parse(req.body.fromto);
        console.log(fromto.from);
        console.log(fromto.to);
        if (fromto.from === fromto.to)  return;
        FromTo.findOne({'from' : fromto.from, 'to' : fromto.to}, 'number', function(err, res)
        {
            var nb = 1;
            if (err) return handleError(err);
            if (res)    nb = res.number  + 1;
            FromTo.update({'from' : fromto.from, 'to' : fromto.to}, {'number' : nb},  {upsert : true}, function(err, numberAffected)
            {
                if (err) return handleError(err);
                console.log('Updated fromtos collection');
            });
        });
    }
});

router.post('/genre', function(req, res)
{
    var genre = req.body.genre;
    console.log('POST genre')
    console.log(genre)
    if (!genre) return;
    Genre.findOne({'genre' : genre}, 'number', function(err, res)
    {
        var nb = 1;
        if (err) return handleError(err);
        if (res)    nb = res.number + 1;
        Genre.update({'genre' : genre}, {'number' : nb}, {upsert : true}, function(err, res)
        {
            if (err) return handleError(err);
            console.log('Updated genres collection - Genre ' + genre + ' listened ' + nb + 'times');
        })
    })
});


module.exports = router;

