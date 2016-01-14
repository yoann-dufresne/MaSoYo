

function Network (serverAddress, port, subDomain) {
	this.address = serverAddress;
	this.port = port;
	this.subDomain = subDomain;

	var that = this;

	this.peer = new Peer(
		"toto",
		{host: serverAddress,
		port: port,
		path: subDomain
	});

	this.peer.on ('error', function (err) {
		console.log (err);
	});

	peer.on ('open', function (id) {console.log(id)});

	peer.on ('connection', function (conn) {
		this.connection = conn;

		conn.on('data', that.receiveData)

		conn.on ('close', function () {
			console.log (conn.peer + " left the game");
		})
	});
}

Network.prototype = {
	sendData: function (json) {
		this.connection.send(JSON.stringify(json));
	},

	receiveData: function (data) {
		console.log (data);
	}
};

var network = new Network ("192.168.1.42", 9000, "/");