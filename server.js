const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('view engine', 'ejs');

var uri = "mongodb://jonesat:b@cluster0-shard-00-00-qgjnl.mongodb.net:27017,cluster0-shard-00-01-qgjnl.mongodb.net:27017,cluster0-shard-00-02-qgjnl.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
var db;

MongoClient.connect(uri, (err, database) => {
  if(err) return console.log(err);
  db = database;
  app.listen(8080, () => {
    console.log('listening on 8080');
  })
})

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    db.collection('users').find().toArray(function(err, result) {
      if (err) return console.log(err);
      res.render('index.ejs', {users: result})
      console.log(result);
    })
})

app.post('/user', function(req, res){
  db.collection('users').save(req.body, (err, results) => {
    if (err) return console.log(err);
    console.log('saved to database');
    console.log(req.body);
    res.redirect('/');
  })
})