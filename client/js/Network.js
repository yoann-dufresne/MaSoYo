function Network (serverAddress, port, subDomain, URL_discovery) {
	this.address = serverAddress;
	this.port = port;
	this.subDomain = subDomain;
  this.URL_discovery = URL_discovery

	var that = this;
}

Network.prototype = {
	sendData: function (json) {
		this.connection.send(JSON.stringify(json));
	},

	receiveData: function (data) {
		console.log (data);
	},

  connect_to_id: function(id_) {
    console.log("connecting to id", id_);
    var that = this;
    var c = this.peer.connect(id_);
    c.on('open', function() {
      console.log("opened connection to", id_);
    });

    c.on('data', that.receiveData);

    c.on('close', function() {
      alert(c.peer + ' has left the chat.');
    });

    c.on('error', function(err) {
      alert(err);
    });
  },


  peersConnectedToServer: function () {
    var that = this;
    serv = 'http://' + that.address + ':' + that.port + that.URL_discovery;

    function createInput(name){
      var $input = $('<input type="button" value=' + name + ' />').click(function () {
        console.log("clicked button", name);
        that.connect_to_id(name);
      });
      console.log("appended", $input);
      $input.appendTo($("#others"));
    }

    function removeInput(){
      console.log("remove")
      $("#others").empty();
    }


    function arraysIdentical(a, b) {
      if (typeof a == 'undefined'){return false;}

      var i = a.length;
      if (i != b.length) return false;
      while (i--) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    };

    $.ajax({
      url: serv,
      type: "GET",
      crossDomain: true,
      success: function (response) {
        // todo : http://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
        if(!arraysIdentical(that.old_response,response)){
          removeInput()
          for(i in response){
            name = response[i];
            if (name != that.username){
              createInput(name);
            }
          }
        }
        that.old_response = response;
      },
      error: function (xhr, status) {
        alert("error");
      }
    });
  },

	connect: function (username) {
		var that = this;
    this.username = username;

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

var network = new Network ("masoyo.falce.net", 80, "/api", "/connected-people");
setInterval(function(){network.peersConnectedToServer()}, 1000);