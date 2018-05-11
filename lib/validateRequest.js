const Ajv = require('ajv');

const ajv = new Ajv();

const registrationSchema = require('./schema/registration.js');

const validateRequest = async ctx => {
  let validate;
  const data = ctx.state.fields;
  switch (ctx.path) {
    case '/registration':
      validate = ajv.compile(registrationSchema);
      break;
    default:
      return false;
  }
  const valid = validate(data);
  return valid;
};

module.exports = validateRequest;
