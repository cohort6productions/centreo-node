const axios = require('axios');

const log = require('../lib/logger');
const config = require('../config');

const {
  BASE_URL,
  headerConfig,
} = config;

class RegistrationService {
  static createRegistration(party) {
    return axios.post(BASE_URL, party, headerConfig);
  }
}

module.exports = RegistrationService;
