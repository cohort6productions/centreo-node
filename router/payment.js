const Router = require('koa-router');
const log = require('../lib/logger');
const StripeService = require('../service/stripe')
const router = new Router();

router.post('/test', (ctx, next) => {
    console.log(ctx.request)
    return ctx.body = {
        code: 200,
        message: ctx.request
    }
})
router.post(
  '/', async ctx => {
      try {
          const body = ctx.request.body
          const data = await StripeService.charge(body.token.id, body.amount)
          return ctx.body = {
              code: 200,
              message: 'Payment Successful',
              data: data
          }

      }catch(e) {
          log.trace(e)
          ctx.body = {
            code:  500
          }
      }
  }
);

module.exports = router;
