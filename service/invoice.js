const XeroClient = require('xero-node').AccountingAPIClient;

const { invoice } = require('../config');

const xero = new XeroClient(invoice.appCredentials);

class InvoiceService {

  static async findContactByName(name) {
    const contact = await xero.contacts.get({
      where: `name="${name}"`
    })

    return contact
  }

  static async findOrCreateContact({
    input
  }) {
    const name = `${input.firstname} ${input.lastname}`
    let contact = await this.findContactByName(name)
    if (contact.Contacts.length === 0) {
      contact = await this.createContact({input})
    }
    
    return contact
  }

  static async createContact({
    input,
  }) {
    const name = `${input.firstname} ${input.lastname}`

    const data = {
      Name: name,
      EmailAddress: input.email,
      Phones: [
        {
          PhoneType: 'DEFAULT',
          PhoneNumber: input.phone,
          PhoneCountryCode: input.country_code
        },
      ],
    };

    const result = await xero.contacts.create(data);

    return result;
  }

  static async createInvoice({ ContactID, Package }) {
    const ItemMap = {
      grow : "WGrow",
      sprout : "WSprout",
      seed : "WSeed"
    };
    const data = {
      Type: 'ACCREC',
      Contact: {
        ContactID,
      },
      LineItems: [
        {
          Quantity: '1',
          ItemCode: ItemMap[Package.toLowerCase()],
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

