const joi = require('@hapi/joi')

const idSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createProfileSchema = {
  avatar: joi.string().required(),
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  isHost: joi.string().required(),
  publicEmail: joi.string().email(),
  whatsapp: joi.string(),
  about: joi.string(),
  userId: idSchema.required()
}

module.exports = {
  createProfileSchema
}
