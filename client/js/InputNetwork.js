
function InputNetwork () {
  this.left = false;
  this.leftTime = 0;
  this.up = false;
  this.upTime = 0;
  this.right = false;
  this.rightTime = 0;
  this.down = false;
  this.downTime = 0;

  this.active = true;
}


InputNetwork.prototype = {
  initNetwork: function() {
    this.peer = new Peer({key: '0opo1rm535xc4n29'});

    this.peer.on('connection', function(c){
      console.log("connection request from : "+ c.peer);
      this.connect(c)
    });

    this.peer.on('error', function(err) {
      console.log(err);
    })
  },

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

  connect: function (c) {
    var that = this;
    c.on('data', function(data) {
      console.log(data)
      if (data.down){
        that.key_down(parseInt(data.down));
      }
      else if (data.up){
        that.key_up(parseInt(data.up));
      }
    });
    c.on('close', function() {
      alert(c.peer + ' has left the chat.');
    });
  },

  connect_to_id: function(id_) {
    var that = this;
    var c = this.peer.connect(id_);
    c.on('open', function() {
      that.connect(c);
    });
    c.on('error', function(err) {
      alert(err);
    });
    console.log("triyng to connect to : "+id_);
  },

  send_message: function(msg) {
    for (other_id in this.peer.connections) {
      for(var i = 0; i < this.peer.connections[other_id].length; i+=1){
        var c = this.peer.connections[other_id][i];
        c.send(msg);
        console.log("sent message : " + msg + " to : " + c.peer);
      };
    }
  },

  gameControl: function () {
    var that = this;
    window.onkeydown = function (event) {
      that.send_message({"down":event.keyCode})
      that.key_down(event.keyCode);
    }

    window.onkeyup = function (event) {
      that.send_message({"up":event.keyCode})
      that.key_up(event.keyCode);
    }
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

var inputKeyboard = new InputNetwork();
inputKeyboard.startScreenControl ();
inputKeyboard.initNetwork();
