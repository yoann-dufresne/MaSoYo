
var Zip = {
	createZip: function () {
		var name = document.querySelector("#name").value;
		var zip = new JSZip();

		// Prepare zip
		var properties = this.getProperties();
		this.drawImage (zip, name, properties);
		this.jsonDescriptor (zip, name, properties);
		
		// Generate zip
		var blob = zip.generate({type:"blob"});
		var url = window.URL.createObjectURL(blob);
		
		// Download
		var a = document.createElement("a");
    	document.body.appendChild(a);
    	a.style = "display: none";
		a.href = url;
		a.download = name + ".zip";
		a.click();

		// Clean
		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	},

	getProperties: function () {
		var minX=tiles.matrix.length;
		var maxX=-1;
		var minY=tiles.matrix[0].length;
		var maxY=-1;
		var mx = tiles.matrix;

		// Analysis of the stage
		for (var x=0 ; x<tiles.matrix.length ; x++) {
			for (var y=0 ; y<tiles.matrix[x].length ; y++) {
				if (mx[x][y].tileX != undefined) {
					if (x < minX)
						minX = x;
					if (x > maxX)
						maxX = x;
					if (y < minY)
						minY = y;
					if (y > maxY)
						maxY = y;
				}
			}
		}

		return {minX: minX, maxX: maxX, minY: minY, maxY: maxY};
	},

	jsonDescriptor: function (zip, name, properties) {
		var desc = {};

		desc.width = properties.maxX - properties.minX + 1;
		desc.height = properties.maxY - properties.minY + 1;

		//desc.startX =
		//desc.startY =

		desc.background = name + "_bg.png";

		zip.file(name + ".json", JSON.stringify(desc));
	},

	drawImage: function (zip, name, properties) {
		var minX = properties.minX;
		var maxX = properties.maxX;
		var minY = properties.minY;
		var maxY = properties.maxY;
		var mx = tiles.matrix;

		// Stage picture creation
		var draw = document.createElement("canvas");
		document.body.appendChild(draw);
		draw.width = (maxX - minX + 1) * tiles.tileSize;
		draw.height = (maxY - minY + 1) * tiles.tileSize;
		draw.style = "display: none";

		var ctx = draw.getContext("2d");
		for (var x=minX ; x<=maxX ; x++) {
			for (var y=minY ; y<=maxY ; y++) {
				if (mx[x][y].tileX != undefined) {
					var tx = mx[x][y].tileX;
					var ty = mx[x][y].tileY;

					ctx.drawImage(
						canvas,
						tx * tiles.tileSize,
						ty * tiles.tileSize,
						tiles.tileSize, tiles.tileSize,
						(x - minX) * tiles.tileSize,
						(y - minY) * tiles.tileSize,
						tiles.tileSize, tiles.tileSize
					);
				}
			}
		}

		// Save in zip
		var src = draw.toDataURL("image/png");
		zip.file(name + "_bg.png", src.substr(src.indexOf(',')+1), {base64: true});

		document.body.removeChild(draw);
	}
};