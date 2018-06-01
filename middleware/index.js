const asyncBusboy = require('async-busboy');
const axios = require('axios');

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

  static async urlFileReader(ctx, next) {
    const {
      file1url,
      file2url,
    } = ctx.request.body;
    const file1 = await axios.get(file1url);
    const file2 = await axios.get(file2url);
    ctx.state.files = [file1, file2];
    await next();
  }
}

module.exports = Middleware;
