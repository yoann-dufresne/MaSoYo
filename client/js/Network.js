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
    var data = JSON.parse(data);
    if(data.level){
      console.log (data.level);
      vue.changeStage (data.level);
    }
    if (data.state == "command"){
      console.log(data.up || data.down)
      if (data.up) {
        //inputKeyboard.key_up(data.up);
        window.onkeyup(data.up);
      }
      if (data.down) {
        //inputKeyboard.key_down(data.down); 
        window.onkeydown(data.down);
      }
    }
		console.log (data);
	},

  connect_to_id: function(id) {
    console.log("connecting to id", id);
    var that = this;
    var c = this.peer.connect(id);
    c.on('open', function() {
      console.log("opened connection to", id);
    });

    c.on('data', that.receiveData);

    c.on('close', function() {
      alert(c.peer + ' has left the chat.');
    });

    c.on('error', function(err) {
      alert(err);
    });
  },

  askForPeer: function () {
    console.log("Asked for peer");
    var that = this;
    var serv = 'http://' + this.address + ':' + this.port + '/connect/' + this.username;
    console.log(serv);

    $.ajax({
      url: serv,
      type: "GET",
      crossDomain: true,
      success: function (response) {
        if (!response.error) {
          that.connect_to_id (response.data);
          console.log(response.data);
        } else {
          setTimeout (function () {that.askForPeer()}, 1000);
        }
      },
      error: function (xhr, status) {
        alert("error");
      }
    });
  },


  /*peersConnectedToServer: function () {
    var that = this;
    var serv = 'http://' + that.address + ':' + that.port + that.URL_discovery;

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
  },/**/

	connect2Server: function (username) {
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

var network = new Network ("192.168.1.27", 1414, "/api");
//network.askForPeer();
// setInterval(function(){network.peersConnectedToServer()}, 1000);


