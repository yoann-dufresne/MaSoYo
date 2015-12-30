// Left pannel
var selector = document.querySelector('#fileSelector');
var canvas = document.querySelector('#tileSet');
selector.addEventListener('change', function() {
	var file = selector.files[0];
	var fr = new FileReader();
	fr.onload = function () {
		console.log("loaded");
		img = new Image();
		img.onload = function () {
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img,0,0);
			canvas.toDataURL("image/png");
		};
		img.src = fr.result;
	};
	fr.readAsDataURL(file);
}, false);


// Level
var tiles = new Tiles (7, 3);
var table = document.getElementsByTagName("table")[0];

tiles.draw (table);
