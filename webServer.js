// Organisation : GEODES.UMONTREAL
// Author : Maude Sabourin
// Project : CRSNG - Duckietown configurations

// Basic Express Header
const express = require('express');
var fs = require('fs');
var child = require('./executeJava.js');
const app = express();

// Tags the Public folder as containing the resources
app.use(express.static(__dirname + '/public'));

// Allows POST arguments fetching 
app.use(express.urlencoded({extended: true})); 

// !!! Do not change the order of these routings or the HTML response in the XMLHTTP will not work !!! 

// Routes localhost:3000/index to open the index.html
app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

/* When /call.. is requested, fetch the POST arguments
* Then, calls a module used to execute a Java jar
* Returns the data obtained as a response */
app.post('/call-java-app', function (req, res){
	var jarLocation = req.body.location
	var pathConfigFile = req.body.nameConfigFile
	var data = child.executeJava(jarLocation,pathConfigFile);
	res.send(data);
});

app.post('/uploads', function (req, res){
	var file_name = req.body.fileName;
    var file_content = req.body.fileContent;
	
    var stream = fs.createWriteStream("public/files/"+file_name);
    stream.once('open', function () {
        stream.write(file_content);
        stream.end();
    });
});

app.post('/downloads', function(req, res) {
	var data = readFile("public/files/"+req.body.fileName);
	res.send(data);
})

function readFile( url ){
	var res = fs.readFileSync(url, 'utf8');
	return res;
}

/*
function readFile( url ){
	var res;
	fs.readFile(url, 'utf8', function( err, data ){
        if ( err ) {
            console.log( 'error', err );
        } else {
            console.log('file read');
            res = data;
        }
    });
	console.log('res is ' + res);
	return res;
}
*/
// Routes localhost:3000 to open the index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.listen(process.env.PORT || 3000, () => console.log('Web server listening; Head over to localhost:3000'))