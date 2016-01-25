
function Input () {
	this.left = false;
	this.leftTime = 0;
	this.up = false;
	this.upTime = 0;
	this.right = false;
	this.rightTime = 0;
	this.down = false;
	this.downTime = 0;

	this.active = true;

	/*var that = this;
	this.peer = new Peer("toto", {key: '0opo1rm535xc4n29'});
	this.peer.on('connection', function(conn) {
		console.log ("connection");
		console.log (conn.peer);
		conn.on('data', function(data) {
			console.log('Received', data);
		});
	});/**/
}


Input.prototype = {

  key_down: function(keycode){
    var that = this;
    switch (keycode) {
      case 37:
        if (!that.left)
          that.leftTime = Date.now();
        that.left = true;
        break;
      case 38:
        if (!that.up)
          that.upTime = Date.now();
        that.up = true;
        break;
      case 39:
        if (!that.right)
          that.rightTime = Date.now();
        that.right = true;
        break;
      case 40:
        if (!that.down)
          that.downTime = Date.now();
        that.down = true;
        break;
      default:
    }
  },

  key_up: function(keycode){
    var that = this;
    switch (keycode) {
      case 37:
        that.left = false;
        break;
      case 38:
        that.up = false;
        break;
      case 39:
        that.right = false;
        break;
      case 40:
        that.down = false;
        break;
      default:
    }
  },


  gameControl: function () {
    var that = this;
    window.onkeydown = function (event) {
      network.sendData({"down":event.keyCode, state: "command"});
      that.key_down(event.keyCode);
    };

    window.onkeyup = function (event) {
      network.sendData({"up":event.keyCode, state: "command"});
      that.key_up(event.keyCode);
    }
  },


	// 	window.onkeydown = function (event) {
	// 		switch (event.keyCode) {
	// 			case 37:
	// 				if (!that.left)
	// 					that.leftTime = Date.now();
	// 					network.sendData({command: "left", state:"down"})
	// 				that.left = true;
	// 				break;
	// 			case 38:
	// 				if (!that.up)
	// 					that.upTime = Date.now();
	// 					network.sendData({command: "up"})
	// 				that.up = true;
	// 				break;
	// 			case 39:
	// 				if (!that.right)
	// 					that.rightTime = Date.now();
	// 					network.sendData({command: "right"})
	// 				that.right = true;
	// 				break;
	// 			case 40:
	// 				if (!that.down)
	// 					that.downTime = Date.now();
	// 					network.sendData({command: "down"})
	// 				that.down = true;
	// 				break;
	// 			default:
	// 		}
	// 	}

	// 	window.onkeyup = function (event) {
	// 		switch (event.keyCode) {
	// 			case 37:
	// 				that.left = false;
	// 				break;
	// 			case 38:
	// 				that.up = false;
	// 				break;
	// 			case 39:
	// 				that.right = false;
	// 				break;
	// 			case 40:
	// 				that.down = false;
	// 				break;
	// 			default:
	// 		}
	// 	}
	// },

  startGame: function(key) {
        if (!this.active) {
          this.send_message({"start":key})
        }
        this.gameControl();
        this.active = true;

        var event = new Event('keydown');
        event.keyCode = key;
        window.dispatchEvent(event);

        var event = new Event('levelStart');
        window.dispatchEvent(event);
  },

	startScreenControl: function () {
		var that = this;

		window.onkeydown = function (event) {
			var key = event.keyCode;

			if (key >= 37 && key <= 40) {
				that.gameControl();
				that.active = true;

				var event = new Event('keydown');
				event.keyCode = key;
				window.dispatchEvent(event);

				var event = new Event('levelStart');
				window.dispatchEvent(event);
			}
		}
	}
};

var inputKeyboard = new Input();
