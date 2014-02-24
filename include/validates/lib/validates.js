function validateApiKey( project, api_key ){
	if ( typeof(api_key) !== 'undefined' ){
		if ( project.api_key === api_key ) {
			return true;
		} else {
			console.log('Incorrect api key \'' + api_key + '\'.\n');
		}
	} else {
		console.log('Api key is missing.\n');
	}
	return false;
}

function validateMethod( method ){
	var is_valid = false;
	if ( method == 'GET' ) is_valid = true;
	return is_valid;
}

function validateClient( client_ip, clients_allow ){
	var allow = false;
	clients_allow.forEach( function( client, index ){
		if( client.ip === client_ip ){
			allow = true;
		}
	})
	return allow;
}

/* TODO: agregar la posibilidad de validar diferentes dominios */
function validateDomain( domain, project_domain ){
	if( domain === project_domain ){
		return true;
	} else {
		return false;
	}
}

exports.apikey = validateApiKey;
exports.method = validateMethod;
exports.client = validateClient;
exports.domain = validateDomain;
