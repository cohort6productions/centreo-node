const axios = require('axios');

const validateRequest = require('../lib/validateRequest');

class Middleware {
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
    const file1 = await axios({
      url: file1url,
      method: 'GET',
      responseType: 'arraybuffer',
    });
    const file2 = await axios({
      url: file2url,
      method: 'GET',
      responseType: 'arraybuffer',
    });
    ctx.state.files = [file1, file2];
    await next();
  }
}

module.exports = Middleware;
