var http = require('http');
var funcs = require('./include/functions/');

function purgeFileProject( project, path ){

	if ( project.enabled ){
		project.servers.forEach(function( server, index ){
			if ( typeof(server.enabled) === 'undefined' || server.enabled !== false ){
				/* Armo el objeto para la peticion y llamo a _purge */
				var port = project.port;
				if ( typeof(server.port) !== 'undefined' ){
					port = server.port;
				}
				var request_data = {
					hostname: server.ip,
					port: port,
					path: path,
					headers: { 'Host' : project.domain },
					method: 'PURGE'
				};
				/* Cantidad de intentos si falla el primer request. TODO: hacerlo configurable */
				var retry = 2;
				_purge(request_data, retry);
			} else {
				funcs.info( 'The requested server \'' + server.ip + '\' has been disable by config.' );
			}
		});
	};

};

function _purge(request_data, retry){
	var request = http.request( request_data, function(response){
		funcs.info( 'Requesting server \'' + request_data.hostname + '\'...' );
		funcs.info( 'STATUS: ' + response.statusCode );
		funcs.debug( 'HEADERS: ' + JSON.stringify(response.headers) );
		/* Para no saturar el pool de conexiones:
		 * http://nodejs.org/api/http.html#http_class_http_clientrequest */
		response.resume();
	});

	request.end();

	request.on('error', function(e) {
		funcs.error( '[' + retry + '] Problem with request in host ' + request_data.hostname  + ': ' + e.message);
		if( retry > 0 ){
			/* Espero un segundo para volver a realizar el request.
			 * TODO: hacerlo configurable */
			setTimeout(function(){
				_purge(request_data, retry - 1);
			}, 1000);
		}
	});
}

exports.file = purgeFileProject;
