var http = require('http');
var funcs = require('./include/functions/');
//var error = require('./include/errors');
var validate = require('./include/validates');
var purge = require('./purge.js');
// Loaf nvpurgator config
var config = require('./conf/config.json');
// Load servers data
var project = require('./conf/project.json');

function serverStart(){
	//console.log( config.clients_allow );

	http.createServer( function (request, response){
		if ( validate.method(request.method) ){
			//if ( validate.apikey( project, request.headers['x-api-key'] ) ){
			if ( validate.client( funcs.getClient(request), config.clients_allow ) && validate.domain( request.headers.host, project.domain ) ) {
				funcs.info( 'Host: ' + request.headers.host + ' URL: ' + request.url + ' Method: ' + request.method + '\n' );

				response.writeHead(200, { 'Content-Type': 'text/plain' });
				response.end();

				purge.file( project, request.url );

			} else {
				//error.print( 403, response );
				response.writeHead(403, {
					'Content-Type': 'text/plain'
				});
				response.end('Permission Denied! This incident will be reported.\n');
				funcs.info('Permission denied! Request client: ' + funcs.getClient(request) + '\n' );
			}
		} else {
			//error.print( 501, response );
			response.writeHead(501, {
				'Content-Type': 'text/plain'
			})
			response.end('Method not allowed.\n');
		}
	}).listen( config.port );

	console.log( 'Starting on ' + new Date() + '...\n\nServer running at http://127.0.0.1:8000/\n' );
}

exports.start = serverStart;
