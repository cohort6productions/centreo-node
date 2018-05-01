const axios = require('axios');

const { crm } = require('../config');

const {
  BASE_URL,
  headerConfig,
} = crm;

class RegistrationService {
  static createRegistration(party) {
    return axios.post(BASE_URL, party, headerConfig);
  }
}

module.exports = RegistrationService;
