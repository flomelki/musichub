var express = require('express');
var util = require('util');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test");

var clientSchema = mongoose.Schema({
  lastname : {type : String, required: true},
  firstname : {type : String, required: true}
});

var Client = mongoose.model("Client", clientSchema);

// client list
router.get('/', function(req, res) {
  Client.find(function(err, clients)
  {
      res.render('index', {clients: clients});
  });
});

router.get('/new', function(req, res)
{
  res.render('new');
});

// get one client
router.get('/:id', function(req, res)
{
  var id = req.params.id;
  Client.findById(id, function(err, client)
  {
    res.render('show', {client : client});    
  });
});

// client edit mode openness
router.get('/edit/:id', function(req, res)
{
  var id = req.params.id;
  Client.findById(id, function(err, client)
  {
  res.render('edit', {client : client})
  });
});

// client creation
router.post('/', function(req, res)
{
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  Client.create({lastname : lastname, firstname : firstname}, function(err, client)
  {
    res.redirect('/');    
  });
});

// client update
router.put('/:id', function(req, res)
{
  var id = req.params.id;
  Client.findByIdAndUpdate(id, {lastname : req.body.lastname, firstname : req.body.firstname}, function(err, client)
  {
    res.redirect('/');    
  });
});

// client delete
router.delete('/:id', function(req, res)
{
  var id = req.params.id ;
  Client.findByIdAndRemove(id, function(err, client)
  {
    res.redirect('/');    
  });
});

module.exports = router;
