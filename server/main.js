var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

var port = 1414;
var server = app.listen(port);

var options = {
  debug: true,
  allow_discovery: true,
  port: port, 
  proxied: true
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

app.get('/', function(req, res, next) {
  console.log("get /")
  res.send('Hello world!');
});


var select_other = function(others) {
  var other = others[Math.floor(Math.random()*others.length)];
  console.log("chosen one : ", other);
  if (typeof other === 'undefined') {
    return {'error': 'not found', 'data': []}
  }
  else {
    return {'error': '', 'data': other}
  }
}

app.get('/connect/:me', function (req, res) {

  // allow cross domain
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  var others = JSON.parse(JSON.stringify(connected));
  console.log("connected people : ", others)
  var idx = connected.indexOf(req.params.me); // only attempt to remove id if it's in the list
  console.log("me : ", req.params.me)
  if (idx !== -1) {
    others.splice(idx, 1);
  }

  return res.json(select_other(others));
});
