
function Controler (input, model) {
	this.input = input;
	this.model = model;
}

Controler.prototype = {
	loadLevel: function (level) {
		var that = this;

		this.input.active = false;

		// Position character
		this.model.x = level.startX;
        this.model.y = level.startY;

        // Load events
        this.model.events = [];
        for (var i=-1 ; i<=level.width ; i++)
        	this.model.events[i] = [];
        level.events.forEach (function (elt) {
        	that.model.events[elt[0]][elt[1]] = elt[2];
        });
	},

	update: function (callback) {
		// Move the character
		var time = Date.now();

		var durationX = 0;
		var durationY = 0;
		if (this.input.active) {
			durationX =
				this.input.right * (time - this.input.rightTime) -
				this.input.left * (time - this.input.leftTime);
			durationY =
				this.input.down * (time - this.input.downTime) -
				this.input.up * (time - this.input.upTime);
		}

		this.input.upTime = time;
		this.input.downTime = time;
		this.input.leftTime = time;
		this.input.rightTime = time;

		if (!this.input.active) {
			callback (model);
			return;
		}

		var prevX = this.model.x;
		var prevY = this.model.y;
		this.model.x += this.model.vx * (durationX / 1000);
		this.model.y += this.model.vy * (durationY / 1000);

		// Trigger the events functions
		var x = Math.floor (this.model.x);
		var y = Math.floor (this.model.y);
		if (this.model.events[x] != undefined && this.model.events[x][y] != undefined)
			this.model.events[x][y]({
				x: this.model.x,
				y: this.model.y,
				prevX: prevX,
				prevY: prevY,
				model: model
			});

		callback (model);
	}
}

var controler = new Controler (inputKeyboard, model);