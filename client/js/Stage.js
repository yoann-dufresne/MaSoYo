
function Stage (renderer, model, level) {
	PIXI.Container.call(this);
	this.paused = false;
	this.renderer = renderer;
	this.model = model;
	this.levelName = level;
	this.loadedParts = {startScreen:false, character:false, level:false, score:false};

	// Start screen
	this.startScreen = new PIXI.Graphics();
	this.startScreen.beginFill (0x000000, 0.75);
	this.startScreen.drawRect (100, 100, this.renderer.width-200, this.renderer.height-200);
	this.startScreen.z = 100;

	var text = new PIXI.Text("Level " + this.levelName, {font:"70px Arial", fill:"blue", align : 'center'});
	text.anchor.x = 0.5;
	text.anchor.y = 0.5;
	text.position.x = 100+this.startScreen.width/2;
	text.position.y = 50+this.startScreen.height/2;
	this.startScreen.addChild (text);

	text = new PIXI.Text("Press any arrow to start the level", {font:"32px Arial", fill:"white", align : 'center'});
	text.anchor.x = 0.5;
	text.anchor.y = 0.5;
	text.position.x = 100+this.startScreen.width/2;
	text.position.y = 150+this.startScreen.height/2;
	this.startScreen.addChild (text);
	this.loadedParts.startScreen = true;

	var that = this;
	// Level and character
	Assets.loadLevelAssets (level, function () {
		// Level
		var text = Assets.loaders[level].resources.background.texture;
		that.background = new PIXI.extras.TilingSprite (text, text.width, text.height);
		that.background.z = 1;
		that.loadedParts.level = true;
		that.addChild(that.background);

		// Character
		var charTexture = Assets.sharedLoader.resources.character.texture;
		that.character = new PIXI.Sprite(charTexture);
		// center the sprite's anchor point
		that.character.anchor.x = 0.5;
		that.character.anchor.y = 0.5;
		// move the sprite to the center of the screen
		that.character.position.x = that.renderer.width/2;
		that.character.position.y = that.renderer.height/2;
		// Define the depth for the painting
		that.character.z = 2;
		that.addChild(that.character);
		that.loadedParts.character = true;
		that.emitConstructed ();
	});

	// Creation of the score node for the renderer
	this.score = new PIXI.Text("???s", {font:"90px Arial", fill:"white", align : 'center'});
	this.score.anchor.x = 0.5;
	this.score.anchor.y = 0.5;
	this.score.position.x = 100+this.renderer.width/2;
	this.score.position.y = 150+this.renderer.height/2;
	this.loadedParts.score = true;
	this.emitConstructed ();
}

Stage.prototype = Object.create(PIXI.Container.prototype, {
	constructor: { value: Stage }
});

Stage.prototype.refresh = function () {
	if (this.background != null) {
		this.background.x = this.renderer.width/2 - model.x * Assets.tileSize;
		this.background.y = this.renderer.height/2 - model.y * Assets.tileSize;
	}
};

Stage.prototype.enableStartScreen = function () {
	this.addChild (this.startScreen);

	var that = this;
	if (!this.paused)
		window.addEventListener ("levelStart", function (e) {
			e.target.removeEventListener(e.type, arguments.callee);
			that.disableStartScreen();
		});
}

Stage.prototype.disableStartScreen = function () {
	this.removeChild (this.startScreen);
	this.model.start = Date.now();

	var that = this;
	if (!this.paused)
		window.addEventListener ("win", function (e) {
			e.target.removeEventListener(e.type, arguments.callee);
			that.enableScoreScreen();
		});
}

Stage.prototype.enableScoreScreen = function () {
	this.addChild (this.score);
	var score = Math.floor((Date.now() - this.model.start)/100)/10;
	this.setScore (score);

	var that = this;
	setTimeout (function () {
		that.disableScoreScreen();
		vue.loadMenu ();
	}, 500);
}

Stage.prototype.disableScoreScreen = function () {
	this.removeChild (this.score);
}

Stage.prototype.setScore = function (score) {
	this.score.text = score + "s";
}

Stage.prototype.emitConstructed = function () {
	//this.loadedParts = {startScreen:false, character:false, level:false, score:false};
	if (this.loadedParts.startScreen && this.loadedParts.character && this.loadedParts.level && this.loadedParts.score)
		window.dispatchEvent(new Event("levelConstructed"));
}
