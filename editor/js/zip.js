
var Zip = {
	createZip: function () {
		var a = document.createElement("a");
    	document.body.appendChild(a);
    	a.style = "display: none";

		var zip = new JSZip();
		var blob = zip.generate({type:"blob"});
		var url = window.URL.createObjectURL(blob);
		
		a.href = url;
		a.download = "test.zip";
		a.click();

		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	},

	drawImage: function () {
		
	}
};