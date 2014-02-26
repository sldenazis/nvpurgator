#!/bin/env node

/* Load config data  */
var config = require('./conf/config.json'),
	project = require('./conf/project.json');

/* Load server and validate functions */
var server = require('./server.js'),
	validate = require('./include/validates');

/* Validate config.pidfile */
var pidfile = (config.pidfile || '') || '/run/nvpurgator.pid';

var file = require('fs');

file.writeFile(pidfile,process.pid,function(err){
    if(err) {
        console.log('Unable to write pidfile \'' + config.pidfile + '\' - ' + err);
    } else {
		if( validate.config(config) ){
			server.start(config,project);
		}
    }
});
