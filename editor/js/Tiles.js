
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
