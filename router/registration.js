const Router = require('koa-router');
const mapLimit = require('async/mapLimit');
const moment = require('moment');

const log = require('../lib/logger');

const middleware = require('../middleware');

const RegistrationService = require('../service/registration');
const InvoiceService = require('../service/invoice');

const router = new Router();

router.get('/case/:id',
async ctx => {
  try{
    const kase = await RegistrationService.getCase(ctx.params.id);
    return ctx.body = {
      ...kase.data
    }
  }catch(err){
    log.error(err);
    ctx.throw(500, 'Internal Server Error');
  }

})

router.post(
  '/',
  middleware.urlFileReader,
  async ctx => {
    const { files } = ctx.state;
    const fields = ctx.request.body;
    
    try {
      const contactResult = await InvoiceService.findOrCreateContact({
        input: fields.personal
      });
      log.trace(contactResult, 'router:registration:invoice:createContact');

      const invoiceResult = await InvoiceService.createInvoice({
        ContactID: contactResult.Contacts[0].ContactID,
        Package: fields.package
      });
      log.trace(invoiceResult, 'router:registration:invoice:createInvoice');

      const paymentResult = await InvoiceService.createPayment({
        InvoiceID: invoiceResult.Invoices[0].InvoiceID,
        AccountCode: 200,
        Amount: invoiceResult.Invoices[0].Total
      })

      log.trace(paymentResult, 'router:registration:invoice:createPayment');


      const registrationResult = await RegistrationService.createRegistration({
        input: fields
      });
      log.trace(registrationResult.data, 'router:registration:crm:createRegistration');

      const attachmentToken = await new Promise((resolve, reject) => {
        mapLimit(files, 10, async file => {
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

      const content = RegistrationService.createContent(fields, invoiceResult.Invoices[0].InvoiceNumber);

      const entryResult = await RegistrationService.createEntry({
        partyId: registrationResult.data.party.id,
        content: content.replace(/[\[\]\{\}]+/g, ''),
        attachments: attachmentToken
      });
      log.trace(entryResult.data, 'router:registration:crm:createEntry');

      const today = moment()
      const nextDay = moment(today).add(1, 'days')
      const dueDate = nextDay.format('YYYY-MM-DD')
      const dueTime = nextDay.format('HH:mm:ss')

      const taskResult = await RegistrationService.createTask({
        partyId: registrationResult.data.party.id,
        dueDate: dueDate,
        dueTime: dueTime,
        desc: "company incorporation"
      });
      log.trace(taskResult.data, 'router:registration:crm:createTask');

      ctx.code = 200;
      ctx.body = {
        code: 200,
        data: {
          registration: registrationResult.statusText,
          entry: entryResult.statusText,
          invoice: invoiceResult.statusText
        },
      };
    } catch (err) {
      log.error(err);
      ctx.throw(500, 'Internal Server Error');
    }
  },
);

module.exports = router;
