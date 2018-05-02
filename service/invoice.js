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
  static createInvoice(input) {
    const invoiceURL = BASE_URL + 'Invoices'
    return axios.post()
  }
  // static async getInvoice() {
  //   // You can initialise Private apps directly from your configuration

  //   const result = await xero.invoices.get();
    
  //   console.log('Number of invoices:', result.Invoices.length);

  //   return result.Invoices[0]
  // }
}

module.exports = InvoiceService;
