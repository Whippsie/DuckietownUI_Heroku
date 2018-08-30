// Organisation : GEODES.UMONTREAL
// Author : Maude Sabourin
// Project : CRSNG - Duckietown configurations

/* Takes the initial flags file (data) and makes a dictionary 
*  Key = category and Value = all arguments associated
*  Uses a fixed dict editable in globalvar.js
*  This dict will be used to create the UI initially */
function preparedata (data){
	var args = {};
	var k = 0;

	// Removes all tabulation in the data
	data = data.replace(/\t/g, '');

	// Loops line by line
	var res = data.split("\n");
	for (var i = 0; i<res.length;i++){
		
		// Resplit the line in parts using space
		var argParts = res[i].split(" ");
		for (var j = 0; j<argParts.length;j++){
			// Removes the non T/F arguments
			if (argParts[j].includes("name=") && (argParts[j+1].includes("true")||argParts[j+1].includes("false"))){
				
				//Format to get the argument name
				var argName = argParts[j].replace(/"/g,'');
				argName = argName.replace('name=','');
				
				var argCategory = findCategory(argName)
				
				/* Since a category has multiple arguments, we must add an array to the dict
				*  The first time a category is added, we create the empty array */
				if (args[argCategory] == null){
					args[argCategory] = [];
				}
				
				args[argCategory].push (argName);	
			}
		}
	}
	return args;
}

// Search in a static dict the associated category
// If none is found, returns Undefined
function findCategory(arg){
	for (var key in dict){
		if (arg.includes(dict[key]) || dict[key].includes(arg)){
			return key;
		}
	}
	return "Undefined";
}