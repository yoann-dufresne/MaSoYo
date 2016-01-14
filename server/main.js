// var express = require('express');
// var app = express();
// var ExpressPeerServer = require('peer').ExpressPeerServer;
// 
// app.get('/', function(req, res, next) { res.send('Hello world!'); });
// 
// var server = app.listen(9000);
// 
// var options = {
//     debug: true
// }
// 
// app.use('/api', ExpressPeerServer(server, options));
// 
// server.on('connection', function(id) {
// 	 console.log(id) 
// 	
// });
// server.on('disconnect', function(id) { console.log(id + "deconnected") });
// 


var ip = require('ip');
var PeerServer = require('peer').PeerServer;

var port = 9000;
var server = new PeerServer({port: port, allow_discovery: true});

server.on('connection', function (id) {
  console.log('new connection with id ' + id);
});

server.on('disconnect', function (id) {
  console.log('disconnect with id ' + id);
});

console.log('peer server running on ' +
            ip.address() + ':' + port);

