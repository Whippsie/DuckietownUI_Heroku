// Organisation : GEODES.UMONTREAL
// Author : Maude Sabourin
// Project : CRSNG - Duckietown configurations

// We need another process to execute a jar
var exec = require('child_process').exec;

// Code inspired from http://4dev.tech/2016/02/how-to-execute-a-jar-file-with-node-js-child-processes/
function executeJava(location,file) {
	  /* We call the java using the ABSOLUTE PATH on the user's PC
	   * We send to the java :
	   *	1) The absolute path (to get the working directory)
	   *	2) The name of the config file loaded by the user
	   *	3) The name of the output for the XMI GMF (we simply take 2 and add the right extension) */
	  exec('java -jar '+ location + ' "'+location+'" ' + file + '.launch ' + file + '_GMF.canard',
		function (error, stdout, stderr){
			// For now, simply output the java stdout
			console.log('Output -> ' + stdout);
			if(error !== null){
				console.log("Error -> "+error);
			}
		});
}

// Unsure if this is necessary, the documentation always provided this function
exports.executeJava = function(location,file){
	return executeJava(location,file);
}