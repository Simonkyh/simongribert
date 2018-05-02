/* jshint esversion: 6 */
/* jscs:disable maximumLineLength */

// host: crockett.highstone.biz (default port)
// l: portfolio
// p: Portfolio123

const express = require('express');
var mysql = require("mysql");
var connection = mysql.createConnection({
  host     : 'crockett.highstone.biz',
  user     : 'portfolio',
  password : 'Portfolio123',
  database : 'sigr'
});

const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(port);

app.get("/guests",function(req,res){
    var query = "SELECT * FROM ??";
    var table = ["Guests"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        res.json(rows);
    });
});
app.post('/guests', function (req, res) {
  console.log(req.body);
  var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
  var inserts = ["Guests", "name","location", "comment", req.body.name, req.body.location, req.body.comment];
  query = mysql.format(query, inserts);
  connection.query(query,function(err,rows){
    if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
        res.json({"Error" : false, "Message" : "Comment Added !"});
    }
  });
});



console.log(`App listening on port ${port}`);
