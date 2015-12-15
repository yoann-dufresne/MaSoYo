var Assets = {
	level1: {
		// level 1
		background: 'assets/levels/easy_bg.png'
	},
	character: 'assets/bunny.png',

	load: function (callback) {
		PIXI.loader.add("background", Assets.level1.background);
		PIXI.loader.add("character", Assets.character);
		PIXI.loader.once('complete', function() { callback (); });
		PIXI.loader.load ();
	}
};
