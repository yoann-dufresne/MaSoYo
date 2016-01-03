
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
		var flrX = Math.floor(coords.x);
		var flrY = Math.floor(coords.y);
		var flrPrevX = Math.floor(coords.prevX);
		var flrPrevY = Math.floor(coords.prevY);

		if (flrPrevX != flrX && flrPrevY != flrY)
			if (coords.model.events[flrX][flrPrevY] == undefined) {
				coords.prevX = coords.x;
				flrPrevX = Math.floor(coords.x);
			} else if (coords.model.events[flrPrevX][flrY] == undefined) { 
				coords.prevY = coords.y;
				flrPrevY = Math.floor(coords.y);
			}

		if (flrPrevX != flrX) {
			coords.model.x = Math.round(coords.prevX);
			if (coords.prevX < coords.x)
				coords.model.x -= 0.000001
		}
		if (flrPrevY != flrY) {
			coords.model.y = Math.round(coords.prevY);
			if (coords.prevY < coords.y)
				coords.model.y -= 0.000001
		}
	},

	win: function (coords) {
		inputKeyboard.active = false;
		var win = new Event ('win');
		coords.model.win = Date.now();
		window.dispatchEvent (win);
	}
};