const axios = require('axios');
const XeroClient = require('xero-node').AccountingAPIClient;

const { invoice } = require('../config');

const {
  BASE_URL,
  headerConfig,
} = invoice;

let xero = new XeroClient(invoice.appCredentials);

class InvoiceService {
  static async createContact(party) {
    const data = {
      "Name": "FOR TEST 1"
      // "EmailAddress": party.emailAddresses[0]
    };

    const result = await xero.contacts.create(data);

    return result;
  }
  static async createInvoice(input) {
    
    const result = await xero.invoices.create(data);
    return axios.post()
  }
}

module.exports = InvoiceService;
