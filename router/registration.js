const Router = require('koa-router');
const mapLimit = require('async/mapLimit');

const log = require('../lib/logger');

const middleware = require('../middleware');

const RegistrationService = require('../service/registration');
const InvoiceService = require('../service/invoice');

const router = new Router();

router.post(
  '/',
  middleware.schemaValidator,
  middleware.urlFileReader,
  async ctx => {
    const { files } = ctx.state;
    const fields = ctx.request.body;

    try {
      const contactResult = await InvoiceService.createContact({
        input: fields,
      });
      log.trace(contactResult, 'router:registration:invoice:createContact');

      const invoiceResult = await InvoiceService.createInvoice({
        ContactID: contactResult.Contacts[0].ContactID,
      });
      log.trace(invoiceResult, 'router:registration:invoice:createInvoice');

      const registrationResult = await RegistrationService.createRegistration({
        input: fields,
        invoiceNo: invoiceResult.Invoices[0].InvoiceNumber,
      });
      log.trace(registrationResult.data, 'router:registration:crm:createRegistration');

      const attachmentToken = await new Promise((resolve, reject) => {
        mapLimit(files, 5, async file => {
          const attachmentResult = await RegistrationService.createAttachment(file);
          log.trace(attachmentResult.data.upload, 'router:registration:crm:createAttachment');
          return attachmentResult.data.upload;
        }, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      const entryResult = await RegistrationService.createEntry({
        partyId: registrationResult.data.party.id,
        attachments: attachmentToken,
      });
      log.trace(entryResult.data, 'router:registration:crm:createEntry');

      ctx.code = 200;
      ctx.body = {
        code: 200,
        data: {
          invoiceContact: contactResult.Status,
          invoice: invoiceResult.Status,
          registration: registrationResult.statusText,
          entry: entryResult.statusText,
        },
      };
    } catch (err) {
      log.error(err);
      ctx.throw(500, 'Internal Server Error');
    }
  },
);

module.exports = router;
