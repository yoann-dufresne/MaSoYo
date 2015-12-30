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
    }

}

var vue = new Vue (model, controler);
vue.changeStage("easy");
vue.startAnimation();
