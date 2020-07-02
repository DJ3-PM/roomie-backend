const joi = require('@hapi/joi')

const idSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createFavoriteSchema = {
  profileId: idSchema.required(),
  placeId: idSchema.required()
}

module.exports = {
  createFavoriteSchema
}
