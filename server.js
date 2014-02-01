var http = require('http');
var funcs = require('./include/functions/');
var error = require('./include/errors');
var validate = require('./include/validates');
var purge = require('./purge.js');
// Load servers data
var project = require('./data/project.json');

function serverStart(){

	http.createServer( function (request, response){
		if ( validate.method(request.method) ){

			if ( validate.apikey( project, request.headers['x-api-key'] ) ){
				funcs.info( 'Host: ' + request.headers.host + ' URL: ' + request.url + ' Method: ' + request.method + '\n' );

				response.writeHead(200, { 'Content-Type': 'text/plain' });
				response.end();

				purge.file( project, request.url );

			} else {
				error.print( 403, response );
			}
		} else {
			error.print( 501, response );
		}
	}).listen(8000);

	console.log( 'Starting on ' + new Date() + '...\n\nServer running at http://127.0.0.1:8000/\n' );
}

exports.start = serverStart;
