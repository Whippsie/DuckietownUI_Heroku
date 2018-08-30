// Organisation : GEODES.UMONTREAL
// Author : Maude Sabourin
// Project : CRSNG - Duckietown configurations

// TODO: COMMENT THIS FILE

//parsedValues is a dictionary containing array
function addRadioBool(parsedValues){
	var htmlAdd = "";
	//key = category, values = flagnames
	for (var category in parsedValues){
		var flags = parsedValues[category];
		htmlAdd += "<div id='div_" + category + "' class='div_radio'> <h3> " + category + " </h3>";
		//For every flag in the category
		for (var flag in flags){
			var flagName = flags[flag];
			var id = "radio_"+ flagName;
			htmlAdd += "<div class='radio' id='"+id+"'> <label name='title_"+flagName+ "'>"+flagName+"</label><br>";
			
			//Create 2 radio buttons true and false
			for (var j = 0 ; j < 2 ; j++){
				var text = document.createElement('label');
				text.innerHTML = j%2 ? 'false' : 'true';
				htmlAdd += "<input type='radio' name='" + flagName+"' value='"+text.innerHTML+"' id='"+(flagName+j)+"' class='"+category+"' > <label for='"+flagName+ "'>"+text.innerHTML+"</label><br>";
				var temp = id;
				if (flagName.indexOf('/') !== -1){
					temp = id.replace('/','\\/');
				}
			}
			htmlAdd += "<br></div>";
		}
		htmlAdd += "</div>";
	}
	htmlAdd += "<br>";
	$("#title").after(htmlAdd);
	$("#confirm").before("<br>");
}


//TODO CHANGE LAUNCHFILE, REMOVED IT
function updateUI(javaDict){
	$('input:radio.'+launchfile).each(function() {
		jQuery(this).prop("checked", false);
		//Si le radio appartient au dictionnaire et qu'on a la bonne valeur T/F présente dans le java, on le check
		if (jQuery(this).attr('name') in javaDict && jQuery(this).attr('value') == javaDict[jQuery(this).attr('name')]){
			jQuery(this).prop("checked", true).trigger("click");
		}
	});
}
