// Organisation : GEODES.UMONTREAL
// Author : Maude Sabourin
// Project : CRSNG - Duckietown configurations

/* =============== SETUP VARIABLES ================= */

// Manage the small window to choose the setup variables
function showGenerateUI(){
	if (lastclicked == "generate"){
		$("#windowGenerate").toggle("blind");
	}else{
		hideLast();
		$("#selectLaunchMiniMenu").hide("blind");
		lastclicked="generate";
		showGenerateUI();
	}
}

/*  =============== (END) ====  SETUP VARIABLES ================= */

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- */

/* =============== LOAD AND SEE A CONFIGURATION FROM A FILE ================= */

// Manage the small window to choose the demo and load
function showSeeUI(){
	if (lastclicked == "see"){
		$("#seeConfig").toggle("blind");
		$("#selectLaunchMiniMenu").toggle("blind");
	}else{
		hideLast();
		if (lastclicked=="generate"){
			$("#selectLaunchMiniMenu").toggle("blind");
		}
		lastclicked="see";
		$("#seeConfig").toggle("blind");
	}
}

/*  =============== (END) ====  LOAD AND SEE A CONFIGURATION FROM A FILE ================= */

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- */

/* =============== COMPARE A LOADED CONFIGURATION WITH ONE OF THE DEMOS ================= */

// Manage the small window to choose the demo and launch comparison
function showCompareUI(){
	if (lastclicked == "compare"){
		$("#compareDemos").toggle("blind");
		$("#selectLaunchMiniMenu").toggle("blind");
	}else{
		// We come from another menu item
		hideLast();
		if (lastclicked=="generate"){
			$("#selectLaunchMiniMenu").toggle("blind");
		}
		lastclicked="compare";
		$("#compareDemos").toggle("blind");
	}
	
	// Reset all colors and legend when the menu is reselected
	eraseColorAllRadio();
	$('#legendCompare').addClass('hide');
}


/* For a given name, find the label associated with the radio button
* Change it's color by associating the right class
* typeError is either 'incorrect' (extra) or 'missing' */
function changeColorRadio(radioName, value, typeError){
	$('label[name="title_'+radioName+'"]').each(function() {
			jQuery(this).addClass('titleNotice');
			jQuery(this).removeClass('normal');
	});
	$('label[for="'+radioName+'"]').each(function() {
		if (jQuery(this).text() == value){
			jQuery(this).addClass(typeError);
			jQuery(this).removeClass('normal');
		}
	});
}
/* =============== (END) ==== COMPARE A LOADED CONFIGURATION WITH ONE OF THE DEMOS ================= */

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- */

// Prevents the double menu opening
function hideLast(){
	switch(lastclicked){
		case "generate":
			$("#windowGenerate").hide("blind");
			break;
		case "see":
			$("#seeConfig").hide("blind");
			break;
		case "compare":
			$("#compareDemos").hide("blind");
			$('#legendCompare').addClass('hide');
			break;
		case "gmf":
			break;
	}
}

function hideAll(){
	$("#windowGenerate").hide("blind");
	$("#seeConfig").hide("blind");
	$("#compareDemos").hide("blind");
	$('#legendCompare').addClass('hide');
}

function uncheckAllRadio(){
	$('input:radio').each(function() {
		jQuery(this).prop("checked", false);
	});
}

function eraseColorAllRadio(){
	$('label').each(function() {
		jQuery(this).removeClass('incorrect');
		jQuery(this).removeClass('missing');
		jQuery(this).removeClass('titleNotice');
		jQuery(this).addClass('normal');
	});
}

/* Finds the radio button associated with the name and category
* Checks the radio fitting the value (
* i.e. if value = false, checks the radio next to the false label */
function updateUISingle(currCategory, flag_name, value){
	$('input:radio.'+currCategory).each(function() {
		if (jQuery(this).attr('name') == flag_name && jQuery(this).attr('value') == value){
			jQuery(this).prop("checked", true).trigger("click");
		}
	});
}