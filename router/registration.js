const Router = require('koa-router');
const mapLimit = require('async/mapLimit');

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

      const content = RegistrationService.createContent(fields);

      const entryResult = await RegistrationService.createEntry({
        partyId: registrationResult.data.party.id,
        content: content.replace(/[\[\]\{\}]+/g, ''),
        attachments: attachmentToken
      });
      log.trace(entryResult.data, 'router:registration:crm:createEntry');

      ctx.code = 200;
      ctx.body = {
        code: 200,
        data: {
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
