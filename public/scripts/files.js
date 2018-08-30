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
function loadFileAsText(idName) {
	var fileToLoad = document.getElementById(idName).files[0];
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

function uploadServer(fileName, fileContent){
	var url = '/uploads';
	
	var xmlHttp = new XMLHttpRequest();

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === 4) {
			console.log("Uploaded");
		}
	}
	xmlHttp.open("POST", url, true); // false for synchronous request
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send('fileName='+fileName+'&fileContent='+fileContent);
}

function downloadServer(fileName){
	var url = '/downloads';
	var xmlHttp = new XMLHttpRequest();

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === 4) {
			dataUser = xmlHttp.responseText;
			rosToUI();
		}
	}
	xmlHttp.open("POST", url, true); // false for synchronous request
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send('fileName='+fileName);
}

/* VERSION FOR COMPARE, RIGHT NOW, UNABLE TO PASS A FUNCTION OR REUSE THE CODE BECAUSE OF ASYNCHRONOUS PROBLEMS */
/* FOR THIS REASON, A VERY SIMILAR FUNCTION WAS MADE */
// Code inspired from https://stackoverflow.com/questions/32701374/load-a-file-automatically-without-using-a-click-button/32701435
function loadFileAsTextCompare(idName) {
	var fileToLoad = document.getElementById(idName).files[0];
	if (fileToLoad!=null){
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) {
			// Once the reading is done, assign the result to the variable
			dataUser = fileLoadedEvent.target.result;
			
			// Prepare 2 dictionnaries, one for the chosen demo
			// One for the user's loaded configuration
			var dictDemo = prepDemoDict();
			var dictUser = prepConfigDict();
			compareDict(dictDemo, dictUser);
		};
		fileReader.readAsText(fileToLoad, "UTF-8");
	}else{
		alert('Please select a config .launch file first');
	}
}

function downloadServerCompare(fileName){
	var url = '/downloads';
	var xmlHttp = new XMLHttpRequest();

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === 4) {
			dataUser = xmlHttp.responseText;
			// Prepare 2 dictionnaries, one for the chosen demo
			// One for the user's loaded configuration
			var dictDemo = prepDemoDict();
			var dictUser = prepConfigDict();
			compareDict(dictDemo, dictUser);
		}
	}
	xmlHttp.open("POST", url, true); // false for synchronous request
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send('fileName='+fileName);
}


/* VERSION FOR GMF, RIGHT NOW, UNABLE TO PASS A FUNCTION OR REUSE THE CODE BECAUSE OF ASYNCHRONOUS PROBLEMS */
/* FOR THIS REASON, A VERY SIMILAR FUNCTION WAS MADE */
// Code inspired from https://stackoverflow.com/questions/32701374/load-a-file-automatically-without-using-a-click-button/32701435
// First, load the file from the computer
function loadFileAsTextGMF(idName) {
	var fileToLoad = document.getElementById(idName).files[0];
	if (fileToLoad!=null){
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) {
			var data = fileLoadedEvent.target.result;
			
			var fileName = $('#nameGenConfig').val() + ".launch";
			// Then, upload the file to the server so the jar can find it
			uploadServer (fileName,data);
			callJavaApp("public/files/"+fileName);
		};
		fileReader.readAsText(fileToLoad, "UTF-8");
	}else{
		alert('Please select a config .launch file first');
	}
}

function downloadServerGMF(fileName){
	var url = '/downloads';
	var xmlHttp = new XMLHttpRequest();

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === 4) {
			var data = xmlHttp.responseText;
			uploadServer (fileName,data);
			callJavaApp("public/files/"+fileName);
		}
	}
	xmlHttp.open("POST", url, true); // false for synchronous request
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send('fileName='+fileName);
}

