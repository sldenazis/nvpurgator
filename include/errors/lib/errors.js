function printError( error_code, response ) {
	/* Devuelve el error especificado al cliente,
	 * comienza y termina la respuesta del servidor,
	 * por eso recibe response como parametro.
	 * */
	response.writeHead(error_code, {
		'Content-Type': 'text/plain'
	});

	switch(error_code)
	{
		case 403:
			response.end('Permission Denied.\n');
			break;
		case 501:
			response.end('Method not allowed.\n');
			break;
		default:
			response.end('Unknown error.\n');
	}
}

exports.print = printError;
