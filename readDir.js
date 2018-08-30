// Organisation : GEODES.UMONTREAL
// Author : Maude Sabourin
// Project : CRSNG - Duckietown configurations

// Code adapted from https://code-maven.com/list-content-of-directory-with-nodejs
// For now, this code isn't working, it seemed tedious for the result wanted
var fs = require('fs');
fs.readdir(path, function(err, items) { 
    for (var i=0; i<items.length; i++) {
		$("#demo_files").prepend('<option selected="selected" value="' + items[i] + '"> ' + items[i] + ' </option>');
    }
});