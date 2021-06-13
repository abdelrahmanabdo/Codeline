var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/public', express.static('resources'));

const port = process.env.PORT || 3000;
var server = http.listen(port, () => {
  console.log('Codeline server is running on port', server.address().port);
});