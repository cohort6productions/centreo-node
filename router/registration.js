const Router = require('koa-router');
const moment = require('moment');

console.log(moment().date());

const log = require('../lib/logger');

const middleware = require('../middleware');

const RegistrationService = require('../service/registration');
const InvoiceService = require('../service/invoice');

const router = new Router();

const invoiceType = "ACCREC";
const lineItems = [
  {
    "Description": "Consulting services as agreed (20% off standard rate)",
    "Quantity": "10",
    "UnitAmount": "100.00",
    "AccountCode": "200",
    "DiscountRate": "20"
  }
];

router.post(
  '/',
  middleware.schemaValidator,
  async (ctx, next) => {
    // try {
    //   const { status, statusText } = await RegistrationService.createRegistration(ctx.request.body);
    //   log.debug({ status, statusText });
    //   await next();
    // } catch (err) {
    //   // log.error(err.response.data);
    //   ctx.throw(500, 'Internal Server Error');
    // }

    try {
      const contact = await InvoiceService.createContact(ctx.request.body);
      const invoice = await InvoiceService.createInvoice({
        "Type": invoiceType,
        "Contact": { 
          "ContactID": contact.Contacts.ContactID
        },
        "LineItems": lineItems,
        "Date": new Date()
      })
      ctx.code = 200;
      ctx.body = { code: 200, data: invoice };
    } catch (err) {
      log.error(err.response.data);
      ctx.throw(500, 'Internal Server Error');
    }
  },
);

module.exports = router;
