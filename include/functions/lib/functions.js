function _colorCode( color ){
	var pcolor = [{
		"name" : "black"
	},{
		"name" : "red"
	},{
		"name" : "green"
	},{
		"name" : "yellow"
	},{
		"name" : "blue"
	},{
		"name" : "violet"
	},{
		"name" : "cyan"
	},{
		"name" : "white"
	}];
	
	var ccode;
	
	pcolor.forEach(function( c, index ){
		if ( c.name == color ){
			ccode = index;
		}
	})

	if ( typeof(ccode) == "undefined" ) ccode = 7;

	return ccode;
}

function _colorLog( color, message ){
	var bold = 0;
	if ( color[0] == 'n' ){
		bold = 1;
		color = color.substring(1);
	}
	var cmessage = '\033[0' + bold + ';3' + _colorCode(color) + 'm' + message + '\033[00;37m';
	return cmessage;
}

function infoLog(message){
	var message = '[INFO] ' + message;
	console.log( _colorLog( 'white', message ) );
}

function errorLog(message){
	var message = '[ERROR] ' + message;
	console.log( _colorLog( 'nred', message ) );
}

function warningLog(message){
	var message = '[WARN] ' + message;
	console.log( _colorLog( 'red', message ) );
}

function debugLog(message){
	var message = '[DEBUG] ' + message;
	console.log( _colorLog( 'yellow', message ) );
}

exports.info = infoLog;
exports.error = errorLog;
exports.warning = warningLog;
exports.debug = debugLog;
