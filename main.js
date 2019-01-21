'use strict';
const alexaSdk = require('alexa-sdk');

module.exports.handleRequest = (event, context, callback) => {
	var alexa = alexaSdk.handler(event, context);
	alexa.dynamoDBTableName = 'alexa-rota';
	alexa.registerHandlers(
		require('./handlers/rotaHandler.js')
	);
	alexa.execute();
};
