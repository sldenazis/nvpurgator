#!/bin/env node

var validate = require('./include/validates');
var config = require('./conf/config.json');
var server = require('./server.js');

if( validate.config(config) ){
	server.start();
}
