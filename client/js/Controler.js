
function Controler (input, model) {
	this.input = input;
	this.model = model;
}

Controler.prototype = {
	update: function (callback) {
		var time = Date.now();
		var durationX =
			this.input.right * (time - this.input.rightTime) -
			this.input.left * (time - this.input.leftTime);
		var durationY =
			this.input.down * (time - this.input.downTime) -
			this.input.up * (time - this.input.upTime);

		this.input.upTime = time;
		this.input.downTime = time;
		this.input.leftTime = time;
		this.input.rightTime = time;

		this.model.dx += this.model.vx * (durationX / 1000);
		this.model.dy += this.model.vy * (durationY / 1000);

		callback (model);
	}
}

var controler = new Controler (inputKeyboard, model);