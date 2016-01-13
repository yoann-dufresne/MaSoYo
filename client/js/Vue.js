function depthCompare(a,b) {
	if (a.z < b.z)
		return -1;
	if (a.z > b.z)
		return 1;
	return 0;
}

function Vue (model, controler) {
	this.renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xE42217});
	document.body.appendChild(this.renderer.view);
	this.model = model;
	this.controler = controler;
	this.stage = undefined;
	this.stages = {};
}

Vue.prototype = {

	startAnimation: function () {
		// Start the animation
		this.animate();
	},

	animate: function () {
		if (this.stage != undefined) {
			// 1 - Input
			this.controler.refresh ();

			// 2 - Move
			if (this.stage.refresh)
				this.stage.refresh ();

			// 3 - Collisions
			// Automatic (listeners)

			// 4 - Send data through the network
			// TODO

			// 5 - Render the scene
			if (this.stage != undefined) {
				this.stage.children.sort(depthCompare);
				this.renderer.render(this.stage);
			}
		}
		requestAnimationFrame(function () {vue.animate();});
	},

	changeStage: function (levelName) {
		var that = this;

		// Modify the model through the controler
		window.addEventListener ("levelLoaded", function (e) {
			e.target.removeEventListener(e.type, arguments.callee);
			controler.loadLevel (levelName);
		});

		// Create the rendrering tree
		if (this.stages[levelName] == undefined) {
			window.addEventListener ("levelConstructed", function (e) {
				e.target.removeEventListener(e.type, arguments.callee);
				that.initStage(levelName);
			})
			this.stages[levelName] = new Stage (this.renderer, this.model, levelName);
		} else {
			this.initStage(levelName);
		}
	},

	initStage: function (levelName) {
		this.stage = this.stages[levelName];
		this.stage.enableStartScreen ();
		window.dispatchEvent(new Event("levelLoaded"));
	},

	initMenu: function () {
		var that = this;

		this.menu = new PIXI.Container();
		this.stage = this.menu;

		var square = new PIXI.Graphics();
		square.beginFill (0x000000, 1);
		square.drawRect (this.renderer.width/2 - 100, 80, 200, 40);
		this.menu.addChild (square);
		square.interactive = true;
		square.click = function (data) {
			that.changeStage ("easy");
		}

		var easy = new PIXI.Text("Easy", {font:"28px Arial", fill:"white", align : 'center'});
		easy.anchor.x = 0.5;
		easy.anchor.y = 0.5;
		easy.position.x = this.renderer.width/2;
		easy.position.y = 100;
		this.menu.addChild (easy);

		square = new PIXI.Graphics();
		square.beginFill (0x000000, 1);
		square.drawRect (this.renderer.width/2 - 100, 130, 200, 40);
		this.menu.addChild (square);
		square.interactive = true;
		square.click = function (data) {
			that.changeStage ("test");
		}

		var test = new PIXI.Text("Test", {font:"28px Arial", fill:"white", align : 'center'});
		test.anchor.x = 0.5;
		test.anchor.y = 0.5;
		test.position.x = this.renderer.width/2;
		test.position.y = 150;
		this.menu.addChild (test);
	},

	loadMenu: function () {
		this.stage = this.menu;
	}

}

var vue = new Vue (model, controler);
vue.initMenu();
//vue.changeStage("test");
vue.startAnimation();
