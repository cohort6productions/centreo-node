const bunyan = require('bunyan');

const config = require('../config');

const logger = bunyan.createLogger(config.logger);

module.exports = logger;
