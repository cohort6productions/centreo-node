const XeroClient = require('xero-node').AccountingAPIClient;

const { invoice } = require('../config');

const xero = new XeroClient(invoice.appCredentials);

class InvoiceService {
  static async createContact({
    input,
  }) {
    const data = {
      Name: input.name,
      EmailAddress: input.email,
      Addresses: [
        {
          AddressType: 'POBOX',
          AddressLine1: input.street,
          City: input.city,
          Country: input.country,
          PostalCode: input.zip,
        },
      ],
      Phones: [
        {
          PhoneType: 'DEFAULT',
          PhoneNumber: input.phone,
        },
      ],
    };

    const result = await xero.contacts.create(data);

    return result;
  }

  static async createInvoice({ ContactID }) {
    const data = {
      Type: 'ACCREC',
      Contact: {
        ContactID,
      },
      LineItems: [
        {
          Quantity: '1',
          ItemCode: 'HKCI',
        },
      ],
      Date: new Date(),
      DueDate: new Date(),
      LineAmountTypes: 'NoTax',
      Status: 'DRAFT',
    };

    const result = await xero.invoices.create(data);

    return result;
  }
}

module.exports = InvoiceService;
