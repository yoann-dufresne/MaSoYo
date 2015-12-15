
function Input () {
	this.left = false;
	this.leftTime = 0;
	this.up = false;
	this.upTime = 0;
	this.right = false;
	this.rightTime = 0;
	this.down = false;
	this.downTime = 0;
}


Input.prototype = {
	init: function () {
		var that = this;
		window.onkeydown = function (event) {
			switch (event.keyCode) {
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
		}

		window.onkeyup = function (event) {
			switch (event.keyCode) {
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
		}
	}
};

var inputKeyboard = new Input();
inputKeyboard.init ();
