var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


var server = http.listen(3001, () => {
  console.log('Codeline server is running on port', server.address().port);
});