var http = require('http');
var funcs = require('./include/functions/');
var validate = require('./include/validates');
var purge = require('./purge.js');
/* Load nvpurgator config */
var config = require('./conf/config.json');
/* Load servers data */
var project = require('./conf/project.json');

function serverStart(){
	http.createServer( function (request, response){
		/* Valido el metodo - solo deberia aceptar GET - */
		if ( validate.method(request.method) ){
			/* Valido la ip del cliente */
			if ( validate.client( funcs.getClient(request), config.clients_allow ) ) {
				/* Valido el header 'Host:' */
				if ( validate.domain( request.headers.host, project.domains ) ) {
					funcs.info( 'Host: ' + request.headers.host + ' URL: ' + request.url + ' Method: ' + request.method + '\n' );

					response.writeHead(200, { 'Content-Type': 'text/plain' });
					response.end();

					purge.file( project, request.url );
				} else {
					response.writeHead(406, { 'Content-Type': 'text/plain' });
					response.end('Invalid domain \'' + request.headers.host + '\'.\n');
					funcs.info('Invalid domain \'' + request.headers.host + '\'. Client: ' + funcs.getClient(request) + '\n');
				}
			} else {
				response.writeHead(403, { 'Content-Type': 'text/plain' });
				response.end('Permission Denied! This incident will be reported.\n');
				funcs.info('Client not allowed: ' + funcs.getClient(request) + '\n' );
			}
		} else {
			response.writeHead(405, {
				'Content-Type': 'text/plain'
			})
			response.end('Method not allowed.\n');
		}
	}).listen( config.port );

	console.log( 'Starting on ' + new Date() + '...\n\nServer running at http://127.0.0.1:8000/\n' );
}

exports.start = serverStart;
