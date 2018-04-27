const Router = require('koa-router');

const log = require('../lib/logger');

const middleware = require('../middleware');

const RegistrationService = require('../service/registration');

const router = new Router();

router.post(
  '/',
  // middleware.schemaValidator,
  async ctx => {
    try {
      const result = await RegistrationService.createRegistration(ctx.request.body);
      ctx.code = 200;
      ctx.body = {code: 200, data: 'OK'};
    } catch (err) {
      log.error({ err });
      ctx.throw(500, 'Internal Server Error');
    }
  }
);

module.exports = router;
