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
		var date = funcs.getDate('%Y/%m/%d %H:%M:%S');
		var client_ip = funcs.getClient(request);

		/* Valido la ip del cliente */
		if ( validate.client( client_ip, config.clients_allow ) ) {
			/* Valido el metodo - solo deberia aceptar GET - */
			if ( validate.method(request.method) ){
				/* Valido el header 'Host:' */
				if ( validate.domain( request.headers.host, project.domains ) ) {
					response.writeHead(200, { 'Content-Type': 'text/plain' });
					response.end();
					funcs.notice('['+ date + '] [GET "http://' + request.headers.host + request.url + '"] from ' + client_ip + '.');
					//funcs.logRequest(request,200);
					purge.file(project,request.url,request.headers.host);
				} else {
					response.writeHead(406, { 'Content-Type': 'text/plain' });
					response.end('Invalid domain "' + request.headers.host + '".\n');
					funcs.notice('[' + date + '] [Invalid domain "' + request.headers.host + '"] from ' + client_ip + '.');
					//funcs.logRequest(request,406)
				}
			} else {
				response.writeHead(405, { 'Content-Type': 'text/plain' });
				response.end('Method "' + request.method + '" not allowed.\n');
				funcs.notice('[' + date + '] [Method "' + request.method + '" not allowed] from ' + client_ip + '.');
				//funcs.logRequest(request,405);
			}
		} else {
			response.writeHead(403, { 'Content-Type': 'text/plain' });
			response.end('Permission Denied! This incident will be reported.\n');
			funcs.notice('[' + date + '] [Permission denied by config] from ' + client_ip + '. Request: ' + request.method + ' http://' + request.headers.host + request.url);
			//funcs.logRequest(request,403);
		}
	}).listen( config.port );

	console.log( 'Starting on ' + new Date() + '...\n\nServer running at http://127.0.0.1:' + config.port + '/\n' );
}

exports.start = serverStart;
