const validateRequest = require('../lib/validateRequest');
// const log = require('../lib/logger');

class Middleware {
  static async schemaValidator(ctx, next) {
    const result = validateRequest(ctx);
    if (result) {
      await next();
    } else {
      ctx.status = 400;
      ctx.body = { code: 400, data: 'Bad request' };
    }
  }
}

module.exports = Middleware;
