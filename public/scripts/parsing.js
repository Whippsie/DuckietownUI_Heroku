// Organisation : GEODES.UMONTREAL
// Author : Maude Sabourin
// Project : CRSNG - Duckietown configurations


function parsetoROS(filename){
	// Veh arg is always present
	var ros = '<launch> \n \t <arg name="veh" default="$(env VEHICLE_NAME)"/> \n ';
	// For config files, must includes the master file
	ros += '\t <include file="$(find duckietown_demos)/launch/master.launch"> \n ';
	
	// For every arg chosen, we get it's value and make the appropriate line in the .launch
	$('input:radio:checked').each(function() {
		ros += '\t \t <arg name="'+jQuery(this).attr('name') + '" value="' + jQuery(this).attr('value')+'" /> \n';
	});
	ros += '\t </include>';
	ros += '\n </launch>';

	// Write the file in the Downloads folder 
	// Note : because of security issues, we can't write the file to a specific folder
	writeTextFile(filename+".launch", ros, 'ros');
}

/* Intermediaite function used to call the other ones
* First create a dict with the global variables containing the user data
* Then, parse the dict to update the UI 
* Note : The reason why I don't do data -> UI directly is because initially,
* a java file was created with classes and parameters, thus the extra step */
function rosToUI(){
	hideAll();
	var dictUser = rosToDict(dataUser);
	dictToUI(dictUser);
}

/* Cleans the UI from selection and, for every arg in the dict, calls the update feature */
function dictToUI(args){
	uncheckAllRadio();
	for (var key in args){
		// If no category is associated, gets 'Undefined'
		var currCategory = findCategory(key);
		// Checks if arg is associated with a value
		if (args.hasOwnProperty(key)) {
			var flag_name = key;
			var value = args[key];
			// Triggers the radio button clicks corresponding
			updateUISingle(currCategory, flag_name, value);
		}
	}
}


var launchfile
/* Takes a ros .launch config file's content (data) and makes a dictionary
*  Keys = name of the argument and Value = True or False
*  For now, we only accept boolean arguments */
function rosToDict(data){

	// Replace all the "/> in the file with " />
	// That space is necessary for parsing reasons
	data = data.replace(new RegExp("\"/>", 'g'), "\" />");
	
	// We divide the data into lines to easier loop in the file
	var res = data.split("\n");
	
	var args = {};
	for (var i = 0; i<res.length;i++){
		// Every valid line needs to start with this match
		if (res[i].indexOf('<arg')!== -1){
		
			// Divide the line according to spaces (should have 3 sections)
			var split = res[i].split(" ");
			var arg_name = "";
			for (var j = 0; j<split.length;j++){
				if (split[j].indexOf('name=')!== -1){
					// TODO: Should find a way not to have a static 6 in here...
					arg_name = split[j].slice(6,split[j].length-1);
				}
				// Exception for this argument, causes problems
				if (arg_name == "veh"){
					continue;
				}
				if (split[j].indexOf('value=')!== -1){
					// TODO: Should find a way not to have a static 7 in here...
					var arg_val = split[j].slice(7,split[j].length-1);
					
					// Once both the name and value are fetched, we add to the dict
					args[arg_name]= arg_val;
					arg_name = "";
					// TODO: Why isn't there arg_val = ""; here?
				}

			}
		}
	}
	return args;
}
