const Router = require('koa-router');
const asyncBusboy = require('async-busboy');
const mapSeries = require('async/mapSeries');

const log = require('../lib/logger');

const middleware = require('../middleware');

const RegistrationService = require('../service/registration');
const InvoiceService = require('../service/invoice');

const router = new Router();

router.post(
  '/',
  middleware.schemaValidator,
  async ctx => {
    try {
      const contactResult = await InvoiceService.createContact(ctx.request.body);
      log.trace(contactResult, 'router:registration:invoice:createContact');

      const invoiceResult = await InvoiceService.createInvoice({
        ContactID: contactResult.Contacts[0].ContactID,
      });
      log.trace(invoiceResult, 'router:registration:invoice:createInvoice');

      const registrationResult = await RegistrationService.createRegistration({
        main: ctx.request.body,
        invoiceNo: invoiceResult.Invoices[0].InvoiceNumber
      });
      log.trace(registrationResult, 'router:registration:crm:createRegistration');

      ctx.code = 200;
      ctx.body = {
        code: 200,
        data: {
          registration: registrationResult.statusText,
          invoiceContact: contactResult.Status,
          invoice: invoiceResult.Status,
        },
      };
    } catch (err) {
      log.error(err);
      ctx.throw(500, 'Internal Server Error');
    }
  },
);

router.post(
  '/attachment',
  async (ctx, next) => {
    try {
      console.log(ctx.req)
      const { files, fields } = await asyncBusboy(ctx.req);
      console.log(1)
      const readFile = await new Promise((resolve, reject) => {
        let data = [];
        let length = 0;
        files[0].on('data', (chunk) => {
          data.push(chunk)
          length += chunk.length
          // data += chunk
        });
        files[0].on('error', (err) => {
          console.log(err)
        });
        files[0].on('end', () => {
          console.log(data)
          return resolve({
            length,
            data: Buffer.concat(data)
          });
        })
      })
      console.log(2)
      // mapSeries(files, file => {
      //   const attachmentResult = await RegistrationService.createAttachment({
      //     file,
      //     contentLength: ctx.request.header["content-length"]
      //   });
      // })
      const attachmentResult = await RegistrationService.createAttachment({
        body: ctx.req,
        file: files[0],
        readFile
      });
      console.log(3)
      // console.log(files)
      ctx.code = 200;
      ctx.body = {
        code: 200,
        data: attachmentResult.data
        // data: result,
        // data: {
        //   attachmentToken: attachmentResult.data.upload.token,
        //   attachmentStatus: attachmentResult.statusText,
        // }
      };
    } catch (err) {
      log.error(err);
      ctx.throw(500, 'Internal Server Error');
    }
  },
);

module.exports = router;
