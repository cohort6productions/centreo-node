const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'centreo',
  level: 'debug',
});

module.exports = logger;
