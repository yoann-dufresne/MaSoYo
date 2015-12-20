var Assets = {
	tileSize: 50,
	level1: {
		// General
		width: 8,
		height: 2,
		startX: 1,
		startY: 1,
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
