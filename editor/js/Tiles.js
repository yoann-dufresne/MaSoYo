
function Tiles (width, height) {
	this.height = height;
	this.width = width;

	// Create the matrix
	this.matrix = [];
	for (x=0 ; x<width ; x++) {
		this.matrix[x] = [];
		for (y=0 ; y<height ; y++) {
			var td = document.createElement("td");
			td.classList.add("tile");
			this.matrix[x][y] = {td: td};
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
