const axios = require('axios');
const BaseToArrayBuffer  = require('base64-arraybuffer')

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
    const {shareholders, director} = ctx.request.body;
    const mergedData = [...shareholders, ...director]
    const files = [];
    const filesArray = ['identity', 'address_proof', 'article_of_associate', 'business_license']

    const base64MimeType = (encoded) => {
      var result = null;
      if (typeof encoded !== 'string') {
        return result;
      }
    
      var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    
      if (mime && mime.length) {
        result = mime[1];
      }
      return result;
    }


    mergedData.forEach((obj) => {
      Object.keys(obj).map((value, key) => {
        if (filesArray.includes(value) && !!obj[value].file) {
          const dataurl = obj[value].file
          const source = obj[value].source
          const mimetype = base64MimeType(dataurl)
          const ext = dataurl.substring(dataurl.indexOf('/') + 1, dataurl.indexOf(';base64'))
          const base64Image = dataurl.split(';base64,').pop();
          const file = Buffer.from(base64Image, 'base64');
          const filename = !!obj.firstname ? `${obj.firstname}_${obj.lastname}_${value}_${source}.${ext}` : `${obj.companyname}_${value}_${source}.${ext}`

          files.push({
            filename: filename,
            data: file,
            contentType: mimetype,
            contentLength: file.length
          })
        }
        
      })
    })
    ctx.state.files = files;
    await next()
  }
}

module.exports = Middleware;
