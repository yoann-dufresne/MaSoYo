var Assets = {
	tileSize: 20,
	level1: {
		// General
		width: 20,
		height: 5,
		startX: 1,
		startY: 2.5,
		// Assets
		graphics: {
			background: 'assets/levels/easy_bg.png'
		},
		// Events
		events: []
	},
	character: 'assets/testCercle.png',

	load: function (callback) {
		PIXI.loader.add("background", Assets.level1.graphics.background);
		PIXI.loader.add("character", Assets.character);
		PIXI.loader.once('complete', function() { callback (); });
		PIXI.loader.load ();
	}
};
