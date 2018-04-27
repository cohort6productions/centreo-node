const Router = require('koa-router');

const registrationRouter = require('./registration');

const router = new Router();

router.use('/registration', registrationRouter.routes(), registrationRouter.allowedMethods());

module.exports = router;