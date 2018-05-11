const Ajv = require('ajv');
const asyncBusboy = require('async-busboy');

const ajv = new Ajv();

const registrationSchema = require('./schema/registration.js');

const validateRequest = async (ctx) => {
  const { files, fields } = await asyncBusboy(ctx.req);

  let validate;
  const data = fields;
  switch (ctx.path) {
    case '/registration':
      validate = ajv.compile(registrationSchema);
      break;
    default:
      return false;
  }
  const valid = validate(data);
  return {
    valid,
    files,
    fields,
  };
};

module.exports = validateRequest;
