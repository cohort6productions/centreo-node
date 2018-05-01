const axios = require('axios');

const { invoice } = require('../config');

const {
  BASE_URL,
  headerConfig,
} = invoice;

class InvoiceService {
  static createContact(party) {
    const contactURL = BASE_URL + 'Contacts';
    const data = {
      "Name": party.name
      // "EmailAddress": party.emailAddresses[0]
    };
    return axios.post(contactURL, data, headerConfig);
  }
  static createInvoice(input) {
    const invoiceURL = BASE_URL + 'Invoices'
    return axios.post()
  }
}

module.exports = RegistrationService;
