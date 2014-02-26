#!/bin/env node

var validate = require('./include/validates');
var config = require('./conf/config.json');
var server = require('./server.js');

/* Write pid or die. TODO: Remove this from here. */
var file = require('fs');

file.writeFile(config.pidfile, process.pid, function(err) {
    if(err) {
        console.log('Unable to write pidfile "' + config.pidfile + '"\nError: ' + err);
    } else {
		if( validate.config(config) ){
			server.start();
		}
    }
});
