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
    // try {
    //   const { status, statusText } = await RegistrationService.createRegistration(ctx.request.body);
    //   log.debug({ status, statusText });
    //   await next();
    // } catch (err) {
    //   // log.error(err.response.data);
    //   ctx.throw(500, 'Internal Server Error');
    // }

    try {
      const results = await InvoiceService.createContact(ctx.request.body);
      ctx.code = 200;
      ctx.body = { code: 200, data: results };
    } catch (err) {
      log.error(err.response.data);
      ctx.throw(500, 'Internal Server Error');
    }

    // try {
    //   const invoice = await InvoiceService.createContact(ctx.request.body);
    //   ctx.code = 200;
    //   ctx.body = { code: 200, data: 'OK' };
    // } catch (err) {
    //   log.error(err.response.data);
    //   ctx.throw(500, 'Internal Server Error');
    // }
  },
);

module.exports = router;
