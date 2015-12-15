function depthCompare(a,b) {
  if (a.z < b.z)
     return -1;
  if (a.z > b.z)
    return 1;
  return 0;
}

function Vue () {
    this.renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xE42217});
    document.body.appendChild(this.renderer.view);

    // create the root of the scene graph
    this.stage = new PIXI.Container();

    this.loadCount = 0;
}

Vue.prototype = {
    load: function (callback) {
        this.loadLevel (Assets.level1);
        this.loadCharacter ();
        callback();
    },

    loadCharacter: function () {
        var texture = PIXI.loader.resources.character.texture;
        this.character = new PIXI.Sprite(texture);
        // center the sprite's anchor point
        this.character.anchor.x = 0.5;
        this.character.anchor.y = 0.5;
        // move the sprite to the center of the screen
        this.character.position.x = (this.renderer.width - this.character.width)/2;
        this.character.position.y = (this.renderer.height - this.character.height)/2;

        this.character.z = 23;

        this.stage.addChild(this.character);

    },

    loadLevel: function (level) {
        var text = PIXI.loader.resources.background.texture;
        this.background = new PIXI.extras.TilingSprite (text, text.width, text.height);
        this.background.position.x = 100;
        this.background.position.y = 200;

        this.background.z = 20;
        this.stage.addChild (this.background);
    },

    startAnimation: function () {
        // start animating
        var that = vue;
        that.stage.children.sort(depthCompare);

        animate();
        function animate() {
            controler.update (function (model) {
                that.background.position.x -= model.dx;
                that.background.position.y -= model.dy;
                model.dx = 0;
                model.dy = 0;
            });
            requestAnimationFrame(animate);

            // render the container
            that.renderer.render(that.stage);
        }
    }

}

var vue = new Vue ();
Assets.load (function () {
    vue.load (vue.startAnimation);
});
