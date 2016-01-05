
function Tiles (width, height, tileSize) {
	var that = this;

	this.height = height;
	this.width = width;
	this.tileSize = tileSize;

	// Create the matrix
	this.matrix = [];
	for (x=0 ; x<width ; x++) {
		this.matrix[x] = [];
		for (y=0 ; y<height ; y++) {
			this.matrix[x][y] = this.createTd(x, y);

			this.matrix[x][y].td.addEventListener('click', function (event) {
				var elm = event.target || event.srcElement;
				if (subImgs[currentX] != undefined && subImgs[currentX][currentY] != undefined) {
					elm.style["background-image"] = "url(\"" + subImgs[currentX][currentY] + "\")";
					var mc = that.matrix[elm.x][elm.y];
					mc.tileX = currentX;
					mc.tileY = currentY;

					if (eventSelector.value != "none") {
						mc.event = eventSelector.value;
						elm.innerHTML = "<p>" + eventSelector.value + "</p>";
					}
				}
			});
		}
	}
}

Tiles.prototype = {
	createTd: function (x, y) {
		var td = document.createElement("td");
		td.classList.add("tile");
		td.style["min-width"] = this.tileSize + "px";
		td.style["height"] = this.tileSize + "px";
		td.x = x;
		td.y = y;

		return {td: td};
	},

	draw: function (table) {
		// Remove prec td
		while (table.hasChildNodes())
			table.removeChild(table.lastChild);

		// Create the new table
		for (y=0 ; y<this.height ; y++) {
			var tr = document.createElement("tr");

			for (x=0 ; x<this.width ; x++) {
				tr.appendChild(this.matrix[x][y].td);
			}

			table.appendChild (tr);
		}
	},

	enlarge: function (xAdd, yAdd, shift, callback) {
		var width = this.width + (xAdd ? 1 : 0);
		var height = this.height + (yAdd ? 1 : 0);
		console.log(width, height);

		var matrix = [];
		for (var i=0 ; i<width ; i++) {
			matrix[i] = [];

			for (j=0 ; j<height ; j++) {
				var x = i - (xAdd ? shift : 0);
				var y = j - (yAdd ? shift : 0);

				var td = null;
				if (this.matrix[x] == undefined || this.matrix[x][y] == undefined)
					td = this.createTd (i, j);
				else
					td = this.matrix[x][y];
				td.x = i;
				td.y = j;

				matrix[i][j] = td;
			}
		}
		
		this.matrix = matrix;
		this.height = height;
		this.width = width;

		callback ();
	}
};
