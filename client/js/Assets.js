var Assets = {
	tileSize: 50,
	levels: {easy:null, test:null},
	loaders: {},
	character: 'assets/testCercle.png',
	sharedLoaded: false,

	loadSharedSprites: function (onLoad) {
		var that = this;

		this.sharedLoader = new PIXI.loaders.Loader();
		this.sharedLoader.add("character", Assets.character);
		this.sharedLoader.once('complete', function() {
			that.sharedLoaded = true;
			onLoad ();
		});
		this.sharedLoader.load();
	},

	loadLevelAssets: function (level, onLoad) {
		var that = this;
		if (this.sharedLoaded) {
			if (this.levels[level] == null) {
				var directory = "assets/levels/" + level + "/";

				$.getJSON( directory + level + ".json", function( data ) {})
				.done ( function (data) {
					that.levels[level] = data;
					that.loaders[level] = new PIXI.loaders.Loader();
					that.loaders[level].add("background", directory + that.levels[level].graphics.background);
					that.loaders[level].once('complete', function() {
						window.dispatchEvent(new Event("levelLoaded"));
						onLoad ();
					});
					that.loaders[level].load ();
				})
				.fail(function(data) {
					console.log( data );
				});
			}
		} else {
			this.loadSharedSprites (function () {that.loadLevelAssets (level, onLoad); });
		}
	}
};
