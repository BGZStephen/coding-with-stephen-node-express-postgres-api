const Joi = require("@hapi/joi");
const { HTTPError } = require("../errors/http-error");

function validateThrow(data, schema) {
  const validationResponse = schema.validate(data, { abortEarly: false, stripUnknown: true });

  if (validationResponse.error) {
    throw new HTTPError(400, validationResponse.error.message)
  }
}

module.exports = {
  validateThrow
}