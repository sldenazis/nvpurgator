function _colorCode(color){
	var pcolor = [{ "name" : "black","id" : 0 },{ "name" : "red","id" : 1 },
				  { "name" : "green","id" : 2 },{ "name" : "yellow","id" : 3 },
				  { "name" : "blue","id" : 4 },{ "name" : "violet","id" : 5 },
				  { "name" : "cyan","id" : 6 },{ "name" : "gray","id" : 7 }];
	var ccode = 7;
	
	pcolor.forEach( function(c,index){
		if( c.name == color ){ ccode = c.id; }
	})

	if ( typeof(ccode) == "undefined" ) ccode = 7;

	return ccode;
}

function _colorLog(color,message){
	var bold = 0;
	if( color[0] == 'n' ){
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
	console.log( _colorLog('red','[ERROR] ') + message );
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

function getDate(format){
	/* Date format ~ http://www.3engine.net/wp/2013/05/node-js-javascript-funcion-para-formatear-una-fecha/ */
	Date.prototype.format = function dateFormat(fstr,utc){
		var that = this;
		utc = utc ? 'getUTC' : 'get';
		return fstr.replace (/%[YmdHMS]/g, function (m) {
			switch(m){
				case '%Y': return that[utc + 'FullYear']();
				case '%m': m = 1 + that[utc + 'Month'](); break;
				case '%d': m = that[utc + 'Date'](); break;
				case '%H': m = that[utc + 'Hours'](); break;
				case '%M': m = that[utc + 'Minutes'](); break;
				case '%S': m = that[utc + 'Seconds'](); break;
				default: return m.slice(1);
			}
			return ('0' + m).slice (-2);
		});
	}
	var date = new Date();
	return date.format(format,true);
}

/* Devuelvo la ip del cliente */
function getClientAddress(request){
	return (request.headers['x-forwarded-for'] || '').split(',')[0] || request.connection.remoteAddress;
}

function logRequest(request,code){
	this.notice(
		this.getClient(request) + ' - - [' +
		this.getDate('%Y/%m/%d:%H:%M:%S') + '] "' +
		request.method + ' ' +
		request.headers.host +
		request.url + '" ' + code + ' "' +
		request.headers['user-agent'] + '"'
	);
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
exports.getDate = getDate;
exports.logRequest = logRequest;
