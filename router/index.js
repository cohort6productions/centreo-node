const Router = require('koa-router');

const registrationRouter = require('./registration');
const paymentRouter = require('./payment');

const router = new Router();

router.use('/registration', registrationRouter.routes(), registrationRouter.allowedMethods());
router.use('/payment', paymentRouter.routes(), paymentRouter.allowedMethods());

module.exports = router;
