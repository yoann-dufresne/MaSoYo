var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.get('/', function(req, res, next) {
  console.log("get /")
  res.send('Hello world!');
});

var server = app.listen(9000);

var options = {
  debug: true,
  allow_discovery: true
}

var connected = [];

peerServer = ExpressPeerServer(server, options)
app.use('/api', peerServer);

peerServer.on('connection', function(id) {
  console.log("connection from: " + id)
  var idx = connected.indexOf(id); // only add id if it's not in the list yet
  if (idx === -1) {
    connected.push(id);
  }
});

peerServer.on('disconnect', function(id) {
  console.log("deconnection from:" + id)
  var idx = connected.indexOf(id); // only attempt to remove id if it's in the list
  if (idx !== -1) {
    connected.splice(idx, 1);
  }
});

app.get('/connected-people', function (req, res) {

  // allow cross domain
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');


  return res.json(connected);
});