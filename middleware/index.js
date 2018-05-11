const validateRequest = require('../lib/validateRequest');
// const log = require('../lib/logger');

class Middleware {
  static async schemaValidator(ctx, next) {
    const result = await validateRequest(ctx);
    if (result.valid) {
      ctx.state.files = result.files;
      ctx.state.fields = result.fields;
      await next();
    } else {
      ctx.status = 400;
      ctx.body = { code: 400, data: 'Bad request' };
    }
  }
}

module.exports = Middleware;
