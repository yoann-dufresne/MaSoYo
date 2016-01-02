
var Zip = {
	createZip: function () {
		var name = document.querySelector("#name").value;

		var a = document.createElement("a");
    	document.body.appendChild(a);
    	a.style = "display: none";

		var zip = new JSZip();
		this.drawImage (zip, name);
		var blob = zip.generate({type:"blob"});
		var url = window.URL.createObjectURL(blob);
		
		a.href = url;
		a.download = name + ".zip";
		a.click();

		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	},

	drawImage: function (zip, name) {
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