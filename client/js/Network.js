

function Network (serverAddress, port, subDomain) {
	this.address = serverAddress;
	this.port = port;
	this.subDomain = subDomain;

	var that = this;
}

Network.prototype = {
	sendData: function (json) {
		this.connection.send(JSON.stringify(json));
	},

	receiveData: function (data) {
		console.log (data);
	},

	connect: function (username) {
		var that = this;

		this.peer = new Peer(
			username,
			{host: this.address,
			port: this.port,
			path: this.subDomain
		});

		this.peer.on ('error', function (err) {
			console.log (err);
		});

		this.peer.on ('open', function (id) {console.log(id)});

		this.peer.on ('connection', function (conn) {
			that.connection = conn;

			conn.on('data', that.receiveData)

			conn.on ('close', function () {
				console.log (conn.peer + " left the game");
			})
		});
	}
};

var network = new Network ("masoyo.falce.net", 80, "/");