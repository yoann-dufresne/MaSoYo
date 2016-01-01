
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
			var td = document.createElement("td");
			td.classList.add("tile");
			td.style.width = this.tileSize + "px";
			td.style.height = this.tileSize + "px";
			td.x = x;
			td.y = y;
			this.matrix[x][y] = {td: td};

			td.addEventListener('click', function (event) {
				var elm = event.srcElement;
				if (subImgs[currentX] != undefined && subImgs[currentX][currentY] != undefined) {
					elm.style["background-image"] = "url(\"" + subImgs[currentX][currentY] + "\")";
					that.matrix[elm.x][elm.y].tileX = currentX;
					that.matrix[elm.x][elm.y].tileY = currentY;
					that.matrix[elm.x][elm.y].level = $('input[name="tileType"]:checked').val();;
				}
			});
		}
	}
}

Tiles.prototype = {
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
	}
};
