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

exports.apikey = validateApiKey;
exports.method = validateMethod;
