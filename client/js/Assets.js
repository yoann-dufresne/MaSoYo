var Assets = {
	tileSize: 50,
	level1: {
		// General
		width: 8,
		height: 2,
		startX: 0.5,
		startY: 0.5,
		// Assets
		graphics: {
			background: 'assets/levels/easy_bg.png'
		},
		// Events
		events: [
			[-1, -1, events.lava],
			[0, -1, events.lava],
			[1, -1, events.lava],
			[2, -1, events.lava],
			[3, -1, events.lava],
			[4, -1, events.lava],
			[5, -1, events.lava],
			[6, -1, events.lava],
			[7, -1, events.lava],
			[8, -1, events.lava],

			[-1, 0, events.lava],
			[3, 0, events.wall],
			[7, 0, events.win],
			[8, 0, events.lava],

			[-1, 1, events.lava],
			[7, 1, events.win],
			[8, 1, events.lava],

			[-1, 2, events.lava],
			[0, 2, events.lava],
			[1, 2, events.lava],
			[2, 2, events.lava],
			[3, 2, events.lava],
			[4, 2, events.lava],
			[5, 2, events.lava],
			[6, 2, events.lava],
			[7, 2, events.lava],
			[8, 2, events.lava]
		]
	},
	character: 'assets/testCercle.png',

	load: function (callback) {
		PIXI.loader.add("background", Assets.level1.graphics.background);
		PIXI.loader.add("character", Assets.character);
		PIXI.loader.once('complete', function() { callback (); });
		PIXI.loader.load ();
	}
};
