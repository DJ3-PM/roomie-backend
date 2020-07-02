const joi = require('@hapi/joi')

const createUserSchema = {
  username: joi.string().required(),
  password: joi.string().required()
}

module.exports = {
  createUserSchema
}
