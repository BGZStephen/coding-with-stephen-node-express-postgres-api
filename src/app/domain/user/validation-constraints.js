const Joi = require("@hapi/joi");

const userCreationBodyConstraint = Joi.object().required().keys({
  firstName: Joi.string().required().messages({
    'string.base': "First name must be a string",
    'any.required': "First name is required"
  }),
  lastName: Joi.string().required().messages({
    'string.base': "Last name must be a string",
    'any.required': "Last name is required"
  }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': "Email must be a string",
      'string.email': "Email is not valid",
      'any.required': "Email is required"
    }),
  password: Joi.string().regex(/^([A-Z]{1,})([a-z]{1,}).{8}$/).required().messages({
    'string.base': "Password must be a string",
    'string.pattern.base': "Password is not strong enough",
    'any.required': "Password is required"
  })
}).messages({
  'object.base': "Body must be a valid object",
  'any.required': "Missing all user properties"
})

const userAuthenticationBodyConstraint = Joi.object().required().keys({
  email: Joi.string().required().messages({
    'string.base': "Email must be a string",
    'any.required': "Email is required"
  }),
  password: Joi.string().required().messages({
    'string.base': "Password must be a string",
    'any.required': "Password is required"
  })
}).messages({
  'any.required': "Missing authentication properties"
})

module.exports = {
  userCreationBodyConstraint,
  userAuthenticationBodyConstraint
}