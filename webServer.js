// Organisation : GEODES.UMONTREAL
// Author : Maude Sabourin
// Project : CRSNG - Duckietown configurations

// Basic Express Header
const express = require('express')
var child = require('./executeJava.js');
const app = express()

// Tags the Public folder as containing the resources
app.use(express.static(__dirname + '/public'))

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
	var location = req.body.location
	var nameConfigFile = req.body.nameConfigFile
	var data = child.executeJava(location,nameConfigFile);
	res.send(data);
});

// Routes localhost:3000 to open the index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.listen(3000, () => console.log('Web server listening; Head over to localhost:3000'))