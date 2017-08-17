'use strict';
const alexaSdk = require('alexa-sdk');

module.exports.handleRequest = (event, context, callback) => {
  var alexa = alexaSdk.handler(event, context);
	alexa.registerHandlers(
		require('./handlers/rotaHandler.js')
	);
	alexa.execute();
};
