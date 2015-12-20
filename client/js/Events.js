
var events = {

	lava: function (coords) {
		inputKeyboard.active = false;

		setTimeout (function() {
			var x = Math.floor(coords.x);
			var y = Math.floor(coords.y);
			coords.model.x = Math.floor(coords.prevX) + 0.5;
			coords.model.y = Math.floor(coords.prevY) + 0.5;
		}, 500);
		
		setTimeout (function () {inputKeyboard.active = true}, 1000);
	},

	wall: function (coords) {
		if (Math.floor(coords.prevX) != Math.floor(coords.x))
			coords.model.x = coords.prevX;
		if (Math.floor(coords.prevY) != Math.floor(coords.y))
			coords.model.y = coords.prevY;
	}
};