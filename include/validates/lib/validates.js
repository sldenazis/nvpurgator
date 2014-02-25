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

function validateDomain( domain, project_domains ){
	var valid = false;
	project_domains.forEach( function( dom, index ){
		if( dom.name === domain ){
			valid = true;
		}
	})
	return valid;
}

function _validatePort(port){
	var valid = false
	if( typeof(port) === 'number' && port > 0 ){
		valid = true;
	}
	return valid;
}

function validateConfig(config){
	var valid = true;
	if( ! _validatePort(config.port) ){
		console.log('Invalid port \'' + config.port + '\'.' );
		valid = false;
	}
	return valid
}

exports.apikey = validateApiKey;
exports.method = validateMethod;
exports.client = validateClient;
exports.domain = validateDomain;
exports.config = validateConfig;
