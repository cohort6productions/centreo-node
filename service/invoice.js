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
      Name: party.name,
      // EmailAddress: party.party.emailAddresses[0],
    };

    const result = await xero.contacts.create(data);

    return result;
  }
  static async createInvoice({ ContactID }) {
    const data = {
      Type: "ACCREC",
      Contact: { 
        ContactID,
      },
      LineItems: [
        {
          Quantity: "1",
          ItemCode: "HKCI",
        }
      ],
      Date: new Date(),
      DueDate: new Date(),
      LineAmountTypes: "NoTax",
      Status: "DRAFT",
    }

    const result = await xero.invoices.create(data);

    return result
  }
}

module.exports = InvoiceService;
