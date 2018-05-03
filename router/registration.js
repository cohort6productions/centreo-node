const Router = require('koa-router');

const log = require('../lib/logger');

const middleware = require('../middleware');

const RegistrationService = require('../service/registration');
const InvoiceService = require('../service/invoice');

const router = new Router();

router.post(
  '/',
  middleware.schemaValidator,
  async (ctx, next) => {
    try {
      const registrationResult = await RegistrationService.createRegistration(ctx.request.body);
      log.trace(registrationResult, 'router:registration:crm:createRegistration');

      const contactResult = await InvoiceService.createContact(ctx.request.body.party);
      log.trace(contactResult, 'router:registration:invoice:createContact');

      const invoiceResult = await InvoiceService.createInvoice({
        ContactID: contactResult.Contacts[0].ContactID
      })
      log.trace(invoiceResult, 'router:registration:invoice:createInvoice');

      ctx.code = 200;
      ctx.body = {
        code: 200,
        data: {
          registration: registrationResult.statusText,
          invoiceContact: contactResult.Status,
          invoice: invoiceResult.Status,
        } 
      };
    } catch (err) {
      log.error(err);
      ctx.throw(500, 'Internal Server Error');
    }
  },
);

module.exports = router;
