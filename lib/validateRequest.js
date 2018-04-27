const Ajv = require('ajv');

const ajv = new Ajv();

const registrationSchema = require('./schema/registration.js');
console.log(registrationSchema)

const validateRequest = ctx => {
  let validate;
  const data = ctx.request.body;
  console.log(data)
  switch (ctx.path) {
    case '/registration':
      validate = ajv.compile(registrationSchema);
      break;
    default:
      return false;
  }
  const valid = validate(data);
  console.log(validate)
  return valid;
}

module.exports = validateRequest;
