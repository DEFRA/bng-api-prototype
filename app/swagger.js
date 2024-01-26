// ./swagger.js
const Joi = require('joi')

const swaggerOptions = {
  info: {
    title: 'BNG Prototype API Documentation',
    version: '1.0.0'
  }
}

const swaggerTags = {
  description: 'Asset IDs by station ID and radius',
  tags: ['api'],
  validate: {
    params: Joi.object({
      stationId: Joi.string()
        .required()
        .description('The station ID of the flood station of interest')
    }),
    query: Joi.object({
      radius: Joi.number()
        .required()
        .description(
          'The radius around the flood station to display asset IDs'
        )
    })
  }
}

module.exports = {
  swaggerOptions,
  swaggerTags
}
