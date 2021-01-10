const Joi = require('joi')
const v1Endpoint = require('../controllers/AuthorV1Controller')

const authorV1Params = Joi.object({
  id: Joi.string().required()
})

const authorV1Schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  topics: Joi.array().items(Joi.string()),
  createdAt: Joi.date().required()
})

module.exports = [{
  method: 'GET',
  path: '/v1/authors/{id}',
  handler: v1Endpoint.details,
  options: {
    validate: {
      params: authorV1Params
    },
    response: {
      schema: authorV1Schema
    }
  }
}, {
  method: 'PUT',
  path: '/v1/authors/{id}',
  handler: v1Endpoint.upsert,
  options: {
    validate: {
      params: authorV1Params,
      payload: authorV1Schema
    },
    response: {
      schema: authorV1Schema
    }
  }
}, {
  method: 'DELETE',
  path: '/v1/authors/{id}',
  handler: v1Endpoint.delete,
  options: {
    validate: {
      params: authorV1Params
    }
  }
}]
