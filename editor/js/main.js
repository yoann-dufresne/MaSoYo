
// Selectors
var selector = document.querySelector('#fileSelector');
var canvas = document.querySelector('#tileSet');
var tmpCanvas = document.createElement("canvas");
var table = document.querySelector('#stage');
var download = document.querySelector('#download');

var img = null;
var subImgs = [];
var currentX=0, currentY=0;


// ----- Tile selector drawing -----
var drawTileSelector = function (x, y) {
	var ctx = canvas.getContext("2d");
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img,0,0);
	
	if (x != undefined && y != undefined) {
		// Create the subImg if it doesn't exist
		tmpCanvas.width = tiles.tileSize;
		tmpCanvas.height = tiles.tileSize;

		if (subImgs[x] == undefined)
			subImgs[x] = [];
		if (subImgs[x][y] == undefined) {
			var tmpCtx = tmpCanvas.getContext("2d");
			tmpCtx.drawImage(
				canvas,
				x * tiles.tileSize,
				y * tiles.tileSize,
				tiles.tileSize, tiles.tileSize,
				0, 0,
				tiles.tileSize, tiles.tileSize
			);
			subImgs[x][y] = tmpCanvas.toDataURL("image/png");
		}
	}

	// Square drawing
	if (x != undefined && y != undefined) {
		// Draw rectangle
		ctx.rect(
			x * tiles.tileSize,
			y * tiles.tileSize,
			tiles.tileSize,
			tiles.tileSize
		);
		ctx.stroke();
	}
}


// ----- File selector -----
selector.addEventListener('change', function() {
	var file = selector.files[0];
	var fr = new FileReader();

	fr.onload = function () {
		img = new Image();
		img.onload = function () {
			canvas.style.display = "block";
			drawTileSelector ();
		};
		img.src = fr.result;
	};
	fr.readAsDataURL(file);
}, false);


// ----- Canvas -----
canvas.addEventListener ('click', function (event) {
	var x = event.clientX - $(canvas).offset().left;
    var y = event.clientY - $(canvas).offset().top;
	
	currentX = Math.floor(x / tiles.tileSize);
	currentY = Math.floor(y / tiles.tileSize);

	drawTileSelector(currentX, currentY);
});



// Create and draw the stage
var tiles = new Tiles (7, 3, 50);
tiles.draw (table);



// ----- Download button -----
download.addEventListener ('click', function () {
	Zip.createZip();
});
