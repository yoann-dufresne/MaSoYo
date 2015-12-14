
function Input () {
	this.left = false;
	this.up = false;
	this.right = false;
	this.down = false;
}


Input.prototype = {
	init: function () {
		var that = this;
		window.onkeydown = function (event) {
			switch (event.keyCode) {
				case 37:
					that.left = true;
					break;
				case 38:
					that.up = true;
					break;
				case 39:
					that.right = true;
					break;
				case 40:
					that.down = true;
					break;
				default:
					console.log("miaou");
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
					console.log("wouaf");
			}
		}
	}
};

var inputController = new Input();
inputController.init ();
