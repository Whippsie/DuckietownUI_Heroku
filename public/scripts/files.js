// Organisation : GEODES.UMONTREAL
// Author : Maude Sabourin
// Project : CRSNG - Duckietown configurations

// Code inspired from https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript/21012821
function writeTextFile(filepath, output, type) {
		if (type == 'java'){
			var link = document.getElementById('downloadlinkjava');
		}else{
			var link = document.getElementById('downloadlinkros');
		}
		link.href = makeTextFile(output);
		link.download = filepath;
		var event = new MouseEvent('click');
		link.dispatchEvent(event);
}

// Code taken from https://stackoverflow.com/questions/8178825/create-text-file-in-javascript
var textFile = null;
makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};

// Code inspired from https://stackoverflow.com/questions/32701374/load-a-file-automatically-without-using-a-click-button/32701435
function loadFileAsText() {
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	if (fileToLoad!=null){
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) {
			// Once the reading is done, assign the result to the variable
			dataUser = fileLoadedEvent.target.result;
			
			// Only then do we proceed to the parsing
			rosToUI();
		};
		fileReader.readAsText(fileToLoad, "UTF-8");
	}else{
		alert('Please select a config .launch file first');
	}
}

// fullpath is the relative path on the node.js server
function readFile (fullpath){
	var result="";
	$.ajax({
		url: fullpath,
		async: false,
		dataType: "text",
		success: function (data) {
			result = data;
		}
	});
	return result;
}