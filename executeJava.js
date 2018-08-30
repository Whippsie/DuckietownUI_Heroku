// Organisation : GEODES.UMONTREAL
// Author : Maude Sabourin
// Project : CRSNG - Duckietown configurations

// We need another process to execute a jar
var execSync = require('child_process').execSync;

// Code inspired from http://4dev.tech/2016/02/how-to-execute-a-jar-file-with-node-js-child-processes/
function executeJava(jarLocation,pathConfigFile) {
	  /* We call the java using the ABSOLUTE PATH on the user's PC
	   * We send to the java :
	   *	1) The relative path to the config file */
	  var res = execSync('java -jar '+ jarLocation + ' "' + pathConfigFile+'"');/*,
		
		// Change execSync to exec for asynchronous call
		// Add the callback function
		function (error, stdout, stderr){
			// For now, simply output the java stdout
				console.log(stdout);
			if(error !== null){
				console.log("Error -> "+error);
			}
		});*/
	  return res;
}

// Unsure if this is necessary, the documentation always provided this function
exports.executeJava = function(location,file){
	var res = executeJava(location,file);
	return res;
}