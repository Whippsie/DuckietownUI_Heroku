// Organisation : GEODES.UMONTREAL
// Author : Maude Sabourin
// Project : CRSNG - Duckietown configurations

/* =============== SETUP VARIABLES ================= */

// Manage the small window to choose the setup variables
function setupShow(){
	if (lastclicked == "setup"){
		$("#setupInfos").toggle("blind");
	}else{
		hideAll();
		lastclicked="setup";
		setupShow();
	}
}

/*  =============== (END) ====  SETUP VARIABLES ================= */

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- */

/* =============== LOAD AND SEE A CONFIGURATION FROM A FILE ================= */

// Manage the small window to choose the demo and load
function showLoadSeeUI(){
	if (lastclicked == "load"){
		$("#loadSeeConfig").toggle("blind");
	}else{
		hideAll();
		lastclicked="load";
		showLoadSeeUI();
	}
}

/*  =============== (END) ====  LOAD AND SEE A CONFIGURATION FROM A FILE ================= */

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- */

/* =============== COMPARE A LOADED CONFIGURATION WITH ONE OF THE DEMOS ================= */

// Manage the small window to choose the demo and launch comparison
function showCompareUI(){
	if (lastclicked == "config"){
		$("#compareDemos").toggle("blind");
	}else{
		// We come from another menu item
		hideAll();
		lastclicked="config";
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
function hideAll(){
	$('#legendCompare').addClass('hide');
	$("#setupInfos").hide("blind");
	$("#compareDemos").hide("blind");
	$("#loadSeeConfig").hide("blind");
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