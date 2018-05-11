const asyncBusboy = require('async-busboy');

const validateRequest = require('../lib/validateRequest');

class Middleware {
  static async formDataParser(ctx, next) {
    const { files, fields } = await asyncBusboy(ctx.req);
    ctx.state.files = files;
    ctx.state.fields = fields;
    await next();
  }

  static async schemaValidator(ctx, next) {
    const result = await validateRequest(ctx);
    if (result) {
      await next();
    } else {
      ctx.status = 400;
      ctx.body = { code: 400, data: 'Bad request' };
    }
  }
}

module.exports = Middleware;
