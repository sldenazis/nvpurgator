function _colorCode( color ){
	var pcolor = [{
		"name" : "black",
		"id" : 0
	},{
		"name" : "red",
		"id" : 1
	},{
		"name" : "green",
		"id" : 2
	},{
		"name" : "yellow",
		"id" : 3
	},{
		"name" : "blue",
		"id" : 4
	},{
		"name" : "violet",
		"id" : 5
	},{
		"name" : "cyan",
		"id" : 6
	},{
		"name" : "gray",
		"id" : 7
	}];
	
	var ccode = 7;
	
	pcolor.forEach(function( c, index ){
		if ( c.name == color ){
			ccode = c.id;
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
	var cmessage = '\033[0' + bold + ';3' + _colorCode(color) + 'm' + message + '\033[0m';
	return cmessage;
}

function infoLog(message){
	console.log( _colorLog('green','[INFO] ') + message );
}

function noticeLog(message){
	/* noticeLog don't uses colors */
	console.log(message);
}

function errorLog(message){
	console.log( _colorLog('nred','[ERROR] ') + message );
}

function warningLog(message){
	console.log( _colorLog('red','[WARN] ') + message );
}

function debugLog(message){
	console.log( _colorLog('yellow','[DEBUG] ') + message );
}

function noLog(message){
	return;
}

/* Devuelvo la ip del cliente */
function getClientAddress( request ){
	return (request.headers['x-forwarded-for'] || '').split(',')[0] || request.connection.remoteAddress;
}

var config = require('../../../conf/config.json');
var log_level = config.loglevel;

exports.error = errorLog;
exports.notice = noticeLog;
exports.warning = warningLog;
exports.info = infoLog;
exports.debug = debugLog;

switch(log_level){
	case 0:
		exports.warning = noLog;
		exports.info = noLog;
		exports.debug = noLog;
		break;
	case 1:
		exports.info = noLog;
		exports.debug = noLog;
		break;
	case 2:
		exports.debug = noLog;
		break;
	default:
		break;
}

exports.getClient = getClientAddress;
