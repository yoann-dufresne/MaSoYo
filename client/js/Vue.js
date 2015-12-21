function depthCompare(a,b) {
  if (a.z < b.z)
     return -1;
  if (a.z > b.z)
    return 1;
  return 0;
}

function Vue (model) {
    this.renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xE42217});
    document.body.appendChild(this.renderer.view);

    // create the root of the scene graph
    this.stage = new PIXI.Container();
    this.model = model;

    this.loadCount = 0;
}

Vue.prototype = {
    load: function (level, callback) {
        this.loadLevel (level);
        this.loadCharacter ();
        this.loadStartScreen ();
        callback();
    },

    loadCharacter: function () {
        var texture = PIXI.loader.resources.character.texture;
        this.character = new PIXI.Sprite(texture);
        
        // center the sprite's anchor point
        this.character.anchor.x = 0.5;
        this.character.anchor.y = 0.5;
        // move the sprite to the center of the screen
        this.character.position.x = this.renderer.width/2;
        this.character.position.y = this.renderer.height/2;

        this.character.z = 2;

        this.stage.addChild(this.character);

    },

    loadLevel: function (level) {
        var that = this;

        controler.loadLevel (level);

        var text = PIXI.loader.resources.background.texture;
        this.background = new PIXI.extras.TilingSprite (text, text.width, text.height);

        this.background.z = 1;
        this.stage.addChild (this.background);

        window.addEventListener ('win', function () {that.printScore()});
    },

    loadStartScreen: function () {
        var that = this;

        this.startScreen = new PIXI.Graphics();
        this.startScreen.beginFill (0x000000, 0.75);
        this.startScreen.drawRect (100, 100, this.renderer.width-200, this.renderer.height-200);

        var text = new PIXI.Text("Level 1", {font:"70px Arial", fill:"blue", align : 'center'});
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

        this.stage.addChild (this.startScreen);
        window.addEventListener ('levelStart', function () {that.stage.removeChild(that.startScreen);});
    },

    printScore: function () {
        var that = this;

        var md = this.model;
        var score = Math.floor((md.win - md.start)/100)/10;

        var text = new PIXI.Text(score+"s", {font:"90px Arial", fill:"white", align : 'center'});
        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        text.position.x = this.renderer.width/2;
        text.position.y = this.renderer.height/2;
        this.stage.addChild (text);

        setTimeout(function () {
            that.stage.destroy();
            that.stage = new PIXI.Container();
            that.load(Assets.level1, function(){});
            inputKeyboard.startScreenControl();
        }, 2000);
    },

    startAnimation: function () {
        // start animating
        var that = vue;
        that.stage.children.sort(depthCompare);

        animate();
        function animate() {
            controler.update (function () {
                that.background.position.x = that.renderer.width/2 - (that.model.x * Assets.tileSize);
                that.background.position.y = that.renderer.height/2 - (that.model.y * Assets.tileSize);
            });
            requestAnimationFrame(animate);

            // render the container
            that.renderer.render(that.stage);
        }
    }

}

var vue = new Vue (model);
Assets.load (function () {
    vue.load (Assets.level1, vue.startAnimation);
});
