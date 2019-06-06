const Router = require('koa-router');
const log = require('../lib/logger');
const StripeService = require('../service/stripe')
const router = new Router();

router.get('/test', (ctx, next) => {
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
          const customer = await StripeService.createCustomer({
            token: body.token.id,
            billing_email: body.billing_email
          });
          log.trace(customer, 'router:payment:stripe:customer');

          const data = await StripeService.charge({
              amount: body.amount, 
              customer: customer
            })

          log.trace(data, 'router:payment:stripe:charge');

          return ctx.body = {
              code: 200,
              message: 'Payment Successful',
              data: data
          }

      }catch(e) {
          log.trace(e)
          ctx.status = 500
          ctx.body = {
            message:  e
          }
      }
  }
);

module.exports = router;
