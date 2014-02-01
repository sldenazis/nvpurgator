var http = require('http');
var funcs = require('./include/functions/');

function purgeFileProject( project, path ){

	if ( project.enabled ){
		project.servers.forEach(function( server, index ){
			if ( typeof(server.enabled) === 'undefined' || server.enabled !== false ){
				// Armo el objeto para la peticion y llamo a _purge
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
				_purge(request_data);
			} else {
				funcs.info( 'The requested server \'' + server.ip + '\' has been disable by config.' );
			}
		});
	};

};

function _purge(request_data){

	var request = http.request( request_data, function(response){
		funcs.info( 'Requesting server \'' + request_data.hostname + '\'...' );
		funcs.info( 'STATUS: ' + response.statusCode );
		funcs.debug( 'HEADERS: ' + JSON.stringify(response.headers) );
	});

	request.on('error', function(e) {
		funcs.error( 'Problem with request in host ' + request_data.hostname  + ': ' + e.message);
	});

	request.end();
}

exports.file = purgeFileProject;
