
var events = {
	base: function (coords) {
		var x = Math.floor(coords.x);
		var y = Math.floor(coords.y);
		//console.log(coords.x + " " + coords.y + " : " + x + " " + y);
	},

	lava: function (coords) {
		var x = Math.floor(coords.x);
		var y = Math.floor(coords.y);
		coords.model.x = Math.floor(coords.prevX) + 0.5;
		coords.model.y = Math.floor(coords.prevY) + 0.5;
		console.log ("Lava : " + x + ":" + y);
	},

	wall: function (coords) {

	}
};