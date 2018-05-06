const Router = require('koa-router');
const asyncBusboy = require('async-busboy');
const eachSeries = require('async/eachSeries');

const log = require('../lib/logger');

const middleware = require('../middleware');

const RegistrationService = require('../service/registration');
const InvoiceService = require('../service/invoice');

const router = new Router();

router.post(
  '/',
  middleware.schemaValidator,
  async ctx => {
    const attachmentToken = [];

    try {
      const { files, fields } = await asyncBusboy(ctx.req);

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
        invoiceNo: invoiceResult.Invoices[0].InvoiceNumber
      });
      log.trace(registrationResult.data, 'router:registration:crm:createRegistration');

      await new Promise((resolve, reject) => {
        eachSeries(files, async file => {
          const readFile = await new Promise((resolve, reject) => {
            let data = [];
            let length = 0;
            file.on('data', (chunk) => {
              data.push(chunk)
              length += chunk.length
            });
            file.on('error', (err) => {
              console.log(err)
            });
            file.on('end', () => {
              return resolve({
                length,
                data: Buffer.concat(data)
              });
            })
          });

          const attachmentResult = await RegistrationService.createAttachment({
            file,
            readFile
          });

          attachmentToken.push(attachmentResult.data.upload)
        }, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      })

      const entryResult = await RegistrationService.createEntry({
        partyId: registrationResult.data.party.id,
        attachments: attachmentToken
      })
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

// router.post(
//   '/attachment',
//   async (ctx, next) => {
//     const attachmentToken = [];

//     try {
//       const { files, fields } = await asyncBusboy(ctx.req);
//       console.log(fields)

//       if (files.length > 0) {
//         await new Promise((resolve, reject) => {
//           eachSeries(files, async file => {
//             const readFile = await new Promise((resolve, reject) => {
//               let data = [];
//               let length = 0;
//               file.on('data', (chunk) => {
//                 data.push(chunk)
//                 length += chunk.length
//               });
//               file.on('error', (err) => {
//                 console.log(err)
//               });
//               file.on('end', () => {
//                 return resolve({
//                   length,
//                   data: Buffer.concat(data)
//                 });
//               })
//             });

//             const attachmentResult = await RegistrationService.createAttachment({
//               file,
//               readFile
//             });

//             attachmentToken.push(attachmentResult.data.upload)
//           }, err => {
//             if (err) {
//               reject(err);
//             } else {
//               resolve();
//             }
//           });
//         })
//       }

//       // const entryResult = RegistrationService.createEntry({
//       //   partyId: ,
//       //   attachments: attachmentToken
//       // })

//       // console.log(files)
//       ctx.code = 200;
//       ctx.body = {
//         code: 200,
//         data: attachmentToken
//         // data: result,
//         // data: {
//         //   attachmentToken: attachmentResult.data.upload.token,
//         //   attachmentStatus: attachmentResult.statusText,
//         // }
//       };
//     } catch (err) {
//       log.error(err);
//       ctx.throw(500, 'Internal Server Error');
//     }
//   },
// );

module.exports = router;
